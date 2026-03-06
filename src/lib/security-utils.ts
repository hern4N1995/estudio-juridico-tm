/**
 * Security Utils - Validaciones y Sanitización
 * Instalar isomorphic-dompurify para sanitización completa:
 * npm install isomorphic-dompurify
 */

// Validación de email más robusta
export function validateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 100;
}

// Validación de teléfono
export function validatePhone(phone: string): boolean {
  const soloNumeros = phone.replace(/\D/g, '');
  return soloNumeros.length >= 10 && soloNumeros.length <= 15;
}

// Validación de nombre
export function validateName(name: string): boolean {
  if (name.length < 3 || name.length > 50) return false;
  return /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/.test(name);
}

// Validación de mensaje
export function validateMessage(message: string): boolean {
  if (message.length < 10 || message.length > 500) return false;
  if (/^[\d\s]+$/.test(message)) return false;
  if (/(.)\1{9,}/.test(message)) return false;
  return true;
}

// Sanitizar entrada para prevenir XSS (básico)
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/on\w+\s*=\s*"[^"]*"/gi, '');
}

// Validar IP
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown';
}

// Rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function isRateLimited(ip: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  record.count++;
  return record.count > limit;
}

// Validar recaptcha
export async function verifyRecaptcha(token: string, secretKey: string): Promise<boolean> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score > 0.5;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// Validación completa de formulario
export function validateContactForm(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!validateName(data.nombre)) {
    errors.push('Nombre inválido');
  }

  if (!validateEmail(data.email)) {
    errors.push('Email inválido');
  }

  if (!validatePhone(data.telefono)) {
    errors.push('Teléfono inválido');
  }

  if (!validateMessage(data.mensaje)) {
    errors.push('Mensaje inválido');
  }

  if (!data.provincia || data.provincia.trim() === '') {
    errors.push('Provincia requerida');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
