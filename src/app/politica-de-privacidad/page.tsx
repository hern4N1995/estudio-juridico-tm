import { Header } from "@/components/lex/Header";
import { Footer } from "@/components/lex/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PoliticaDePrivacidad() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">          <div className="flex items-center justify-between mb-8">
            <h1 className="font-headline text-4xl font-bold text-foreground">
              Política de Privacidad
            </h1>
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Volver</span>
            </Link>
          </div>
          <p className="text-foreground/80 mb-6 text-sm">
            Última actualización: Febrero 2026
          </p>

          <div className="space-y-8 text-foreground">            <section>
              <h2 className="font-headline text-2xl font-bold text-foreground mb-4">
                1. Introducción
              </h2>
              <p className="mb-4">
                Estudio Jurídico Tránsito Martínez se compromete a proteger su privacidad y garantizar que comprenda cómo usamos la información personal que nos proporciona. Esta Política de Privacidad describe nuestras prácticas respecto a la recopilación, uso y protección de sus datos personales.
              </p>
            </section>            <section>
              <h2 className="font-headline text-2xl font-bold text-foreground mb-4">
                2. Información que Recopilamos
              </h2>
              <p className="mb-4">Recopilamos información personal que usted nos proporciona voluntariamente a través de nuestro formulario de contacto, incluyendo:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Provincia de residencia</li>
                <li>Mensaje o descripción de su consulta legal</li>
              </ul>
              <p className="mt-4">
                También podemos recopilar información técnica automáticamente, como su dirección IP, tipo de navegador, páginas visitadas y duración de la visita, mediante el uso de cookies y tecnologías similares.
              </p>
            </section>            <section>
              <h2 className="font-headline text-2xl font-bold text-foreground mb-4">
                3. Uso de la Información
              </h2>
              <p className="mb-4">Utilizamos la información personal que recopilamos para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Responder a sus consultas y solicitudes de asesoramiento legal</li>
                <li>Establecer comunicación con usted sobre posibles servicios legales</li>
                <li>Mantener y mejorar nuestro sitio web</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
                <li>Prevenir fraude y mantener la seguridad del sitio</li>
                <li>Enviar información sobre nuestros servicios (solo con consentimiento previo)</li>
              </ul>
            </section>            <section>
              <h2 className="font-headline text-2xl font-bold text-foreground mb-4">
                4. Secreto Profesional y Confidencialidad
              </h2>
              <p className="mb-4">
                Como estudio jurídico regulado por las leyes de la República Argentina, Estudio Jurídico Tránsito Martínez está obligado a mantener el secreto profesional de toda información relacionada con consultas legales. Esta confidencialidad es protegida por:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>La Ley 19.549 de Procedimientos Administrativos</li>
                <li>Las normas deontológicas de la profesión legal</li>
                <li>Los códigos de ética profesional aplicables en Argentina</li>
                <li>Las regulaciones de la Colegiatura de Abogados</li>
              </ul>
              <p className="mt-4">
                La información compartida a través de nuestros formularios de contacto será tratada bajo absoluto secreto profesional.
              </p>
            </section>            <section>
              <h2 className="font-headline text-2xl font-bold text-foreground mb-4">
                5. Protección de Datos
              </h2>
              <p className="mb-4">
                Implementamos medidas técnicas y administrativas para proteger sus datos personales contra acceso no autorizado, alteración, pérdida o divulgación. Estos incluyen:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encriptación SSL/TLS en la transmisión de datos</li>
                <li>Contraseñas seguras y autenticación de múltiples factores</li>
                <li>Acceso restringido a información personal</li>
                <li>Auditorías periódicas de seguridad</li>
                <li>Políticas de retención de datos</li>
              </ul>
            </section>            <section>
              <h2 className="font-headline text-2xl font-bold text-foreground mb-4">
                6. Compartir Información con Terceros
              </h2>
              <p className="mb-4">
                No compartiremos su información personal con terceros sin su consentimiento explícito, excepto cuando sea:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Requerido por ley o por decisión de autoridades judiciales</li>
                <li>Necesario para prestar servicios legales (cuando sea parte de nuestra representación)</li>
                <li>Con proveedores de servicios bajo acuerdos de confidencialidad</li>
              </ul>
              <p className="mt-4">
                No vendemos, arrendamos ni comercializamos información personal de nuestros clientes.
              </p>
            </section>            <section>
              <h2 className="font-headline text-2xl font-bold text-foreground mb-4">
                7. Cookies y Tecnologías de Rastreo
              </h2>
              <p className="mb-4">
                Nuestro sitio web utiliza cookies para mejorar su experiencia de usuario. Estas cookies ayudan a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Recordar preferencias de navegación</li>
                <li>Analizar el uso del sitio (Google Analytics)</li>
                <li>Mejorar la funcionalidad y seguridad</li>
              </ul>
              <p className="mt-4">
                Puede controlar las cookies a través de la configuración de su navegador. Tenga en cuenta que deshabilitar cookies puede afectar la funcionalidad del sitio.
              </p>
            </section>            <section>
              <h2 className="font-headline text-2xl font-bold text-foreground mb-4">
                8. Derechos del Usuario
              </h2>
              <p className="mb-4">
                Conforme a la legislación argentina, usted tiene derecho a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acceder a sus datos personales</li>
                <li>Solicitar la corrección de información inexacta</li>
                <li>Solicitar la eliminación de sus datos (derecho al olvido)</li>
                <li>Oponerme al procesamiento de sus datos</li>
                <li>Solicitar una copia de sus datos en formato electrónico</li>
              </ul>
              <p className="mt-4">
                Para ejercer estos derechos, comuníquese directamente con nuestro equipo.
              </p>
            </section>            <section>
              <h2 className="font-headline text-2xl font-bold text-foreground mb-4">
                9. Retención de Datos
              </h2>
              <p className="mb-4">
                Conservaremos su información personal solo por el tiempo necesario para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cumplir con los propósitos para los que fue recopilada</li>
                <li>Cumplir con obligaciones legales y regulatorias</li>
                <li>Resolver disputas y hacer cumplir acuerdos</li>
              </ul>
              <p className="mt-4">
                Después de estos períodos, los datos serán eliminados de forma segura.
              </p>
            </section>            <section>
              <h2 className="font-headline text-2xl font-bold text-foreground mb-4">
                10. Comunicaciones de Marketing
              </h2>
              <p className="mb-4">
                Solo enviaremos comunicaciones promocionales sobre nuestros servicios si usted ha optado por recibirlas. Siempre puede darse de baja utilizando el enlace que se proporciona en cada comunicación.
              </p>
            </section>            <section>
              <h2 className="font-headline text-2xl font-bold text-foreground mb-4">
                11. Cambios en Esta Política
              </h2>
              <p className="mb-4">
                Podemos actualizar esta Política de Privacidad en cualquier momento. Las actualizaciones entrarán en vigencia inmediatamente después de su publicación. Le recomendamos revisar esta política periódicamente para mantenerse informado.
              </p>
            </section>            <section>
              <h2 className="font-headline text-2xl font-bold text-foreground mb-4">
                12. Contacto para Privacidad
              </h2>
              <p className="mb-4">
                Si tiene preguntas sobre esta Política de Privacidad o cómo manejamos sus datos personales, contáctenos:
              </p>
              <div className="ml-4">
                <p><strong>Email:</strong> transito412@gmail.com</p>
                <p><strong>Teléfono:</strong> +54 9 3794 66-2013</p>
                <p><strong>Dirección:</strong> La Rioja 763, 1er Piso, Oficina 3 - Corrientes, Argentina</p>
              </div>
            </section>

            <section className="bg-card border border-border rounded-lg p-6 mt-8">
              <p className="text-sm">
                <strong>Declaración de Conformidad:</strong> Al utilizar este sitio web y proporcionar información personal, usted confirma que ha leído, comprendido y acepta esta Política de Privacidad y los Términos de Servicio de Estudio Jurídico Tránsito Martínez.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
