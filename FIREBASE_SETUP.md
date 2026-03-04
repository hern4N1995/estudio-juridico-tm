# Firebase Setup Guide - Estudio Jurídico Tránsito Martínez

## Descripción General

Este proyecto utiliza Firebase como backend para:
- **Autenticación OAuth**: Google y Facebook
- **Base de Datos en Tiempo Real**: Almacenamiento de noticias y testimonios
- **Almacenamiento Persistente**: Imágenes y documentos

## Requisitos Previos

1. Cuenta de Google (para Firebase)
2. Proyecto Firebase creado en [Firebase Console](https://console.firebase.google.com)
3. Node.js 16+ instalado

## Configuración Paso a Paso

### 1. Crear Proyecto Firebase

1. Ir a [Firebase Console](https://console.firebase.google.com)
2. Click en "Crear proyecto"
3. Ingresar nombre: `estudio-juridico-transito-martinez`
4. Seleccionar región (Latin America - Brasil)
5. Crear proyecto

### 2. Obtener Credenciales

1. En la consola de Firebase, ir a **Project Settings** (esquina inferior izquierda)
2. En la sección "Your apps", click en Web (</>)
3. Registrar una app con nombre `Estudio Jurídico`
4. Copiar el objeto de configuración que aparece

### 3. Habilitar Realtime Database

1. En la barra lateral, ir a **Realtime Database**
2. Click en "Create Database"
3. Seleccionar región: `us-central1` (o cercana a Latino América)
4. Seleccionar modo: **Test mode** (para desarrollo)
5. Click en "Enable"

### 4. Habilitar Autenticación

1. En la barra lateral, ir a **Authentication**
2. Click en "Get started"
3. En la pestaña "Sign-in method", agregar:
   - **Google**: Click en Google → Enable → Agregar email de soporte → Save
   - **Facebook**: Click en Facebook → Enable → Agregar App ID y App Secret → Save

#### Configurar Google OAuth

1. La mayoría viene pre-configurado por Firebase
2. Copiar tu `NEXT_PUBLIC_FIREBASE_API_KEY` para el Client ID

#### Configurar Facebook OAuth

1. Crear una aplicación en [Facebook Developer Console](https://developers.facebook.com)
2. Ir a **Settings > Basic** para obtener App ID y App Secret
3. En Facebook Developers, ir a **Settings > Basic** y copiar:
   - App ID → `NEXT_PUBLIC_FACEBOOK_APP_ID`
   - App Secret → usar en servidor (no incluir en cliente)

### 5. Configurar Variables de Entorno

1. Copiar el contenido de `firebaseConfig` de paso 2
2. Crear archivo `.env.local` en la raíz del proyecto
3. Completar con tus credenciales:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://tu_proyecto.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
NEXT_PUBLIC_GOOGLE_CLIENT_ID=tu_google_client_id
NEXT_PUBLIC_FACEBOOK_APP_ID=tu_facebook_app_id
```

### 6. Configurar Reglas de Seguridad de la Base de Datos

En Firebase Console → Realtime Database → Rules, reemplazar con:

```json
{
  "rules": {
    "noticias": {
      ".read": true,
      ".write": false,
      "$noticiaId": {
        ".write": "root.child('adminPassword').val() === auth.uid"
      }
    },
    "testimonios": {
      ".read": true,
      ".write": "auth != null",
      "$testimonioId": {
        ".read": true,
        ".write": "auth.uid === root.child('testimonios').child($testimonioId).child('usuario').child('id').val()"
      }
    },
    "comentarios": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

> ⚠️ **Nota**: Para producción, usar reglas más restrictivas

### 7. Verificar Instalación

1. Correr el servidor de desarrollo:
```bash
npm run dev
```

2. Navegar a `http://localhost:9002`

3. Hacer clic en "Iniciar sesión" en los testimonios

4. Si aparece el modal de selección (Google/Facebook), la configuración es correcta

## Estructura de Datos Firebase

### Noticias (`/noticias`)

```json
{
  "news-id-123": {
    "id": "news-id-123",
    "titulo": "Nuevo fallo en Derecho Penal",
    "contenido": "Descripción detallada...",
    "autor": "Sistema Jurídico",
    "imagen": "https://...",
    "createdAt": "2024-02-23T10:30:00.000Z",
    "updatedAt": "2024-02-23T10:30:00.000Z"
  }
}
```

### Testimonios (`/testimonios`)

```json
{
  "testimonio-id-456": {
    "id": "testimonio-id-456",
    "usuario": {
      "id": "user-123",
      "email": "usuario@gmail.com",
      "displayName": "Juan Pérez",
      "photoURL": "https://...",
      "provider": "google",
      "createdAt": "2024-02-23T10:25:00.000Z"
    },
    "contenido": "Excelente atención del equipo...",
    "calificacion": 5,
    "fecha": "23/02/2024",
    "createdAt": "2024-02-23T10:30:00.000Z",
    "updatedAt": "2024-02-23T10:30:00.000Z"
  }
}
```

### Comentarios (`/comentarios/{noticiaId}`)

```json
{
  "comentario-id-789": {
    "id": "comentario-id-789",
    "usuario": {
      "id": "user-123",
      "email": "usuario@gmail.com",
      "displayName": "Juan Pérez",
      "photoURL": "https://...",
      "provider": "google",
      "createdAt": "2024-02-23T10:25:00.000Z"
    },
    "contenido": "Muy interesante el fallo...",
    "fecha": "23/02/2024",
    "createdAt": "2024-02-23T10:32:00.000Z"
  }
}
```

## Troubleshooting

### Error: "Firebase: Error (auth/operation-not-supported-in-this-environment)"

**Solución**: El proyecto necesita tener OAuth habilitado en Firebase Console.

### Error: "PERMISSION_DENIED: Permission denied"

**Solución**: Revisar las reglas de seguridad de la base de datos en Firebase Console.

### No se cargan los testimonios

**Solución**: 
- Verificar que la URL de base de datos en `.env.local` sea correcta
- Verificar que Realtime Database esté habilitada
- Abrir la consola del navegador para ver errores más específicos

## Desarrollo Local

### Usar Firebase Emulator (Opcional)

Para desarrollar sin consumir recursos de Firebase:

```bash
npm install -g firebase-tools
firebase emulators:start
```

Luego descomentar las líneas del emulator en `src/lib/firebase.ts`

## Próximos Pasos

1. ✅ Configurar Firebase y OAuth
2. ⏳ Implementar admin dashboard para gestionar noticias
3. ⏳ Agregar validación de email para testimonios
4. ⏳ Crear sistema de moderación de comentarios
5. ⏳ Agregar analytics a Firebase

## Recursos Útiles

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Realtime Database Rules](https://firebase.google.com/docs/rules/basics)
- [Firebase Console](https://console.firebase.google.com)
