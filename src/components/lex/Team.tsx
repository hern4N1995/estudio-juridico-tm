import Image from "next/image";
import { teamData } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { GoldenDivider } from "./GoldenDivider";

export function Team() {
  return (
    <>
      <section id="team" className="bg-card py-12 md:py-12 pb-16">
        <GoldenDivider backgroundColor="bg-card" />
        <div className="container mx-auto max-w-7xl px-4 md:px-6 pt-8">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
            {teamData.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground">
            {teamData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-4">
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
    </>
  );
}
