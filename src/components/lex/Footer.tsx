"use client";

import { footerData, navLinks } from "@/lib/data";
import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    if (pathname === "/") {
      // Si estamos en la página principal, permitir navegación normal
      return;
    }
    // Si estamos en otra página, navegar a la página principal con el hash
    window.location.href = `/${href}`;
  };
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Left side - Navigation and Legal side by side */}
          <div className="text-center md:text-left md:pl-0 flex flex-col md:flex-row md:gap-8">
            <div>
              <h3 className="font-semibold text-foreground">Navegación</h3>
              <ul className="mt-4 space-y-2">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a 
                      href={pathname === "/" ? link.href : `/${link.href}`}
                      onClick={(e) => {
                        if (pathname !== "/") {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mt-8 md:mt-0">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="/terminos-de-servicio" className="text-muted-foreground hover:text-foreground">Términos de Servicio</a></li>
                <li><a href="/politica-de-privacidad" className="text-muted-foreground hover:text-foreground">Política de Privacidad</a></li>
              </ul>
            </div>
          </div>

          {/* Center - Logo */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <Image
                src="/img/LogoTM.png"
                alt="Logo Tránsito Martínez"
                width={120}
                height={120}
                className="h-32 w-32"
              />
              <p className="mt-1 font-headline text-lg font-bold text-foreground">
                Estudio Jurídico Tránsito Martínez
              </p>
            </div>
            <p className="mt-2 text-sm text-muted-foreground text-center">{footerData.copyright}</p>
            <p className="mt-1 text-sm text-muted-foreground text-center">
              developed by{' '}
              <a 
                href="https://www.linkedin.com/in/hernanalegre/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground hover:opacity-80 transition-opacity dark:text-white"
              >
                hern4N
              </a>
            </p>
          </div>

          {/* Right side - Social */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-foreground">Social</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://www.facebook.com/transito.martinez.71" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground flex items-center gap-2 justify-center md:justify-end">
                  <Facebook className="h-5 w-5" style={{ color: '#D4AF37' }} />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/dr.transitomartinez/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground flex items-center gap-2 justify-center md:justify-end">
                  <Instagram className="h-5 w-5" style={{ color: '#D4AF37' }} />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
