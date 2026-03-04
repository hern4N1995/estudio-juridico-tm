# ⚡ ACTUALIZAR REGLAS DE FIREBASE AHORA

## PASO RÁPIDO (2 minutos)

### 1. Ve a Firebase Console
- URL: https://console.firebase.google.com
- Proyecto: **estudio-juridico-tm**

### 2. Ve a Realtime Database → Reglas

### 3. COPIA Y PEGA ESTO:
```json
{
  "rules": {
    "noticias": {
      ".indexOn": ["createdAt"],
      ".write": true,
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

### 4. Haz clic en PUBLICAR

### 5. Listo ✅

Ahora vuelve a la app y prueba agregar una noticia.
