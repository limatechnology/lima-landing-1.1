import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const { nombre, email, telefono, servicio, mensaje } = data;

    // Here you would normally integrate with a database or email service
    // like Resend, SendGrid, or Nodemailer.
    
    // Simulate server processing time
    await new Promise(resolve => setTimeout(resolve, 800));

    // Basic validation
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    console.log('Nuevo mensaje de contacto recibido:', {
      nombre,
      email,
      telefono,
      servicio,
      mensaje,
      fecha: new Date().toISOString()
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
