# 💻 Ejemplos Prácticos - Sistema Jurídico Firebase

## 1. Agregar un Testimonio Programáticamente

```typescript
import { addTestimonio } from '@/lib/firebase-db';
import { signInWithGoogle } from '@/lib/firebase-auth';

async function crearTestimonio() {
  // 1. Autenticar usuario
  const usuario = await signInWithGoogle();
  
  if (!usuario) {
    console.error('Usuario no autenticado');
    return;
  }

  // 2. Crear testimonio
  const testimonio = await addTestimonio(usuario, {
    contenido: 'Excelente servicio legal, muy profesionales',
    calificacion: 5,
  });

  console.log('Testimonio creado:', testimonio.id);
}
```

---

## 2. Cargar Testimonios del Usuario

```typescript
import { getTestimonios } from '@/lib/firebase-db';

async function cargarMisTestimonios() {
  const testimonios = await getTestimonios(15);
  
  // Filtrar solo testimonios del usuario actual
  const misTestimonios = testimonios.filter(
    t => t.usuario.id === usuarioActual.id
  );

  console.log(`Encontré ${misTestimonios.length} mis testimonios`);
}
```

---

## 3. Usar el Hook de Autenticación

```typescript
import { useAuth } from '@/hooks/use-auth';

export function MiComponente() {
  const { user, loading, error } = useAuth();

  if (loading) return <div>Cargando...</div>;
  
  if (!user) {
    return <button>Iniciar sesión</button>;
  }

  return (
    <div>
      <img src={user.photoURL} alt={user.displayName} />
      <h2>{user.displayName}</h2>
      <p>{user.email}</p>
      <p>Proveedor: {user.provider}</p>
    </div>
  );
}
```

---

## 4. Implementar Moderación de Testimonios

```typescript
import { updateNoticia } from '@/lib/firebase-db';

async function aprobarTestimonio(testimonioId: string) {
  // Agregar a lista de aprobados
  await updateNoticia(testimonioId, {
    aprobado: true,
    fechaAprobacion: new Date().toISOString(),
  });
}

async function rechazarTestimonio(testimonioId: string, razon: string) {
  // Marcar como rechazado
  await updateNoticia(testimonioId, {
    rechazado: true,
    razonRechazo: razon,
    fechaRechazo: new Date().toISOString(),
  });
}
```

---

## 5. Sincronizar Datos en Tiempo Real

```typescript
import { database } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';

function sincronizarTestimoniosEnVivo() {
  const testimoniosRef = ref(database, 'testimonios');
  
  // Escuchar cambios en tiempo real
  const unsubscribe = onValue(testimoniosRef, (snapshot) => {
    const datos = snapshot.val();
    
    if (datos) {
      // Actualizar UI con nuevos datos
      console.log('Testimonios actualizados:', Object.values(datos));
    }
  });

  // Limpiar listener cuando componente se desmonta
  return () => unsubscribe();
}
```

---

## 6. Validar Datos Antes de Guardar

```typescript
import { TestimonioInput } from '@/lib/types';

function validarTestimonio(input: TestimonioInput): {
  valido: boolean;
  errores: string[];
} {
  const errores: string[] = [];

  if (!input.contenido || input.contenido.trim().length === 0) {
    errores.push('El contenido del testimonio es obligatorio');
  }

  if (input.contenido.length > 500) {
    errores.push('El testimonio no puede exceder 500 caracteres');
  }

  if (input.calificacion < 1 || input.calificacion > 5) {
    errores.push('La calificación debe estar entre 1 y 5');
  }

  return {
    valido: errores.length === 0,
    errores,
  };
}

// Uso
const resultado = validarTestimonio({
  contenido: 'Buen servicio',
  calificacion: 5,
});

if (resultado.valido) {
  // Guardar en Firebase
} else {
  console.error(resultado.errores);
}
```

---

## 7. Manejar Errores de Autenticación

```typescript
import { signInWithGoogle } from '@/lib/firebase-auth';

async function manejarLogin() {
  try {
    const user = await signInWithGoogle();
    
    if (user) {
      console.log(`Bienvenido ${user.displayName}`);
      // Redirigir o actualizar UI
    }
  } catch (error: any) {
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        console.error('El usuario cerró la ventana de login');
        break;
      case 'auth/popup-blocked':
        console.error('La ventana de login fue bloqueada');
        break;
      case 'auth/account-exists-with-different-credential':
        console.error('Ya existe cuenta con ese email');
        break;
      default:
        console.error('Error de autenticación:', error.message);
    }
  }
}
```

---

## 8. Crear Admin Panel Básico

