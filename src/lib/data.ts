import { Scale, Gavel, Briefcase, Users, Award, Bot, ScaleIcon, Heart, Car, StarHalf, StarIcon } from 'lucide-react';
import { placeholderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = placeholderImages.find(img => img.id === id);
  if (!image) {
    return { id: 'fallback', description: '', imageUrl: 'https://picsum.photos/seed/fallback/1200/800', imageHint: '' };
  }
  return image;
};

export const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Servicios', href: '#services' },
  { name: 'Equipo', href: '#team' },
  { name: 'Logros', href: '#achievements' },
  { name: 'Opiniones', href: '#testimonials' },
  { name: 'Noticias', href: '#news' },
  { name: 'Contacto', href: '#contact' },
];

export const heroData = {
  title: 'Estudio Jurídico<br />Tránsito Martínez',
  subtitle: 'Combinamos tradición y vanguardia para ofrecer soluciones legales innovadoras y efectivas. Su tranquilidad es nuestra prioridad.',
  image: getImage('hero-background'),
};

export const servicesData = {
  title: 'Áreas de Práctica',
  subtitle: 'En el estudio jurídico contamos con abogados, con amplia experiencia y de trayectoria en diferentes ramas legales.',
  services: [
    {
      title: 'Derecho Laboral & ART',
      description: 'Defensa de derechos de trabajadores y empleadores.',
      icon: Users,
      image: getImage('service-labor'),
    },
    {
      title: 'Derecho Civil',
      description: 'Resolución de disputas contractuales y familiares.',
      icon: Scale,
      image: getImage('service-civil'),
    },
    {
      title: 'Derecho Penal & Fuero Federal',
      description: 'Defensa en procesos penales y acusaciones.',
      icon: Gavel,
      image: getImage('service-penal'),
    },
    {
      title: 'Derecho de F. N. & A.',
      description: 'Asesoramiento en familia, niñez y adolescencia.',
      icon: Heart,
      image: getImage('fna'),
    },
    {
      title: 'Régimen Jurídico del Automotor',
      description: 'Especialista en trámites y asesoramiento automotor.',
      icon: Car,
      image: getImage('automotor'),
    },
  ],
};

export const teamData = {
  title: 'Nuestro Equipo',
  subtitle: 'En el Estudio Jurídico Transito Martínez, contamos con reconocidos abogados para ofrecerle el asesoramiento legal que necesita.',
  members: [
    {
      name: 'Tránsito Salvador Martínez',
      specialty: 'Abogado - Mediador\nEspecialista en Derecho Laboral; ART y\nDerecho Penal',
      image: getImage('team-laura'),
      email: 'trasito412@gmail.com',
      phone: '3794662013',
    },
    {
      name: 'Juan Guillermo Ruiz',
      specialty: 'Abogado - Mediador\nEspecialista en Régimen Jurídico del Automotor & Relaciones de Familia',
      image: getImage('team-carlos'),
      email: 'jgr3400@gmail.com',
      phone: '3794662916',
    },
    {
      name: 'María de los Angeles Oliva',
      specialty: 'Abogada - Mediadora\nEspecialista en Derecho de Familia, Niñez & Adolescencia',
      image: getImage('team-sofia'),
      email: 'olivamangeles@gmail.com',
      phone: '3794035725',
    },
  ],
};

export const achievementsData = {
  title: 'Una Trayectoria de Éxito',
  subtitle: 'La confianza de nuestros clientes se refleja en las opiniones que nos comparten. Descubra por qué nos recomiendan en Google.',
  achievements: [
    {
      icon: StarIcon,
      value: '5.0',
      label: 'Calificación en Google',
    },
    {
      icon: Users,
      value: '100+',
      label: 'Opiniones de Clientes',
    },
    {
      icon: Briefcase,
      value: '150+',
      label: 'Clientes Asesorados',
    },
     {
      icon: ScaleIcon,
      value: 'Ética',
      label: 'Compromiso y Ética',
    },
  ],
  googleReviewsLink: 'https://www.google.com.ar/search?sxsrf=ACYBGNQDnuW-Kry7m1tnKC4DdZxXvFFy2A%3A1571524101231&source=hp&ei=BY6rXcuIDJO95OUP6-6YKA&q=estudio+quatro&oq=estudio+quatro&gs_l=psy-ab.3..35i39j0i22i30j0i22i10i30j38.1557.4302..4748...0.0..0.98.1301.14......0....1..gws-wiz.......0j0i131j0i67j0i20i263j0i10.ph4UaGhHjag&ved=0ahUKEwiLn7u-r6nlAhWTHrkGHWs3BgUQ4dUDCAY&uact=5#lrd=0x94456c783f70041d:0xd24a2d1dada87c4f,1,,,',
};

export const testimonialsData = {
  title: 'La Confianza de Nuestros Clientes',
  subtitle: 'Historias reales de clientes que encontraron en nosotros un aliado estratégico.',
  testimonials: [
    {
      quote: 'El equipo del estudio no solo demostró un dominio técnico impecable, sino también una calidad humana que nos dio la tranquilidad que necesitábamos.',
      author: 'CEO de Innovatec S.A.',
      image: getImage('testimonial-1'),
    },
    {
      quote: 'Resolvieron mi caso laboral con una eficiencia y profesionalismo que superó todas mis expectativas. Totalmente recomendados.',
      author: 'Ana G., Cliente Particular',
      image: getImage('testimonial-2'),
    },
    {
      quote: 'Su asesoría en derecho comercial fue clave para la expansión de nuestro negocio. Son más que abogados, son socios estratégicos.',
      author: 'Director de Finanzas, Constructora Urbana',
      image: getImage('testimonial-3'),
    },
  ],
};

export const newsData = {
  title: 'Novedades & Fallos Destacados',
  subtitle: 'Últimas noticias y fallos relevantes del ámbito jurídico',
  news: [] as Array<{
    id: string;
    title: string;
    summary: string;
    link?: string;
    createdAt: number;
  }>,
};

export const contactData = {
  title: 'Póngase en Contacto',
  subtitle: 'Estamos listos para escucharlo. Programe una consulta confidencial para evaluar su caso.',
  address: 'La Rioja 736, 1er Piso, Oficina 3 - Corrientes, Argentina',
  phone: '+54 9 3794 66-2013',
  email: 'transito412@gmail.com',
};

export const footerData = {
  brandName: "Tránsito Martínez",
  copyright: `© ${new Date().getFullYear()} Estudio Jurídico Tránsito Martínez. Todos los derechos reservados.`
}
