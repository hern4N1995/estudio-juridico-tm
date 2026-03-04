"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { servicesData } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

export function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [cardPosition, setCardPosition] = useState<{ top: number; left: number } | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const cardRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (serviceTitle: string, event: React.MouseEvent) => {
    const button = event.currentTarget as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    setCardPosition({
      top: rect.top + window.scrollY,
      left: rect.right + 20,
    });
    setSelectedService(serviceTitle);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedService(null);
    }
  };

  return (
    <>
      <div id="services" className="flex items-center justify-center py-12 bg-background">
        <div className="flex items-center justify-center gap-8 w-full max-w-5xl px-4">
          <div className="flex-1" style={{ height: '4px', backgroundColor: '#d4af37', borderRadius: '2px', opacity: 0.6 }} />
          <div className="flex items-center gap-6 shrink-0">
            <div className="rounded-full" style={{ width: '96px', height: '4px', backgroundColor: '#d4af37' }} />
            <span className="text-4xl font-bold whitespace-nowrap" style={{ color: '#d4af37' }}>✦</span>
            <div className="rounded-full" style={{ width: '96px', height: '4px', backgroundColor: '#d4af37' }} />
          </div>
          <div className="flex-1" style={{ height: '4px', backgroundColor: '#d4af37', borderRadius: '2px', opacity: 0.6 }} />
        </div>
      </div>
      <section className="bg-background py-2 md:py-4 pb-48 relative">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
            {servicesData.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground">
            {servicesData.subtitle}
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 w-full">
            {servicesData.services.map((service) => (
            <button
              key={service.title}
              ref={(el) => {
                if (el) cardRefs.current[service.title] = el;
              }}
              onClick={(e) => handleCardClick(service.title, e)}
              className="group relative h-80 overflow-hidden rounded-lg shadow-lg text-left transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <Card className="h-full">
                <Image
                  src={service.image.imageUrl}
                  alt={service.image.description}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  data-ai-hint={service.image.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-6 text-white">
                  <div className="mt-32">
                    <service.icon className="mb-2 h-8 w-8 text-primary" />
                    <h3 className="font-headline text-xl font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white">{service.description}</p>
                  </div>
                  <div className="absolute bottom-0 right-6 pb-1 text-right">
                    <span className="text-sm font-semibold" style={{ color: '#D4AF37' }}>Ver más</span>
                  </div>
                </div>
              </Card>
            </button>
          ))}
          </div>
        </div>

        <div className="mt-16 text-center space-y-4">
          <p className="text-lg text-foreground/90 leading-relaxed">
            El estudio se dedica al asesoramiento y representación judicial y extrajudicial, de personas humanas y jurídicas de Derecho Público y Privado.
          </p>
          <p className="text-lg text-foreground/90 leading-relaxed">
            Brindamos Servicios Jurídicos en Corrientes, Chaco y Formosa.
          </p>
          <p className="text-lg text-foreground/80">
            Contáctenos, nos caracterizamos por ofrecer seguridad y honestidad en cada trabajo realizado.
          </p>
          <p className="pt-4">
            <a href="#contact" className="text-primary hover:text-primary/80 font-semibold underline transition-colors">
              Enviar consulta
            </a>
          </p>
        </div>
        <p className="pt-20">
            
          </p>
      </div>
    </section>

      {/* Modal - renderizado fuera de la sección */}
      {selectedService && cardPosition && windowWidth > 0 && (
        <div 
          onClick={handleBackdropClick}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center"
        >
          <div 
            className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl w-11/12 max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 hover:bg-[#D4AF37]/20 rounded-full transition-colors duration-200 z-10"
            >
              <X className="w-6 h-6 text-[#D4AF37]" />
            </button>
            
            <div className="p-8 md:p-12">
              {/* Decorative border top */}
              <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-4" />
              
              {selectedService === 'Derecho de F. N. & A.' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                      Derecho de Familia, Niñez y Adolescencia
                    </h2>
                    <div className="h-1 w-24" style={{ backgroundColor: '#D4AF37' }} />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        1.- Filiación, Parentalidad y Responsabilidad Familiar:
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2">
                        <li>Juicio de Filiación, [hijos no reconocidos, ADN].</li>
                        <li>Cuota Alimentaria y Obra Social.</li>
                        <li>Régimen de Comunicación.</li>
                        <li>Plan de parentalidad y alimentos.</li>
                        <li>Cesación de Cuota Alimentaria.</li>
                        <li>Autorización para Viajes.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        2.- Divorcios y Acuerdos Extrajudiciales:
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2">
                        <li>Divorcios – Unilaterales y Bilaterales.</li>
                        <li>Acuerdos Extrajudiciales.</li>
                        <li>Redacción de Convenio Regulador.</li>
                        <li>Régimen de bienes separados: Uso de la vivienda, etc.</li>
                        <li>Compensación económica.</li>
                        <li>División de bienes.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        3.- Violencia Familiar:
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2">
                        <li>Violencia Familiar o Doméstica, física, psicológica, económica y moral.</li>
                        <li>Asesoramiento y acompañamiento en comisaria a la víctima.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedService === 'Derecho Penal & Fuero Federal' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                      Derecho Penal & Fuero Federal
                    </h2>
                    <div className="h-1 w-24" style={{ backgroundColor: '#D4AF37' }} />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        Derecho Penal:
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2">
                        <li>Asistencia en Comisaria.</li>
                        <li>Asistencia Letrada en Sede Judicial.</li>
                        <li>Eximición de Prisión.</li>
                        <li>Excarcelación.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        Fuero Federal:
                      </h3>
                      <p className="text-gray-300 ml-2">
                        Asistencia Letrada Penal y Civil en fuero Federal en Corrientes, Chaco y Formosa.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedService === 'Derecho Civil' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                      Derechos Civiles
                    </h2>
                    <div className="h-1 w-24" style={{ backgroundColor: '#D4AF37' }} />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        1.- Accidente de Tránsito:
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2">
                        <li>Asesoramiento y presentación de reclamos judiciales y extrajudiciales por accidentes de tránsito.</li>
                        <li>Asistencia letrada ante la UFRAC/Fiscalía.</li>
                        <li>Reclamos de Indemnizaciones de Daños y Perjuicios, en sede Civil.</li>
                        <li>Reclamos ante la Aseguradora.</li>
                        <li>Gastos Médicos. Fallecimiento por siniestro vial.</li>
                        <li>Acuerdos extrajudiciales por accidentes de tránsito.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        2.- Sucesiones y Herencias:
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2">
                        <li>Sucesión Intestato en sede Judicial.</li>
                        <li>Herencias con o sin testamentos.</li>
                        <li>Legados.</li>
                        <li>Redacción de Testamentos.</li>
                        <li>Conflictos en los repartos de bienes.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        3.- Prescripciones Adquisitiva y/o Usucapión
                      </h3>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        4.- Desalojos
                      </h3>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        5.- Cobro de Alquileres
                      </h3>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        6.- Juicios Ejecutivos
                      </h3>
                    </div>
                  </div>
                </div>
              )}

              {selectedService === 'Derecho Laboral & ART' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                      Derecho Laboral y ART
                    </h2>
                    <div className="h-1 w-24" style={{ backgroundColor: '#D4AF37' }} />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        Derecho Laboral:
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2">
                        <li>Reclamos por Falta de Registración o en Forma Deficiente.</li>
                        <li>Despidos.</li>
                        <li>Diferencias de Haberes.</li>
                        <li>Intimaciones.</li>
                        <li>Redacción de Telegrama Ley.</li>
                        <li>Redacción de Carta Documento.</li>
                        <li>Recursos Administrativos y/o Judiciales.</li>
                        <li>Negociación Colectiva.</li>
                        <li>Asistencia en Subsecretaria de Trabajo y en sede Judicial.</li>
                        <li>Reclamos de Indemnizaciones en sede civil derivado de la Falta de Registración.</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                        ART:
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2">
                        <li>Reclamos antes Aseguradora de Riesgo del Trabajo (ART).</li>
                        <li>Asistencia ante Comisión Médica.</li>
                        <li>Rechazo de Denuncia del Accidente.</li>
                        <li>Rechazo de Enfermedades No Listada.</li>
                        <li>Divergencia en el Alta Médica.</li>
                        <li>Recurso de Apelación ante la SRT.</li>
                        <li>Solicitud de Reingreso a la prestación brindada por la ART.</li>
                        <li>Reclamo por Indemnización derivado del Accidente Laboral, en sede Judicial.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {selectedService === 'Régimen Jurídico del Automotor' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>
                      Especialista en Régimen Jurídico del Automotor
                    </h2>
                    <div className="h-1 w-24" style={{ backgroundColor: '#D4AF37' }} />
                  </div>
                  
                  <div className="space-y-6">
                    <ul className="list-disc list-inside space-y-2 text-gray-300 ml-2 text-base md:text-lg">
                      <li>Recursos registrales</li>
                      <li>Diligenciamiento de oficios</li>
                      <li>Inscripciones y levantamientos de embargos e inhibiciones</li>
                      <li>Transferencias por sucesión</li>
                      <li>Transferencias por subasta</li>
                      <li>Inscripciones de prendas entre particulares</li>
                      <li>Ejecuciones prendarias</li>
                      <li>Accidentes de tránsito</li>
                      <li>Asesoramiento y descargos por infracciones de tránsito</li>
                      <li>Asesoramiento sobre impuesto de patentes</li>
                    </ul>
                  </div>
                </div>
              )}

              {selectedService !== 'Derecho de F. N. & A.' && selectedService !== 'Derecho Penal & Fuero Federal' && selectedService !== 'Derecho Civil' && selectedService !== 'Derecho Laboral & ART' && selectedService !== 'Régimen Jurídico del Automotor' && (
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                    {selectedService}
                  </h2>
                  <div className="h-1 w-24 mb-6" style={{ backgroundColor: '#D4AF37' }} />
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Información detallada para {selectedService}
                  </p>
                </div>
              )}
              
              {/* Decorative border bottom */}
              <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-6" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
