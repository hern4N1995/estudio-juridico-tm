"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { navLinks } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Si no estamos en la página principal, no detectar secciones
      if (pathname !== "/") {
        return;
      }

      // Detectar sección activa solo en la página principal
      const sections = ["inicio", "services", "team", "achievements", "testimonials", "news", "contact"];
      let closestSection = "inicio";
      let closestDistance = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Calcular la distancia del centro de la sección al centro del viewport
          const sectionCenter = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
          }
        }
      }

      // No hacer conversión de testimonials a achievements, mostrar testimonials como está
      setActiveSection(closestSection);
    };

    // Llamar handleScroll al montar para establecer el estado inicial
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = (href: string) => {
    setIsSheetOpen(false);
    setActiveSection(href.slice(1));
    
    // Si estamos en otra página, navegar a la página principal con el hash
    if (pathname !== "/") {
      window.location.href = `/${href}`;
    } else {
      // Si estamos en la página principal, hacer scroll al elemento
      setTimeout(() => {
        const element = document.getElementById(href.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const navItems = (
    <>
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={pathname === "/" ? link.href : `/${link.href}`}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(link.href);
          }}
          className={`font-medium transition-all duration-300 hover:scale-110 ${
            pathname === "/" && activeSection === link.href.slice(1)
              ? "text-primary hover:text-primary"
              : "text-foreground/80 hover:text-primary"
          }`}
          style={pathname === "/" && activeSection === link.href.slice(1) ? { color: '#D4AF37' } : {}}
        >
          {link.name}
        </a>
      ))}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <a href="/" className="flex items-center gap-2 transition-all duration-300">
          <Image
            src="/img/LogoTM.png"
            alt="Logo TM"
            width={80}
            height={80}
            className="h-20 w-20 transition-transform duration-300 hover:scale-110 cursor-pointer"
            style={pathname === "/" && activeSection === "inicio" ? { filter: "drop-shadow(0 0 8px #D4AF37)" } : {}}
          />
        </a>

        <nav className="hidden items-center gap-6 md:flex">{navItems}</nav>

        <div className="flex items-center gap-2">
           <Button asChild className="hidden sm:flex">
            <a href="#contact">Solicitar Consulta</a>
          </Button>
          <ThemeToggle />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild suppressHydrationWarning>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <nav className="flex flex-col gap-6 pt-10">{navItems}</nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
