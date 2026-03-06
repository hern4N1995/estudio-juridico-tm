import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Headers de Seguridad
  
  // 1. Prevent Clickjacking (X-Frame-Options)
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // 2. Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 3. Enable XSS Protection
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // 4. Referrer Policy - Controla qué información se envía al hacer referencia
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 5. Permissions Policy - Controla qué APIs pueden usar el navegador
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), usb=(), payment=(), accelerometer=(), gyroscope=(), magnetometer=(), vr=(), xr=(), ar=()'
  );  // 6. Content Security Policy - La más importante
  // Permitir tanto localhost como CloudWorkstations y Firebase
  const cspHeader = [
    "default-src 'self' https://*.cloudworkstations.dev http://localhost:*",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://fonts.googleapis.com https://www.googletagmanager.com https://www.google-analytics.com https://cdn.raindrop.io https://*.cloudworkstations.dev https://*.firebaseio.com http://localhost:*",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net https://*.cloudworkstations.dev",
    "img-src 'self' data: https: http:",
    "font-src 'self' data: https://fonts.gstatic.com https://cdn.jsdelivr.net",
    "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://api.resend.com https://storage.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com http://localhost:* ws://localhost:* https://*.cloudworkstations.dev wss://*.cloudworkstations.dev",
    "frame-src 'self' https://www.google.com https://www.youtube.com https://maps.google.com https://*.cloudworkstations.dev https://*.firebaseio.com",
    "media-src 'self' https:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests"
  ].join('; ');

  response.headers.set('Content-Security-Policy', cspHeader);

  // 7. Strict-Transport-Security (HSTS) - Fuerza HTTPS
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|img/).*)',
  ],
};
