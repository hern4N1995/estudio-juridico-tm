// User data from OAuth providers
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  provider: 'google' | 'facebook' | 'anonymous';
  createdAt: string;
}

// Noticia (News) data structure
export interface Noticia {
  id: string;
  titulo: string;
  contenido: string;
  fecha: string;
  autor: string;
  imagen?: string;
  createdAt: string;
  updatedAt: string;
}

// Testimonio (Testimonial) data structure
export interface Testimonio {
  id: string;
  usuario: User;
  contenido: string;
  calificacion: number; // 1-5 stars
  fecha: string;
  createdAt: string;
  updatedAt: string;
}

// Comentario en noticia
export interface Comentario {
  id: string;
  usuario: User;
  contenido: string;
  fecha: string;
  createdAt: string;
}

// Form inputs
export interface NoticiaInput {
  titulo: string;
  contenido: string;
  autor: string;
  imagen?: string;
}

export interface TestimonioInput {
  contenido: string;
  calificacion: number;
}
