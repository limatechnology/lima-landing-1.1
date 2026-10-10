import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const LIMITS = {
  nombre: 100,
  email: 254,
  telefono: 25,
  servicio: 100,
  mensaje: 5000,
};

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

export async function POST(request) {
  try {
    let data;
    try {
      data = await request.json();
    } catch {
      return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
    }

    // Honeypot: el formulario legítimo actual no envía este campo.
    if (typeof data.website === 'string' && data.website.trim()) {
      return NextResponse.json({ error: 'Solicitud inválida' }, { status: 400 });
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
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
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