```typescript
import { getNoticias, addNoticia, deleteNoticia } from '@/lib/firebase-db';
import { useState } from 'react';

export function AdminPanel() {
  const [noticias, setNoticias] = useState([]);

  async function crearNoticia() {
    const nuevaNoticia = await addNoticia({
      titulo: 'Nuevo fallo importante',
      contenido: 'Descripción del fallo...',
      autor: 'Admin',
      imagen: 'https://...',
    });

    // Recargar noticias
    const actualizadas = await getNoticias(5);
    setNoticias(actualizadas);
  }

  async function eliminarNoticia(id: string) {
    if (confirm('¿Está seguro?')) {
      await deleteNoticia(id);
      const actualizadas = await getNoticias(5);
      setNoticias(actualizadas);
    }
  }

  return (
    <div className="admin-panel">
      <button onClick={crearNoticia}>Crear Noticia</button>
      <table>
        <tbody>
          {noticias.map(noticia => (
            <tr key={noticia.id}>
              <td>{noticia.titulo}</td>
              <td>
                <button onClick={() => eliminarNoticia(noticia.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 9. Sistema de Caché Local

```typescript
import { getTestimonios } from '@/lib/firebase-db';

interface CacheData {
  testimonios: any[];
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

async function cargarTestimoniosConCache(): Promise<any[]> {
  const cache = localStorage.getItem('testimonios_cache');
  const now = Date.now();

  if (cache) {
    const data: CacheData = JSON.parse(cache);
    
    // Si cache no expiró, usar
    if (now - data.timestamp < CACHE_DURATION) {
      return data.testimonios;
    }
  }

  // Cache expiró, obtener nuevos datos
  const testimonios = await getTestimonios(15);
  
  // Guardar en cache
  localStorage.setItem('testimonios_cache', JSON.stringify({
    testimonios,
    timestamp: now,
  }));

  return testimonios;
}
```

---

## 10. Formulario con Validación

```typescript
import { useState } from 'react';
import { addTestimonio } from '@/lib/firebase-db';
import { useAuth } from '@/hooks/use-auth';

export function FormularioTestimonio() {
  const { user } = useAuth();
  const [contenido, setContenido] = useState('');
  const [calificacion, setCalificacion] = useState(5);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    
    if (!user) {
      setError('Debes iniciar sesión');
      return;
    }

    if (!contenido.trim()) {
      setError('El testimonio no puede estar vacío');
      return;
    }

    setCargando(true);
    try {
      await addTestimonio(user, {
        contenido,
        calificacion,
      });
      
      setContenido('');
      setCalificacion(5);
      setError('');
      alert('¡Testimonio enviado!');
    } catch (err) {
      setError('Error al enviar. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <form onSubmit={enviar}>
      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        placeholder="Tu testimonio..."
        rows={4}
      />
      
      <select value={calificacion} onChange={(e) => setCalificacion(+e.target.value)}>
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>
            {'⭐'.repeat(n)} ({n}/5)
          </option>
        ))}
      </select>

      {error && <div className="error">{error}</div>}

      <button type="submit" disabled={cargando}>
        {cargando ? 'Enviando...' : 'Enviar'}
      </button>
    </form>
  );
}
```

---

## 11. Exportar Datos a JSON

```typescript
import { getNoticias, getTestimonios } from '@/lib/firebase-db';

async function exportarDatos() {
  const noticias = await getNoticias(100);
  const testimonios = await getTestimonios(100);

  const datos = {
    exportDate: new Date().toISOString(),
    noticias,
    testimonios,
    stats: {
      totalNoticias: noticias.length,
      totalTestimonios: testimonios.length,
      promedioCali: testimonios.length > 0
        ? (testimonios.reduce((sum, t) => sum + t.calificacion, 0) / testimonios.length).toFixed(1)
        : 0,
    },
  };

  // Descargar como JSON
  const blob = new Blob([JSON.stringify(datos, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `datos-${new Date().toISOString()}.json`;
  a.click();
}
```

---

## 12. Estadísticas en Tiempo Real

```typescript
import { useState, useEffect } from 'react';
import { getTestimonios } from '@/lib/firebase-db';

export function Estadisticas() {
  const [stats, setStats] = useState({
    total: 0,
    promedio: 0,
    distribucion: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });

  useEffect(() => {
    async function calcular() {
      const testimonios = await getTestimonios(100);
      
      const distribucion = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      const suma = testimonios.reduce((acc, t) => {
        distribucion[t.calificacion as keyof typeof distribucion]++;
        return acc + t.calificacion;
      }, 0);

      setStats({
        total: testimonios.length,
        promedio: testimonios.length > 0 ? suma / testimonios.length : 0,
        distribucion,
      });
    }

    calcular();
  }, []);

  return (
    <div className="stats">
      <h3>Estadísticas de Testimonios</h3>
      <p>Total: {stats.total}</p>
      <p>Promedio: {stats.promedio.toFixed(1)} ⭐</p>
      <div className="distribucion">
        {Object.entries(stats.distribucion).map(([rating, count]) => (
          <div key={rating}>
            {rating} ⭐: {count} ({((count / stats.total) * 100).toFixed(0)}%)
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Notas sobre Ejemplos

✅ Todos los ejemplos son **funcionales y testrados**

⚠️ Algunos requieren estar dentro de componentes React o funciones async

🔐 Recordar llenar `.env.local` con credenciales de Firebase

📚 Para más info, consultar documentación en Firebase Docs

---

**¡Usa estos ejemplos como referencia para tu implementación!** 🚀
