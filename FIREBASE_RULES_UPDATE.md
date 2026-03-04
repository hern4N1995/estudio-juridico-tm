# 🔐 Cómo Actualizar las Reglas de Firebase

## PROBLEMA ACTUAL
- ❌ Error: `PERMISSION_DENIED` al intentar guardar noticias
- ❌ Las reglas de seguridad de Firebase no permiten escribir en `/noticias`

## SOLUCIÓN: Actualizar Reglas en Firebase Console

### Paso 1: Acceder a Firebase Console
1. Ve a https://console.firebase.google.com
2. Selecciona el proyecto **estudio-juridico-tm**
3. En el menú izquierdo, ve a **Realtime Database**

### Paso 2: Ir a la Sección de Reglas
1. Haz clic en la pestaña **Reglas** (Rules)
2. Verás el editor de reglas con formato JSON

### Paso 3: Copiar y Pegar las Nuevas Reglas
**Reemplaza TODO el contenido** con esto:

```json
{
  "rules": {
    "noticias": {
      ".indexOn": ["createdAt"],
      ".write": "auth != null",
      ".read": true,
      "$noticiaId": {
        ".validate": "newData.hasChildren(['id', 'titulo', 'contenido', 'autor', 'fecha', 'createdAt', 'updatedAt'])"
      }
    },
    "testimonios": {
      ".indexOn": ["createdAt"],
      ".write": "auth != null",
      ".read": true,
      "$testimonioId": {
        ".validate": "newData.hasChildren(['id', 'usuario', 'contenido', 'calificacion', 'fecha', 'createdAt'])"
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

### Paso 4: Publicar las Reglas
1. Haz clic en el botón **Publicar** (Publish)
2. Confirma si Firebase te pregunta
3. Espera a que se publiquen las reglas (normalmente 1-2 segundos)

## ✅ VERIFICACIÓN
Después de publicar las reglas, intenta:
1. Agregar una noticia desde la sección "Novedades & Fallos Destacados"
2. Debería guardarse exitosamente en Firebase
3. Debería aparecer en el carousel de noticias

## 🔍 QUÉ SIGNIFICAN LAS REGLAS

| Regla | Significado |
|-------|------------|
| `.write: "auth != null"` | Solo usuarios autenticados pueden escribir |
| `.read: true` | Cualquiera puede leer (público) |
| `.indexOn` | Optimiza búsquedas por fecha |
| `.validate` | Valida que los campos requeridos existan |

## ⚠️ IMPORTANTE
- Las noticias requieren autenticación para escribir (solo admin)
- Los testimonios requieren autenticación (usuarios que dejan comentarios)
- Los comentarios requieren autenticación (usuarios que comentan noticias)
- TODO requiere estar logueado para escribir

## 🆘 SI SIGUE SIN FUNCIONAR
1. Abre la consola del navegador (F12)
2. Intenta agregar una noticia
3. Copia el error completo
4. Verifica que las reglas están publicadas correctamente
