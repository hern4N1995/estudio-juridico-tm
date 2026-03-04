import Image from "next/image";
import { teamData } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export function Team() {
  return (
    <section id="team" className="bg-card pt-0 md:pt-0 pb-16 md:pb-24">
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
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
            {teamData.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground">
            {teamData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {teamData.members.map((member) => (
            <Card
              key={member.name}
              className="overflow-hidden border-border bg-background text-center"
            >
              <div className="flex justify-center pt-8">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-[#D4AF37]/30">
                  <Image
                    src={member.image.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 200px"
                    data-ai-hint={member.image.imageHint}
                  />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-headline text-2xl font-bold" style={{ color: '#D4AF37' }}>
                  {member.name}
                </h3>
                <p className="mt-2 text-base text-foreground font-semibold whitespace-pre-line">
                  {member.specialty}
                </p>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-foreground hover:text-foreground/80 transition-colors text-base mt-3 flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </a>
                )}
                {member.phone && (
                  <a
                    href={`tel:${member.phone}`}
                    className="text-foreground hover:text-foreground/80 transition-colors text-base mt-1 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {member.phone}
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
