import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: 'Estudio Jurídico Tránsito Martínez',
  description: 'Soluciones legales innovadoras y efectivas. Su tranquilidad es nuestra prioridad.',
  icons: {
    icon: '/img/TMsvg.png',
    apple: '/img/TMsvg.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Script para prevenir flash de contenido sin estilo */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
        {/* TMsvg Favicon - Optimizado para mayor tamaño visible */}
        <link rel="icon" type="image/png" href="/img/TMsvg.png?v=1" sizes="any" />
        <link rel="icon" type="image/png" href="/img/TMsvg.png?v=1" sizes="192x192" />
        <link rel="icon" type="image/png" href="/img/TMsvg.png?v=1" sizes="512x512" />
        <link rel="shortcut icon" href="/img/TMsvg.png?v=1" />
        <link rel="apple-touch-icon" href="/img/TMsvg.png?v=1" />
        <link rel="mask-icon" href="/img/TMsvg.png?v=1" color="#D4AF37" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
