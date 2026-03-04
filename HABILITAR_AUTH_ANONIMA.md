# 🔐 Habilitar Autenticación Anónima en Firebase

## PROBLEMA ACTUAL
- ❌ Error: `auth/admin-restricted-operation`
- ❌ La autenticación anónima no está habilitada en Firebase

## SOLUCIÓN: Habilitar Autenticación Anónima

### Paso 1: Acceder a Firebase Console
1. Ve a https://console.firebase.google.com
2. Selecciona el proyecto **estudio-juridico-tm**
3. En el menú izquierdo, ve a **Authentication** (Autenticación)

### Paso 2: Ir a la Sección de Proveedores
1. Haz clic en la pestaña **Proveedores de Registro** o **Sign-in method**
2. Verás una lista de métodos de autenticación disponibles

### Paso 3: Habilitar Autenticación Anónima
1. Busca **Anonymous** (Anónimo) en la lista
2. Haz clic en él
3. Verás un toggle que dice **Enable** (Habilitar)
4. **Haz clic en el toggle para habilitarlo**
5. Un panel se abrirá con opciones
6. Haz clic en **Guardar** (Save)

### Paso 4: Verificar que está Habilitado
- Debería ver un indicador verde o estado "Enabled" junto a "Anonymous"

## ✅ VERIFICACIÓN
Después de habilitar la autenticación anónima:
1. Vuelve a la aplicación
2. Intenta agregar una noticia nuevamente
3. Debería funcionar sin errores
4. Verás el mensaje "Noticia agregada exitosamente"

## 📝 QUÉ ESTÁ PASANDO

**Antes (Sin Autenticación Anónima)**:
```
Usuario → Intenta agregar noticia → Firebase rechaza → Error
```

**Después (Con Autenticación Anónima)**:
```
Usuario → Se autentica anónimamente → Agrega noticia → Firebase acepta ✅
```

## 🆘 SI SIGUE SIN FUNCIONAR
1. Recarga completamente la página (Ctrl+F5)
2. Limpia el caché: Ctrl+Shift+Delete
3. Intenta en una pestaña de incógnito
4. Abre la consola (F12) y mira los errores nuevos

## 💾 TAMBIÉN NECESITAS ACTUALIZAR LAS REGLAS

Si aún no lo has hecho, actualiza las reglas de Firebase (ve a **Realtime Database → Reglas**):

```json
{
  "rules": {
    "noticias": {
      ".indexOn": ["createdAt"],
      ".write": "auth != null",
      ".read": true
    },
    "testimonios": {
      ".indexOn": ["createdAt"],
      ".write": "auth != null",
      ".read": true
    },
    "comentarios": {
      ".indexOn": ["createdAt"],
      ".write": "auth != null",
      ".read": true
    }
  }
}
```

Luego haz clic en **Publicar** (Publish).
