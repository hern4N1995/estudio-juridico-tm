import Image from "next/image";
import { testimonialsData } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-card py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
            {testimonialsData.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground">
            {testimonialsData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonialsData.testimonials.map((testimonial) => (
            <Card
              key={testimonial.author}
              className="flex flex-col justify-between border-border bg-background"
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary" />
                <p className="mt-4 text-foreground">{testimonial.quote}</p>
              </CardContent>
              <div className="flex items-center gap-4 border-t border-border p-6">
                <Image
                  src={testimonial.image.imageUrl}
                  alt={testimonial.author}
                  width={40}
                  height={40}
                  className="rounded-full"
                  data-ai-hint={testimonial.image.imageHint}
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
