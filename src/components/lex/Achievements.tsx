import { achievementsData } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { GoldenDivider } from "./GoldenDivider";
import { TestimonialsSection } from "@/components/testimonials-section";

export function Achievements() {
  return (
    <>
      <section id="achievements" className="bg-background py-2 md:py-4 pb-24 relative">
        <GoldenDivider />
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
              {achievementsData.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground">
              {achievementsData.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4 md:gap-8 mb-20">
            {achievementsData.achievements.map((item) => (
              <Card key={item.label} className="bg-card p-6">
                <CardContent className="flex flex-col items-center justify-center p-0">
                  <item.icon className="h-10 w-10 text-primary" />
                  <div className="mt-4 text-3xl font-bold text-foreground md:text-4xl">
                    {item.value}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <TestimonialsSection />
    </>
  );
}
