"use client";

import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Renderizar un placeholder mientras se monta
  if (!isMounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full transition-all duration-300"
        disabled
        aria-label="Cargando tema"
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full transition-all duration-300"
      title={`Cambiar a modo ${theme === "dark" ? "día" : "noche"}`}
      aria-label={`Cambiar a modo ${theme === "dark" ? "día" : "noche"}`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-blue-600" />
      )}
    </Button>
  );
}
