import { Scale, Gavel, Briefcase, Users, Award, Bot, ScaleIcon, Heart, Car } from 'lucide-react';
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
  subtitle: 'En el estudio jurídico contamos con abogados, con amplia experiencia y de trayectoria en diferentes ramas legales. Contamos con especialistas en Derecho Laboral, ART, Civil, Penal y Fuero Federal etc. ',
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
      specialty: 'Abogado - Mediador\nEspecialista en Derecho Penal & Laboral',
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
      phone: '3794035725',
    },
  ],
};

export const achievementsData = {
  title: 'Una Trayectoria de Éxito',
  subtitle: 'Nuestros resultados hablan por nosotros. Décadas de experiencia y casos emblemáticos respaldan nuestra reputación.',
  achievements: [
    {
      icon: Award,
      value: '200+',
      label: 'Casos Ganados Exitosamente',
    },
    {
      icon: Users,
      value: '98%',
      label: 'Satisfacción de Clientes',
    },
    {
      icon: Briefcase,
      value: '50+',
      label: 'Empresas Asesoradas',
    },
     {
      icon: ScaleIcon,
      value: 'Ética',
      label: 'Compromiso y Ética',
    },
  ],
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
  address: 'La Rioja 763, 1er Piso, Oficina 3 - Corrientes, Argentina',
  phone: '+54 9 3794 66-2013',
  email: 'transito412@gmail.com',
};

export const footerData = {
  brandName: "Tránsito Martínez",
  copyright: `© ${new Date().getFullYear()} Estudio Jurídico Tránsito Martínez. Todos los derechos reservados.`
}
