import Image from "next/image";
import { heroData } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <>
      <section id="inicio" className="relative w-full overflow-hidden" style={{ height: '560px' }}>
        <Image
          src={heroData.image.imageUrl}
          alt={heroData.image.description}
          fill
          className="object-cover object-center"
          priority
          data-ai-hint={heroData.image.imageHint}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-start justify-center pt-4">
          <div className="container mx-auto max-w-7xl px-4 text-center md:px-6">
            <div className="relative mx-auto mb-0 w-80">
              <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.3)_0%,rgba(212,175,55,0)_70%)]" />
              <Image
                src="/img/LogoTM.png"
                alt="Logo TM"
                width={280}
                height={280}
                className="relative w-full h-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
              />
            </div>

            <div className="relative -mt-12">
              <h1
                className="relative font-headline text-3xl font-bold leading-tight text-white md:text-5xl"
                dangerouslySetInnerHTML={{ __html: heroData.title }}
              />
            </div>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-foreground md:text-base">
              {heroData.subtitle}
            </p>
            <div className="mt-6">
              <Button size="lg" asChild>
                <a href="#contact">Contactar Ahora</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center py-12 bg-card">
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
    </>
  );
}