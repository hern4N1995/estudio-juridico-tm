# 🔍 DIAGNÓSTICO: No aparecen comentarios/noticias

## 📋 Checklist de Verificación

### 1. ¿Firebase está correctamente conectado?
```bash
# En la consola del navegador (F12):
# 1. Abre DevTools (F12)
# 2. Ve a la pestaña "Console"
# 3. Ejecuta:
firebase.auth().currentUser
firebase.database().ref('testimonios').once('value').then(snap => console.log(snap.val()))
```

### 2. ¿Las Firebase Rules permiten lectura?
Necesitas agregar estas reglas en Firebase Console:

```json
{
  "rules": {
    "testimonios": {
      ".read": true,
      ".write": "auth != null",
      ".indexOn": ["createdAt"]
    },
    "noticias": {
      ".read": true,
      ".write": "auth != null",
      ".indexOn": ["createdAt"]
    }
  }
}
```

---

## 🚀 Pasos para Solucionar

### PASO 1: Verificar datos en Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto `estudio-juridico-tm`
3. Ve a **Realtime Database**
4. Busca las secciones:
   - `testimonios` → ¿Hay datos aquí?
   - `noticias` → ¿Hay datos aquí?

Si NO HAY datos:
- ✅ Necesitas cargar datos manualmente O
- ✅ Los datos se borraron accidentalmente

### PASO 2: Verificar Firebase Rules
1. En Firebase Console → Realtime Database
2. Ve a la pestaña **Rules**
3. Copia el contenido actual y compáralo con esto:

```json
{
  "rules": {
    "noticias": {
      ".read": true,
      ".write": false,
      ".indexOn": ["createdAt"]
    },
    "testimonios": {
      ".read": true,
      ".write": "auth != null",
      ".indexOn": ["createdAt"]
    },
    "comentarios": {
      ".read": true,
      ".write": "auth != null",
      ".indexOn": ["createdAt"]
    }
  }
}
```

4. Si son diferentes, actualiza haciendo click en **Publish**

### PASO 3: Verificar consola del navegador
1. Abre tu sitio en navegador
2. Presiona F12 → Console
3. Busca mensajes como:
   - ✅ "Cargando testimonios..."
   - ✅ "Testimonios cargados:"
   - ❌ "Error loading testimonios:" → HAY UN ERROR

Si ves error, copia el mensaje de error completo.

### PASO 4: Limpiar cache del navegador
```
Chrome: Ctrl + Shift + Delete
Firefox: Ctrl + Shift + Delete
Safari: Cmd + Shift + Delete
```

Luego recarga la página.

---

## 💾 Repoblar Datos (Si se borraron)

Si tus comentarios/noticias se borraron, puedes repoblarlos manualmente en Firebase Console:

### Para TESTIMONIOS:
1. Firebase Console → Realtime Database
2. Click en **testimonios** (o crear si no existe)
3. Click en el icono de "+" → **Add Child**
4. Estructura:
```json
{
  "id": "test-1",
  "usuario": {
    "id": "user123",
    "email": "usuario@ejemplo.com",
    "displayName": "Juan Pérez",
    "photoURL": "https://...",
    "provider": "google",
    "createdAt": "2026-03-06T10:00:00Z"
  },
  "contenido": "Excelente servicio, muy profesionales",
  "calificacion": 5,
  "fecha": "06/03/2026",
  "createdAt": "2026-03-06T10:00:00.000Z",
  "updatedAt": "2026-03-06T10:00:00.000Z"
}
```

### Para NOTICIAS:
Estructura similar pero sin "usuario"

---

## 🔧 Código para Debuggear

Agrega este código en `testimonials-section.tsx` para ver qué está pasando:

```typescript
useEffect(() => {
  console.log('=== DEBUG TESTIMONIOS ===');
  console.log('Intentando cargar testimonios...');
  loadTestimonios();
  
  // Log cada 5 segundos
  const interval = setInterval(() => {
    console.log('Testimonios actuales:', testimonios);
  }, 5000);
  
  return () => clearInterval(interval);
}, []);
```

---

## ❌ Errores Comunes y Soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| "Error al cargar comentarios" | Firebase Rules incorrectas | Actualizar reglas `.read: true` |
| Aparece vacío | Sin datos en Firebase | Cargar datos manualmente |
| "Permiso denegado" | Usuario no autenticado | Cambiar rules a `.read: true` |
| Carga lenta | Índice no creado | Agregar `.indexOn: ["createdAt"]` |

---

## 📞 Información de Contacto

Si el problema persiste:
1. Ejecuta en consola:
   ```javascript
   firebase.database().ref().once('value').then(snap => console.log(snap.val()))
   ```
2. Copia TODO lo que aparece
3. Envíame la información

---

**Próximo paso:** Verifica los datos en Firebase Console
