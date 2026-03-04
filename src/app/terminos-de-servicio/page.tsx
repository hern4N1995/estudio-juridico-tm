import { Header } from "@/components/lex/Header";
import { Footer } from "@/components/lex/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TerminosDeServicio() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-headline text-4xl font-bold text-white">
              Términos de Servicio
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

          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="font-headline text-2xl font-bold text-white mb-4">
                1. Aceptación de Términos
              </h2>
              <p className="mb-4">
                Al acceder y utilizar este sitio web de Estudio Jurídico Tránsito Martínez, usted acepta estar vinculado por estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, por favor no utilice nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-bold text-white mb-4">
                2. Descripción de Servicios
              </h2>
              <p className="mb-4">
                Estudio Jurídico Tránsito Martínez ofrece servicios de asesoramiento legal en las siguientes áreas:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Derecho Laboral y Seguridad Social</li>
                <li>Derecho Civil y Comercial</li>
                <li>Derecho Penal y Fuero Federal</li>
                <li>Derecho de Familia, Niñez y Adolescencia</li>
              </ul>
              <p className="mt-4">
                La consulta inicial a través de este sitio web es un medio de contacto preliminar. La relación cliente-abogado se establece únicamente cuando se formaliza un contrato de servicios legales.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-bold text-white mb-4">
                3. Responsabilidad Legal
              </h2>
              <p className="mb-4">
                El contenido de este sitio web es de carácter informativo y no constituye asesoramiento legal específico. La información proporcionada no reemplaza la consulta con un abogado debidamente habilitado. Estudio Jurídico Tránsito Martínez no se responsabiliza por:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Decisiones tomadas basadas en la información del sitio sin consulta profesional</li>
                <li>Daños derivados del uso o incapacidad de usar el sitio web</li>
                <li>Pérdida de datos o información transmitida a través del sitio</li>
                <li>Errores técnicos, interrupciones o fallas del servidor</li>
              </ul>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-bold text-white mb-4">
                4. Secreto Profesional
              </h2>
              <p className="mb-4">
                Estudio Jurídico Tránsito Martínez se compromete a mantener la confidencialidad de toda información proporcionada por nuestros clientes, conforme a lo establecido en la Ley 19.549 de Procedimientos Administrativos y las normas deontológicas de la profesión legal en la República Argentina.
              </p>
              <p>
                Cualquier información compartida a través del formulario de contacto será tratada bajo estricto secreto profesional hasta que se establezca formalmente una relación de cliente.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-bold text-white mb-4">
                5. Propiedad Intelectual
              </h2>
              <p className="mb-4">
                Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos y diseño, es propiedad de Estudio Jurídico Tránsito Martínez o de sus proveedores de contenido licenciado. No se permite la reproducción, distribución o transmisión sin autorización previa por escrito.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-bold text-white mb-4">
                6. Limitación de Responsabilidad
              </h2>
              <p className="mb-4">
                En la máxima medida permitida por la ley, Estudio Jurídico Tránsito Martínez no será responsable por ningún daño indirecto, incidental, especial o consecuente que resulte del uso de este sitio web, incluso si ha sido advertido de la posibilidad de tales daños.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-bold text-white mb-4">
                7. Enlaces a Terceros
              </h2>
              <p className="mb-4">
                Este sitio web puede contener enlaces a sitios de terceros. No somos responsables del contenido, precisión o prácticas de estos sitios externos. El acceso a dichos sitios es bajo su propio riesgo y está sujeto a los términos y condiciones de esos sitios.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-bold text-white mb-4">
                8. Modificaciones de Términos
              </h2>
              <p className="mb-4">
                Estudio Jurídico Tránsito Martínez se reserva el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación. Su uso continuado del sitio constituye aceptación de cualquier cambio.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-bold text-white mb-4">
                9. Jurisdicción y Ley Aplicable
              </h2>
              <p className="mb-4">
                Estos términos de servicio se rigen por las leyes de la República Argentina, específicamente las leyes aplicables en la provincia de Corrientes. Cualquier disputa será resuelta en los tribunales competentes de la provincia de Corrientes.
              </p>
            </section>

            <section>
              <h2 className="font-headline text-2xl font-bold text-white mb-4">
                10. Contacto
              </h2>
              <p className="mb-4">
                Para consultas sobre estos términos de servicio, contáctenos en:
              </p>
              <div className="ml-4">
                <p><strong>Email:</strong> transito412@gmail.com</p>
                <p><strong>Teléfono:</strong> +54 9 3794 66-2013</p>
                <p><strong>Dirección:</strong> La Rioja 763, 1er Piso, Oficina 3 - Corrientes, Argentina</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
