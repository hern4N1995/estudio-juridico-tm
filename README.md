# 🏛️ Estudio Jurídico Tránsito Martínez

**Sitio web profesional para estudio de abogados con backend dinámico basado en Firebase.**

```
╔═════════════════════════════════════════════════════════════╗
║                                                             ║
║         Sistema Jurídico - Completo y Funcional            ║
║                                                             ║
║      ✅ Autenticación OAuth     ✅ Base de Datos            ║
║      ✅ Testimonios Dinámicos   ✅ Noticias Persistentes    ║
║      ✅ Tema Oscuro/Claro       ✅ Responsivo               ║
║                                                             ║
╚═════════════════════════════════════════════════════════════╝
```

---

## 🚀 Comenzar en 20 Minutos

### 1. Leer Guía Rápida (5 min)
```bash
Abre: FIREBASE_VISUAL_GUIDE.md
```

### 2. Crear Proyecto Firebase (10 min)
```
1. Ir a: https://console.firebase.google.com
2. Crear proyecto
3. Crear Realtime Database
4. Habilitar Google + Facebook Auth
5. Copiar credenciales
```

### 3. Configurar Localmente (5 min)
```bash
# Crear .env.local con credenciales
cp .env.local.example .env.local
# Editar con valores de Firebase

# Validar configuración
npm run validate:firebase

# Ejecutar
npm run dev
```

**¡Listo!** Abre http://localhost:9002

---

## 📚 Documentación

**EMPIEZA AQUÍ:**
- 🟢 [`START_HERE.md`](./START_HERE.md) - Resumen ejecutivo (2 min)
- 🎨 [`FIREBASE_VISUAL_GUIDE.md`](./FIREBASE_VISUAL_GUIDE.md) - Visual paso a paso (5 min) ⭐
- ⚡ [`QUICK_START.md`](./QUICK_START.md) - Para apurados (3 min)

