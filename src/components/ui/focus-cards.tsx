"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

interface FocusCard {
  title: string;
  src: string;
}

export const FocusCards = ({ cards }: { cards: FocusCard[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto w-full">
      {cards.map((card, index) => (
        <div
          key={index}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className="relative h-80 w-full rounded-lg overflow-hidden cursor-pointer transition-all duration-300"
          style={
            hovered === index
              ? {
                  boxShadow: "0 0 0 2px #d4af37",
                  borderRadius: "0.5rem",
                }
              : {}
          }
        >
          <img
            src={card.src}
            alt={card.title}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-300",
              hovered === index ? "scale-110" : "scale-100"
            )}
          />
          <div
            className={cn(
              "absolute inset-0 bg-black/40 transition-opacity duration-300",
              hovered === index ? "opacity-100" : "opacity-0"
            )}
          />          <div
            className={cn(
              "absolute inset-0 flex items-start justify-start p-6 transition-all duration-300",
              hovered === index ? "translate-y-0" : "-translate-y-4"
            )}
          >            <h3 
              className="text-xl font-bold font-headline"
              style={{ 
                color: '#d4af37',
                WebkitTextStroke: '0.5px #000000'
              }}
            >
              {card.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};
