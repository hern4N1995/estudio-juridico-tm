import { Scale } from 'lucide-react';

export default function EliminacionDatos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Scale className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Solicitud de Eliminación de Datos
          </h1>
          <p className="text-xl text-slate-600">
            Protegemos tu privacidad y tus derechos digitales
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Introduction */}
          <section className="border-l-4 border-blue-600 pl-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Tu Derecho a la Privacidad
            </h2>
          </section>

          {/* How to Request */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              ¿Cómo Solicitar la Eliminación?
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  📧 Envía un Email
                </h3>
                <p className="text-slate-700 mb-3">
                  Envía un correo a:
                </p>
                <a 
                  href="mailto:transito412@gmail.com?subject=Solicitud%20de%20Eliminaci%C3%B3n%20de%20Datos"
                  className="text-blue-600 hover:text-blue-800 font-semibold text-lg break-all"
                >
                  transito412@gmail.com
                </a>
                <p className="text-slate-600 text-sm mt-3">
                  Asunto: "Solicitud de Eliminación de Datos"
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  📋 Información Requerida
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Tu nombre completo</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Tu correo electrónico asociado a la cuenta</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Descripción de los datos que deseas eliminar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Copia de un documento de identidad (para verificación)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              ⏱️ Plazo de Respuesta
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-slate-700 mb-3">
                Procesaremos tu solicitud en un plazo de <strong>30 días hábiles</strong> desde 
                la recepción de tu correo. Te confirmaremos por correo cuando tus datos hayan 
                sido eliminados.
              </p>
              <p className="text-sm text-slate-600">
                Nota: Algunos datos pueden ser retenidos por obligaciones legales o tributarias.
              </p>
            </div>
          </section>

          {/* Rights */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              ✓ Tus Derechos
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Derecho de Acceso</h3>
                <p className="text-sm text-slate-600">
                  Puedes solicitar una copia de tus datos
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Derecho al Olvido</h3>
                <p className="text-sm text-slate-600">
                  Puedes solicitar que tus datos sean eliminados
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Derecho a Rectificación</h3>
                <p className="text-sm text-slate-600">
                  Puedes corregir información incorrecta
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Derecho a Portabilidad</h3>
                <p className="text-sm text-slate-600">
                  Puedes obtener tus datos en formato legible
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              ❓ Preguntas Frecuentes
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">
                  ¿Se eliminarán todos mis datos?
                </h3>
                <p className="text-sm text-slate-700">
                  Sí, excepto aquellos que deba retener por ley (registros fiscales, obligaciones 
                  legales, etc.). Te informaremos qué datos no pueden ser eliminados.
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">
                  ¿Es gratuito?
                </h3>
                <p className="text-sm text-slate-700">
                  Sí, la solicitud de eliminación de datos es completamente gratuita.
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-2">
                  ¿Puedo cambiar de opinión?
                </h3>
                <p className="text-sm text-slate-700">
                  Una vez eliminados los datos, no podremos recuperarlos. Si deseas cancelar 
                  la solicitud, comunícalo antes de que se complete el proceso.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">¿Preguntas?</h2>
            <p className="mb-4">
              Si tienes dudas sobre el proceso, contáctanos:
            </p>
            <div className="space-y-2">
              <p>
                📧 <a href="mailto:transito412@gmail.com" className="hover:underline">
                  transito412@gmail.com
                </a>
              </p>
              <p>
                📱 +54 9 3794 66-2013
              </p>
            </div>
          </section>

          {/* Last Updated */}
          <div className="text-center text-sm text-slate-500 pt-8 border-t">
            <p>
              Última actualización: {new Date().toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
