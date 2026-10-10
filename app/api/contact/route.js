import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const MAX_BODY_BYTES = 16 * 1024;
const LIMITS = {
  nombre: 100,
  email: 254,
  telefono: 25,
  servicio: 100,
  mensaje: 5000,
};
const ALLOWED_FIELDS = new Set(['nombre', 'email', 'telefono', 'servicio', 'mensaje', 'website']);
const EMAIL_PATTERN = /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?(?:\.[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?)+$/i;
const PHONE_PATTERN = /^\+?[0-9\s\-()]{7,25}$/;

function asTrimmedString(value, maxLength) {
  if (typeof value !== 'string') return null;

  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength || /[\u0000-\u001F\u007F]/.test(normalized)) {
    return null;
  }

  return normalized;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[character]));
}

function isAllowedOrigin(value) {
  if (!value) return false;

  try {
    const url = new URL(value);
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isLocalhost = (
      url.hostname === 'localhost' ||
      url.hostname === '127.0.0.1' ||
      url.hostname === '::1'
    );
    const isProductionHost = (
      url.hostname === 'limatechnology.com.ar' ||
      url.hostname === 'www.limatechnology.com.ar'
    );
    const vercelUrl = process.env.VERCEL_URL?.toLowerCase().replace(/\.$/, '');
    const isCurrentVercelPreview = process.env.VERCEL_ENV === 'preview' &&
      vercelUrl && url.hostname.toLowerCase() === vercelUrl;

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
  try {
    return isAllowedOrigin(new URL(referer).origin);
  } catch {
    return false;
  }
}

function invalidResponse() {
  return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
}

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
    if (contentType !== 'application/json') {
      return NextResponse.json({ error: 'Content-Type inválido' }, { status: 415 });
    }

    const declaredLength = request.headers.get('content-length');
    if (declaredLength && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > MAX_BODY_BYTES)) {
      return NextResponse.json({ error: 'Solicitud demasiado grande' }, { status: 413 });
    }

    if (!hasValidRequestOrigin(request)) {
      return NextResponse.json({ error: 'Origen no permitido' }, { status: 403 });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: 'Solicitud demasiado grande' }, { status: 413 });
    }

    let data;
    try {
      data = JSON.parse(rawBody);
    } catch {
      return invalidResponse();
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return invalidResponse();
    }

    if (Object.keys(data).some((field) => !ALLOWED_FIELDS.has(field))) {
      return invalidResponse();
    }

    // Honeypot: el formulario legítimo actual no envía este campo.
    if (data.website !== undefined && (typeof data.website !== 'string' || data.website.trim())) {
      return invalidResponse();
    }

    const nombre = asTrimmedString(data.nombre, LIMITS.nombre);
    const email = asTrimmedString(data.email, LIMITS.email)?.toLowerCase() ?? null;
    const telefono = data.telefono === undefined || data.telefono === ''
      ? ''
      : asTrimmedString(data.telefono, LIMITS.telefono);
    const servicio = data.servicio === undefined || data.servicio === ''
      ? ''
      : asTrimmedString(data.servicio, LIMITS.servicio);
    const mensaje = asTrimmedString(data.mensaje, LIMITS.mensaje);

    if (
      !nombre ||
      !email ||
      !mensaje ||
      telefono === null ||
      (telefono && !PHONE_PATTERN.test(telefono)) ||
      servicio === null ||
      !EMAIL_PATTERN.test(email)
    ) {
      return invalidResponse();
    }

    const safeNombre = escapeHtml(nombre);
    const safeEmail = escapeHtml(email);
    const safeTelefono = escapeHtml(telefono || 'No informado');
    const safeServicio = escapeHtml(servicio || 'Consulta General');
    const safeMensaje = escapeHtml(mensaje);
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'Lima Tech <hola@mail.limatech.com.ar>',
      to: 'limatech.ar@gmail.com',
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre} - ${servicio || 'Consulta General'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Nuevo contacto desde la Landing Web</h2>
          <p><strong>Nombre:</strong> ${safeNombre}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Teléfono:</strong> ${safeTelefono}</p>
          <p><strong>Servicio:</strong> ${safeServicio}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${safeMensaje}</p>
        </div>
      `
    });

    return NextResponse.json(
      { success: true, message: 'Mensaje recibido correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error procesando el formulario de contacto:', error);
    return NextResponse.json(
      { error: 'No se pudo procesar la solicitud' },
      { status: 500 }
    );
  }
}
