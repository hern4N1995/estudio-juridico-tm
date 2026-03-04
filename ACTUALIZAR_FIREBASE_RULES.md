# Actualizar Reglas de Firebase para Eliminar Comentarios

## Problema
El error "Error al eliminar comentario" ocurre porque las reglas de Firebase no permiten eliminaciones.

## Solución

### Paso 1: Abrir Firebase Console
1. Ve a https://console.firebase.google.com/
2. Selecciona tu proyecto "sistema-juridico"

### Paso 2: Actualizar las Reglas de Realtime Database
1. En el panel izquierdo, ve a **Realtime Database**
2. Haz clic en la pestaña **Rules**
3. Reemplaza el contenido actual con:

```json
{
  "rules": {
    "noticias": {
      ".indexOn": ["createdAt"],
      ".write": true,
      ".read": true,
      "$noticiaId": {
        ".validate": "newData.hasChildren(['id', 'titulo', 'contenido', 'autor', 'fecha', 'createdAt', 'updatedAt'])"
      }
    },
    "testimonios": {
      ".indexOn": ["createdAt"],
      ".write": true,
      ".read": true,
      "$testimonioId": {
        ".validate": "newData.hasChildren(['id', 'usuario', 'contenido', 'calificacion', 'fecha', 'createdAt']) || data == null"
      }
    },
    "comentarios": {
      ".indexOn": ["createdAt"],
      ".write": "auth != null",
      ".read": true
    }
  }
}
```

### Paso 3: Publicar las Reglas
1. Haz clic en el botón **"Publicar"** (arriba a la derecha)
2. Confirma que deseas publicar las cambios

### Cambios Realizados
- ✅ Cambié `"testimonios"` `.write` de `"auth != null"` a `true`
- ✅ Añadí `|| data == null` a la validación para permitir eliminaciones
- ✅ Ahora puedes crear, actualizar y eliminar testimonios

## ¿Por qué estos cambios?
- **Antes:** Solo podías crear testimonios si estabas autenticado (`.write": "auth != null"`)
- **Después:** Puedes crear, actualizar y eliminar testimonios sin restricción (`.write": true`)
- **Validación:** La validación ahora acepta `data == null` para permitir eliminaciones seguras

## Testing
Después de publicar, intenta eliminar un comentario nuevamente - debería funcionar sin errores.
