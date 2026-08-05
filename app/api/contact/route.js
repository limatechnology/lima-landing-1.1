import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const data = await request.json();
    const { nombre, email, telefono, servicio, mensaje } = data;

    // Basic validation
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'Lima Tech Landing <onboarding@resend.dev>',
      to: 'limatech.ar@gmail.com',
      subject: `Nuevo mensaje de ${nombre} - ${servicio || 'Consulta General'}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Nuevo contacto desde la Landing Web</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${telefono}</p>
          <p><strong>Servicio:</strong> ${servicio}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${mensaje}</p>
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
      { error: 'Hubo un error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