**MÁS INFORMACIÓN:**
- 📚 [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md) - Guía técnica completa
- 🔧 [`BACKEND_SETUP_SUMMARY.md`](./BACKEND_SETUP_SUMMARY.md) - Resumen técnico
- 💻 [`PRACTICAL_EXAMPLES.md`](./PRACTICAL_EXAMPLES.md) - 12+ ejemplos de código
- 📋 [`INDEX.md`](./INDEX.md) - Índice completo
- 📊 [`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md) - Guía por rol

---

## ✨ Características

### Para Visitantes
- ✅ Ver noticias en carrusel infinito (hover pause, drag)
- ✅ Ver testimonios (3 + "Ver más" para 15)
- ✅ Interfaz dark/light mode
- ✅ Fully responsive en mobile

### Para Usuarios Autenticados
- ✅ Login con Google o Facebook
- ✅ Dejar testimonios con calificación ⭐⭐⭐⭐⭐
- ✅ Ver perfil desde OAuth
- ✅ Comentar en noticias

### Para Administradores
- ✅ Panel admin con contraseña (Martinez.26)
- ✅ Agregar noticias
- ✅ Eliminar noticias

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|-----------|
| **Framework** | Next.js 15 |
| **UI** | React 19, Tailwind CSS |
| **Backend** | Firebase (Auth + Realtime DB) |
| **Lenguaje** | TypeScript |
| **Icons** | Lucide React |
| **OAuth** | Google, Facebook |

---

## 📂 Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx              (Página principal)
│   ├── layout.tsx            (Layout global)
│   ├── globals.css           (Estilos globales)
│   └── api/
│       └── health/route.ts   (Health check)
│
├── components/
│   ├── auth-button.tsx       (Login/Logout)
│   ├── testimonial-form.tsx  (Formulario testimonios)
│   ├── testimonials-section.tsx (Sección testimonios)
│   ├── theme-provider.tsx    (Dark/Light theme)
│   ├── theme-toggle.tsx      (Toggle button)
│   └── lex/
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── Services.tsx
│       ├── Team.tsx
│       ├── News.tsx          (Actualizado con Firebase)
│       ├── Testimonials.tsx  (Estático - reemplazado)
│       └── ...
│
├── lib/
│   ├── firebase.ts           (Inicialización)
│   ├── firebase-auth.ts      (Autenticación OAuth)
│   ├── firebase-db.ts        (CRUD Database)
│   ├── types.ts              (Tipos TypeScript)
│   ├── data.ts               (Datos estáticos)
│   └── utils.ts
│
└── hooks/
    └── use-auth.ts           (Hook de autenticación)

public/
├── img/                      (Imágenes)
├── TMsvg.png                 (Favicon)
└── ...

Documentación/
├── START_HERE.md             ⭐ EMPIEZA AQUÍ
├── FIREBASE_VISUAL_GUIDE.md  ⭐ RECOMENDADO
├── QUICK_START.md
├── FIREBASE_SETUP.md
├── BACKEND_SETUP_SUMMARY.md
├── PRACTICAL_EXAMPLES.md
├── INDEX.md
└── ...
```

---

## 🔐 Configuración de Seguridad

### Reglas Firebase Realtime Database
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

### Variables de Entorno
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

---

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Ejecutar servidor local (puerto 9002)

# Build & Deployment
npm run build            # Compilar para producción
npm run start            # Ejecutar build de producción

# Validación
npm run validate:firebase # Validar configuración de Firebase
npm run typecheck        # Verificar tipos TypeScript
npm run lint             # ESLint

# AI (Opcional)
npm run genkit:dev       # Genkit AI development
npm run genkit:watch     # Genkit AI con watch
```

---

## 📋 Checklist de Configuración

- [ ] Crear proyecto en Firebase Console
- [ ] Crear Realtime Database (Test mode)
- [ ] Habilitar Google Authentication
- [ ] Habilitar Facebook Authentication (opcional)
- [ ] Copiar credenciales
- [ ] Crear `.env.local` con credenciales
- [ ] Ejecutar `npm run validate:firebase`
- [ ] Ejecutar `npm run dev`
- [ ] Probar login en Testimonios
- [ ] Dejar testimonio de prueba

---

## 🚨 Troubleshooting

### Firebase no inicializa
```bash
# Verificar .env.local
npm run validate:firebase

# Revisar que Firebase Console tenga DB habilitada
# Revisar que Auth esté habilitado
```

### Testimonios no guardan
```bash
# Revisar que Realtime Database exista
# Verificar reglas de seguridad en Firebase Console
# Abrir F12 → Console para ver errores
```

### OAuth no funciona
```bash
# Google: Usualmente funciona automáticamente
# Facebook: Verificar App ID en .env.local
# Revisar que OAuth esté habilitado en Firebase
```

---

## 📊 Estadísticas

```
Componentes React:     15+
Funciones Firebase:    10+
Tipos TypeScript:      6+
Documentos guía:       7+
Ejemplos de código:    12+
Total líneas código:   ~2,500
```

---

## 🎓 Para Aprender

### Para Comenzar
1. Leer [`START_HERE.md`](./START_HERE.md)
2. Seguir [`FIREBASE_VISUAL_GUIDE.md`](./FIREBASE_VISUAL_GUIDE.md)
3. Explorar [`PRACTICAL_EXAMPLES.md`](./PRACTICAL_EXAMPLES.md)

### Para Profundizar
- [`FIREBASE_SETUP.md`](./FIREBASE_SETUP.md) - Configuración avanzada
- [`BACKEND_SETUP_SUMMARY.md`](./BACKEND_SETUP_SUMMARY.md) - Arquitectura
- [`IMPLEMENTATION_SUMMARY.md`](./IMPLEMENTATION_SUMMARY.md) - Decisiones técnicas

---

## 🚀 Roadmap Futuro

### Próxima Fase
- [ ] Admin Dashboard visual
- [ ] Email verification
- [ ] Moderación de testimonios
- [ ] Firebase Analytics
- [ ] Image upload a Storage

### Fase 2
- [ ] CDN global
- [ ] Caching optimizado
- [ ] Email notifications
- [ ] Mobile app

---

## 📞 Soporte

### Documentación
- Firebase Docs: https://firebase.google.com/docs
- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev

### Validación Rápida
```bash
npm run validate:firebase  # Revisar configuración
npm run typecheck          # Revisar tipos
```

### Debugging
- Abre F12 en navegador
- Ve a Console tab
- Busca errores rojos
- Revisa documentación correspondiente

---

## 🏆 Hecho con ❤️

**Para**: Estudio Jurídico Tránsito Martínez  
**Version**: 2.0 - Backend Firebase  
**Status**: ✅ Producción Ready (requiere Firebase credentials)

---

## 📄 Licencia

Proyecto privado para Estudio Jurídico Tránsito Martínez.

---

## 🎉 ¡Comienza Ya!

1. **Abre**: [`START_HERE.md`](./START_HERE.md)
2. **Sigue**: [`FIREBASE_VISUAL_GUIDE.md`](./FIREBASE_VISUAL_GUIDE.md)
3. **Ejecuta**: `npm run dev`

**¡A llevar tu sitio jurídico al siguiente nivel!** 🚀

