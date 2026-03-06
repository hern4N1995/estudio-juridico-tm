import { database } from './firebase';
import { ref, push, query, orderByChild, limitToLast, get, remove, update, set } from 'firebase/database';
import { Noticia, NoticiaInput, Testimonio, TestimonioInput, Comentario, User } from './types';

const NOTICIAS_PATH = 'noticias';
const TESTIMONIOS_PATH = 'testimonios';
const COMENTARIOS_PATH = 'comentarios';

// ===== NEWS (NOTICIAS) =====
export async function addNoticia(input: NoticiaInput): Promise<Noticia> {
  const now = new Date().toISOString();
  const noticiaRef = ref(database, NOTICIAS_PATH);
  const newNoticiaRef = push(noticiaRef);
  
  const noticia: Noticia = {
    id: newNoticiaRef.key!,
    titulo: input.titulo,
    contenido: input.contenido,
    autor: input.autor,
    ...(input.imagen ? { imagen: input.imagen } : {}),
    ...(input.link ? { link: input.link } : {}),
    fecha: new Date().toLocaleDateString('es-AR'),
    createdAt: now,
    updatedAt: now,
  };
  
  await set(newNoticiaRef, noticia);
  return noticia;
}

export async function getNoticias(limit: number = 5): Promise<Noticia[]> {
  const noticiasRef = ref(database, NOTICIAS_PATH);
  const q = query(noticiasRef, orderByChild('createdAt'), limitToLast(limit));
  const snapshot = await get(q);
  
  if (!snapshot.exists()) return [];
  
  const noticias: Noticia[] = [];
  snapshot.forEach((child) => {
    noticias.unshift(child.val()); // Reverse order to get most recent first
  });
  
  return noticias;
}

export async function deleteNoticia(id: string): Promise<void> {
  const noticiaRef = ref(database, `${NOTICIAS_PATH}/${id}`);
  await remove(noticiaRef);
}

export async function updateNoticia(id: string, updates: Partial<Noticia>): Promise<void> {
  const noticiaRef = ref(database, `${NOTICIAS_PATH}/${id}`);
  await update(noticiaRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
}

// ===== TESTIMONIALS (TESTIMONIOS) =====
export async function addTestimonio(usuario: User, input: TestimonioInput): Promise<Testimonio> {
  const now = new Date().toISOString();
  const testimonioRef = ref(database, TESTIMONIOS_PATH);
  const newTestimonioRef = push(testimonioRef);
  
  const testimonio: Testimonio = {
    id: newTestimonioRef.key!,
    usuario,
    contenido: input.contenido,
    calificacion: input.calificacion,
    fecha: new Date().toLocaleDateString('es-AR'),
    createdAt: now,
    updatedAt: now,
  };
  
  console.log('Guardando testimonio:', testimonio);
  try {
    await set(newTestimonioRef, testimonio);
    console.log('Testimonio guardado exitosamente');
  } catch (error) {
    console.error('Error al guardar testimonio:', error);
    throw error;
  }
  return testimonio;
}

export async function getTestimonios(limit: number = 15): Promise<Testimonio[]> {
  try {
    const testimoniosRef = ref(database, TESTIMONIOS_PATH);
    const q = query(testimoniosRef, orderByChild('createdAt'), limitToLast(limit));
    const snapshot = await get(q);
    
    console.log('Snapshot existe:', snapshot.exists());
    console.log('Snapshot data:', snapshot.val());
    
    if (!snapshot.exists()) {
      console.log('No hay testimonios en la base de datos');
      return [];
    }
    
    const testimonios: Testimonio[] = [];
    snapshot.forEach((child) => {
      testimonios.unshift(child.val());
    });
      console.log('Testimonios cargados:', testimonios);
    return testimonios;
  } catch (error) {
    console.error('Error al cargar testimonios:', error);
    return [];
  }
}

export async function deleteTestimonio(id: string): Promise<void> {
  const testimonioRef = ref(database, `${TESTIMONIOS_PATH}/${id}`);
  await remove(testimonioRef);
}

// Obtener testimonio del usuario actual
export async function getUserTestimonio(userId: string): Promise<Testimonio | null> {
  try {
    const testimoniosRef = ref(database, TESTIMONIOS_PATH);
    const snapshot = await get(testimoniosRef);
    
    if (!snapshot.exists()) return null;
    
    let userTestimonio: Testimonio | null = null;
    snapshot.forEach((child) => {
      const testimonio = child.val();
      if (testimonio.usuario.id === userId) {
        userTestimonio = testimonio;
      }
    });
    
    return userTestimonio;
  } catch (error) {
    console.error('Error al obtener testimonio del usuario:', error);
    return null;
  }
}

// Actualizar testimonio existente
export async function updateTestimonio(id: string, input: TestimonioInput): Promise<Testimonio | null> {
  try {
    const testimonioRef = ref(database, `${TESTIMONIOS_PATH}/${id}`);
    const snapshot = await get(testimonioRef);
    
    if (!snapshot.exists()) return null;
    
    const testimonio = snapshot.val();
    const updatedTestimonio: Testimonio = {
      ...testimonio,
      contenido: input.contenido,
      calificacion: input.calificacion,
      updatedAt: new Date().toISOString(),
    };
    
    await update(testimonioRef, updatedTestimonio);
    return updatedTestimonio;
  } catch (error) {
    console.error('Error al actualizar testimonio:', error);
    throw error;
  }
}

// ===== COMMENTS (COMENTARIOS) =====
export async function addComentario(
  noticiaId: string,
  usuario: User,
  contenido: string
): Promise<Comentario> {
  const now = new Date().toISOString();
  const comentariosRef = ref(database, `${COMENTARIOS_PATH}/${noticiaId}`);
  const newComentarioRef = push(comentariosRef);
  
  const comentario: Comentario = {
    id: newComentarioRef.key!,
    usuario,
    contenido,
    fecha: new Date().toLocaleDateString('es-AR'),
    createdAt: now,
  };
  
  await set(newComentarioRef, comentario);
  return comentario;
}

export async function getComentarios(noticiaId: string): Promise<Comentario[]> {
  const comentariosRef = ref(database, `${COMENTARIOS_PATH}/${noticiaId}`);
  const snapshot = await get(comentariosRef);
  
  if (!snapshot.exists()) return [];
  
  const comentarios: Comentario[] = [];
  snapshot.forEach((child) => {
    comentarios.push(child.val());
  });
  
  return comentarios;
}

export async function deleteComentario(noticiaId: string, comentarioId: string): Promise<void> {
  const comentarioRef = ref(database, `${COMENTARIOS_PATH}/${noticiaId}/${comentarioId}`);
  await remove(comentarioRef);
}
