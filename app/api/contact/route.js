import { isIP } from 'node:net';
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { Resend } from 'resend';

const MAX_BODY_BYTES = 16 * 1024;
const TURNSTILE_ACTION = 'contact';
const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const LIMITS = { nombre: 100, email: 254, telefono: 25, servicio: 100, mensaje: 5000 };
const ALLOWED_FIELDS = new Set(['nombre', 'email', 'telefono', 'servicio', 'mensaje', 'website', 'turnstileToken']);
const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
const PHONE_PATTERN = /^\+?[0-9\s\-()]{7,25}$/;

function asTrimmedString(value, maxLength) {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength || /[\u0000-\u001F\u007F]/.test(normalized)) return null;
  return normalized;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
}

function isAllowedOrigin(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1' || url.hostname === '::1';
    const isProductionHost = url.hostname === 'limatechnology.com.ar' || url.hostname === 'www.limatechnology.com.ar';
    const vercelUrl = process.env.VERCEL_URL?.toLowerCase().replace(/\.$/, '');
    const isCurrentVercelPreview = process.env.VERCEL_ENV === 'preview' && vercelUrl && url.hostname.toLowerCase() === vercelUrl;
    if (isLocalhost) return isDevelopment && (url.protocol === 'http:' || url.protocol === 'https:');
    if (isProductionHost) return url.protocol === 'https:' && url.port === '';
    if (isCurrentVercelPreview) return url.protocol === 'https:' && url.port === '';
    return false;
  } catch {
    return false;
  }
}

function hasValidRequestOrigin(request) {
  const origin = request.headers.get('origin');
  if (origin) return isAllowedOrigin(origin);
  const referer = request.headers.get('referer');
  if (!referer) return false;
  try { return isAllowedOrigin(new URL(referer).origin); } catch { return false; }
}

function invalidResponse() {
  return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
}

function serviceUnavailable() {
  return NextResponse.json({ error: 'Servicio temporalmente no disponible' }, { status: 503, headers: { 'Retry-After': '60' } });
}

function getClientIp(request) {
  const trustedContext = process.env.VERCEL === '1' || process.env.VERCEL === 'true' || process.env.NODE_ENV === 'development';
  if (!trustedContext) return null;
  const candidates = [request.headers.get('x-real-ip'), request.headers.get('x-forwarded-for')?.split(',')[0]];
  return candidates.map((value) => value?.trim()).find((value) => value && isIP(value)) || null;
}

function getRateLimiter() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const redis = new Redis({ url, token });
  return new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, '10 m'), analytics: false, prefix: 'lima:contact' });
}

async function enforceRateLimit(request) {
  const ip = getClientIp(request);
  const limiter = getRateLimiter();
  if (!ip || !limiter) return { ok: false, unavailable: true };
  try {
    const result = await limiter.limit(ip);
    if (!result.success) {
      const retryAfter = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));
      return { ok: false, response: NextResponse.json({ error: 'Demasiadas solicitudes' }, { status: 429, headers: { 'Retry-After': String(retryAfter) } }) };
    }
    return { ok: true };
  } catch {
    return { ok: false, unavailable: true };
  }
}

async function verifyTurnstile(token, request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const hostnames = (process.env.TURNSTILE_HOSTNAMES || '').split(',').map((value) => value.trim().toLowerCase()).filter(Boolean);
  if (!secret || hostnames.length === 0 || typeof token !== 'string' || token.length === 0 || token.length > 2048) return { ok: false, unavailable: !secret || hostnames.length === 0 };

  try {
    const ip = getClientIp(request);
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set('remoteip', ip);
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return { ok: false, unavailable: true };
    const result = await response.json();
    return { ok: result.success === true && result.action === TURNSTILE_ACTION && hostnames.includes(String(result.hostname || '').toLowerCase()) };
  } catch {
    return { ok: false, unavailable: true };
  }
}

export async function POST(request) {
  try {
    const turnstileEnabled = process.env.TURNSTILE_ENABLED === 'true';
    const rateLimitEnabled = process.env.RATE_LIMIT_ENABLED === 'true';
    const contentType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
    if (contentType !== 'application/json') return NextResponse.json({ error: 'Content-Type inválido' }, { status: 415 });
    const declaredLength = request.headers.get('content-length');
    if (declaredLength && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > MAX_BODY_BYTES)) return NextResponse.json({ error: 'Solicitud demasiado grande' }, { status: 413 });
    if (!hasValidRequestOrigin(request)) return NextResponse.json({ error: 'Origen no permitido' }, { status: 403 });

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) return NextResponse.json({ error: 'Solicitud demasiado grande' }, { status: 413 });
    let data;
    try { data = JSON.parse(rawBody); } catch { return invalidResponse(); }
    if (!data || typeof data !== 'object' || Array.isArray(data) || Object.keys(data).some((field) => !ALLOWED_FIELDS.has(field))) return invalidResponse();
    if (data.website !== undefined && (typeof data.website !== 'string' || data.website.trim())) return invalidResponse();

    const nombre = asTrimmedString(data.nombre, LIMITS.nombre);
    const email = asTrimmedString(data.email, LIMITS.email)?.toLowerCase() ?? null;
    const telefono = data.telefono === undefined || data.telefono === '' ? '' : asTrimmedString(data.telefono, LIMITS.telefono);
    const servicio = data.servicio === undefined || data.servicio === '' ? '' : asTrimmedString(data.servicio, LIMITS.servicio);
    const mensaje = asTrimmedString(data.mensaje, LIMITS.mensaje);
    if (!nombre || !email || !mensaje || telefono === null || (telefono && !PHONE_PATTERN.test(telefono)) || servicio === null || !EMAIL_PATTERN.test(email)) return invalidResponse();

    const submittedTurnstileToken = typeof data.turnstileToken === 'string' ? data.turnstileToken.trim() : '';
    if (!turnstileEnabled && submittedTurnstileToken) return serviceUnavailable();

    if (rateLimitEnabled) {
      const rateLimit = await enforceRateLimit(request);
      if (rateLimit.response) return rateLimit.response;
      if (rateLimit.unavailable) return serviceUnavailable();
    }
    if (turnstileEnabled) {
      const turnstile = await verifyTurnstile(submittedTurnstileToken, request);
      if (!turnstile.ok) return turnstile.unavailable ? serviceUnavailable() : NextResponse.json({ error: 'Verificación inválida' }, { status: 403 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Lima Tech <hola@mail.limatech.com.ar>',
      to: 'limatech.ar@gmail.com',
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre} - ${servicio || 'Consulta General'}`,
      html: `<div style="font-family: sans-serif; padding: 20px;"><h2>Nuevo contacto desde la Landing Web</h2><p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Teléfono:</strong> ${escapeHtml(telefono || 'No informado')}</p><p><strong>Servicio:</strong> ${escapeHtml(servicio || 'Consulta General')}</p><p><strong>Mensaje:</strong></p><p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${escapeHtml(mensaje)}</p></div>`
    });
    return NextResponse.json({ success: true, message: 'Mensaje recibido correctamente' }, { status: 200 });
  } catch {
    console.error('Error procesando el formulario de contacto');
    return NextResponse.json({ error: 'No se pudo procesar la solicitud' }, { status: 500 });
  }
}
