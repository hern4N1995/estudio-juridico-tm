export function AboutStudio() {
  return (
    <section className="bg-card py-8 md:py-2 pb-24 md:pb-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6"><div className="space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
            Estudio Jurídico en Corrientes Capital
          </h2>
          <p className="text-lg text-foreground/90 leading-relaxed">
            Abogado <span className="font-semibold">Martínez Tránsito Salvador</span>, con amplia experiencia y especialización en:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6 max-w-2xl mx-auto">
            <div className="text-foreground/80">
              • Derecho Laboral & ART
            </div>
            <div className="text-foreground/80">
              • Derecho Penal
            </div>
            <div className="text-foreground/80">
              • Derecho de Familia, Niñez y Adolescencia
            </div>
            <div className="text-foreground/80">
              • Derecho Civil
            </div>
          </div>

          <p className="text-base text-foreground/80 italic">
            Valor de la consulta establecido por el Colegio Público de Abogados de la Provincia de Corrientes.
          </p>
          
          <p className="text-lg font-semibold text-primary pt-4">
            Atendemos en las provincias de Chaco, Formosa e interiores.
          </p>
          
        </div>
      </div>
    </section>
  );
}