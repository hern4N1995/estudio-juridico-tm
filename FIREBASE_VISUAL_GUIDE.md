# 🔐 Guía Visual: Configurar Firebase en 5 Minutos

## PASO 1: Crear Proyecto en Firebase Console

**URL**: https://console.firebase.google.com

### Pasos:
1. Click en **"Crear proyecto"**
2. Nombre: `estudio-juridico-transito-martinez`
3. ✅ Aceptar términos
4. ✅ Desabilitar Google Analytics (opcional)
5. Click **"Crear proyecto"**

⏱️ Esperar 1-2 minutos mientras se crea...

---

## PASO 2: Crear Realtime Database

1. En la barra lateral izquierda: **Build** → **Realtime Database**
2. Click **"Crear Database"**
3. Ubicación: `Seleccionar región cercana` (us-central1 está bien)
4. Modo de seguridad: **Test mode** (para desarrollo)
5. Click **"Enable"**

---

## PASO 3: Habilitar Autenticación

1. En la barra lateral: **Build** → **Authentication**
2. Click **"Comenzar"**
3. En pestaña **"Sign-in method"**:

### Agregar Google:
- Click en **Google**
- Toggle para **Enable** (Azul)
- Email de soporte: tu@email.com
- Click **Save**

### Agregar Facebook:
- Click en **Facebook**
- Toggle para **Enable** (Azul)
- Ir a https://developers.facebook.com
- Crear app → Copiar App ID y App Secret
- Pegar en Firebase
- Click **Save**

---

## PASO 4: Obtener Credenciales

1. Click en **Configuración del Proyecto** (⚙️ esquina inferior)
2. Tab **"Mis aplicaciones"**
3. Si no hay web app:
   - Click **Agregar app**
   - Seleccionar **Web**
   - Nombre: "Estudio Jurídico"
   - Click **Register app**

4. Copiar este bloque (NO compartir el `privateKey`):

```javascript
{
  "apiKey": "AIzaSyA...",
  "authDomain": "tu-proyecto.firebaseapp.com",
  "databaseURL": "https://tu-proyecto.firebaseio.com",
  "projectId": "tu-proyecto",
  "storageBucket": "tu-proyecto.appspot.com",
  "messagingSenderId": "1234567890",
  "appId": "1:1234567890:web:abc123..."
}
```

---

## PASO 5: Llenar `.env.local`

En la raíz del proyecto (`d:\hern4N\Desktop\sistema-juridico`), crear archivo `.env.local`:

```env
# Copiar valores de la configuración de Firebase anterior
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://tu-proyecto.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123...

# Google OAuth (usualmente auto-configurado por Firebase)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456-abc.apps.googleusercontent.com

# Facebook OAuth (del Facebook Developer Console)
NEXT_PUBLIC_FACEBOOK_APP_ID=123456789
```

---

## PASO 6: Configurar Reglas de Seguridad

1. En Realtime Database → Tab **"Rules"**
2. Reemplazar todo con esto:

```json
{
  "rules": {
    "noticias": {
      ".read": true,
      ".write": false
    },
    "testimonios": {
      ".read": true,
      ".write": "auth != null"
    },
    "comentarios": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

3. Click **Publicar**

---

## PASO 7: Verificar en Local

```bash
# En la terminal del proyecto
npm run dev

# Abre http://localhost:9002
```

### Checklist:
- [ ] El sitio carga sin errores
- [ ] Sección "Testimonios" visible
- [ ] Botón "Iniciar sesión" funciona
- [ ] Modal aparece con Google y Facebook
- [ ] Puedes iniciar sesión
- [ ] Aparece tu nombre en la esquina

✅ **¡Éxito!** Tu backend está configurado.

---

## 🆘 Si algo no funciona

### Error: "Failed to initialize Firebase"
→ Revisar `.env.local`, asegurarse que `NEXT_PUBLIC_FIREBASE_API_KEY` sea correcto

### Error: "PERMISSION_DENIED"
→ Ir a Rules en Firebase, publicar las reglas nuevamente

### No aparece Google/Facebook
→ Revisar que estén habilitados en Authentication → Sign-in method

### Testimonios no se guardan
→ Verificar Realtime Database existe y está en TEST mode

---

## 📊 Panel de Control Firebase

### Entrar a tu proyecto anytime:
1. https://console.firebase.google.com
2. Click en proyecto: `estudio-juridico-transito-martinez`
3. Ver datos en **Realtime Database**

### Estructura de datos visible:
```
Proyecto
├── noticias
│   └── news-id-123: { titulo, contenido, ... }
├── testimonios
│   └── test-id-456: { usuario, contenido, calificacion, ... }
└── comentarios
    └── noticia-id: { comentario-id: { usuario, contenido, ... } }
```

---

## 🎯 Resumen

| Paso | Acción | Tiempo |
|------|--------|--------|
| 1 | Crear proyecto Firebase | 2 min |
| 2 | Crear Realtime DB | 1 min |
| 3 | Habilitar Auth (Google + Facebook) | 2 min |
| 4 | Copiar credenciales | 1 min |
| 5 | Llenar `.env.local` | 1 min |
| 6 | Configurar reglas | 1 min |
| 7 | Probar local | 1 min |
| **Total** | | **9 minutos** |

---

**¡Listo!** 🎉 Tu site jurídico ahora es dinámico con autenticación real.
