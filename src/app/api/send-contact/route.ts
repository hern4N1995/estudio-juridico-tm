import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email del estudio jurídico (donde recibirá las consultas)
const STUDIO_EMAIL = process.env.STUDIO_CONTACT_EMAIL || 'transito412@gmail.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, provincia, mensaje } = body;

    // Validar que todos los campos estén presentes
    if (!nombre || !email || !telefono || !provincia || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Crear HTML del email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #D4AF37; color: #1A1A1A; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #D4AF37; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #D4AF37; }
            .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Nueva Consulta del Sitio Web</h2>
            </div>
            
            <div class="content">
              <div class="field">
                <span class="label">Nombre:</span>
                <p>${nombre}</p>
              </div>
              
              <div class="field">
                <span class="label">Email:</span>
                <p>${email}</p>
              </div>
              
              <div class="field">
                <span class="label">Teléfono:</span>
                <p>${telefono}</p>
              </div>
              
              <div class="field">
                <span class="label">Provincia:</span>
                <p>${provincia}</p>
              </div>
              
              <div class="field">
                <span class="label">Mensaje:</span>
                <p>${mensaje.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
            
            <div class="footer">
              <p>Este es un email automático generado desde tu sitio web de Estudio Jurídico Tránsito Martínez</p>
              <p>Responde directamente a: ${email}</p>
            </div>
          </div>
        </body>
      </html>
    `;    // Enviar email al estudio
    const response = await resend.emails.send({
      from: 'Estudio Jurídico <onboarding@resend.dev>',
      to: STUDIO_EMAIL,
      replyTo: email,
      subject: `Nueva Consulta: ${nombre} - ${provincia}`,
      html: htmlContent,
    });

    if (response.error) {
      console.error('Error al enviar email:', response.error);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }

    // Enviar email de confirmación al cliente
    try {
      await resend.emails.send({
        from: 'Estudio Jurídico <onboarding@resend.dev>',
        to: email,
        subject: 'Hemos recibido tu consulta - Estudio Jurídico Tránsito Martínez',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #D4AF37; color: #1A1A1A; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px; }
                .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>¡Gracias por tu consulta!</h2>
                </div>
                
                <div class="content">
                  <p>Estimado/a <strong>${nombre}</strong>,</p>
                  
                  <p>Hemos recibido tu consulta y la analizaremos con atención. Nos pondremos en contacto contigo pronto.</p>
                  
                  <p><strong>Datos de tu consulta:</strong></p>
                  <ul>
                    <li><strong>Provincia:</strong> ${provincia}</li>
                    <li><strong>Teléfono:</strong> ${telefono}</li>
                  </ul>
                  
                  <p>Si prefieres contactarnos directamente, puedes hacerlo a través de:</p>
                  <ul>
                    <li><strong>WhatsApp:</strong> +54 3794 412-6526</li>
                    <li><strong>Email:</strong> transito412@gmail.com</li>
                    <li><strong>Horarios:</strong> Lunes a Viernes 08:30 a 13:00 y 18:00 a 20:30</li>
                  </ul>
                  
                  <p>Atentamente,<br>
                  <strong>Estudio Jurídico Tránsito Martínez</strong></p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
    } catch (error) {
      console.log('Error al enviar email de confirmación (no crítico):', error);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Consulta enviada exitosamente' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
