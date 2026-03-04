# 📧 Cómo Cambiar el Correo que Recibe las Consultas

## 🎯 ¿Dónde Cambiar?

### Opción 1: Cambio Directo en `.env.local` (Recomendado)

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Busca esta línea:
   ```env
   STUDIO_CONTACT_EMAIL=transito412@gmail.com
   ```

3. Reemplázala con tu correo:
   ```env
   STUDIO_CONTACT_EMAIL=tuCorreo@gmail.com
   ```

**Ejemplo:**
```env
STUDIO_CONTACT_EMAIL=contacto@miestudio.com
```

**Ventajas:**
- ✅ Fácil de cambiar
- ✅ No necesitas editar código
- ✅ Puedes tener diferentes correos en desarrollo y producción

---

## 📋 Pasos Exactos

### Paso 1: Abre `.env.local`
- Ruta: `d:\hern4N\Desktop\sistema-juridico\.env.local`

### Paso 2: Encuentra la línea
```env
STUDIO_CONTACT_EMAIL=transito412@gmail.com
```

### Paso 3: Cambia el correo
```env
STUDIO_CONTACT_EMAIL=nuevoCorreo@gmail.com
```

### Paso 4: Guarda el archivo (Ctrl+S)

### Paso 5: Reinicia el servidor
- Si tienes el servidor ejecutándose, debes reiniciarlo para que cargue la nueva variable

---

## ✅ Verificación

Una vez cambiado:

1. **Envía un test desde el formulario de contacto**
2. **Verifica que el email llegue a tu nuevo correo**
3. **¡Listo!** ✅

---

## 🔧 Cómo Funciona Internamente

El archivo `src/app/api/send-contact/route.ts` ahora:

```typescript
const STUDIO_EMAIL = process.env.STUDIO_CONTACT_EMAIL || 'transito412@gmail.com';
```

Esto significa:
- ✅ Lee el correo de `.env.local`
- ✅ Si no existe, usa `transito412@gmail.com` como valor por defecto
- ✅ Las consultas se envían al correo que definas

---

## 📊 Ejemplo Real

### `.env.local`:
```env
STUDIO_CONTACT_EMAIL=miestudio@gmail.com
```

### Resultado:
- Cuando alguien llena el formulario y hace clic en "Enviar Consulta"
- El email se envía a: `miestudio@gmail.com`
- El usuario recibe confirmación en su propio correo

---

## 💡 Tips

### Para usar múltiples correos:
Si quieres que varios correos reciban las consultas, necesitarías:
1. Enviar a múltiples direcciones en el API route
2. O usar un email que tenga forwarding configurado

### Para cambios en producción:
- Los cambios en `.env.local` solo funcionan en desarrollo
- En producción, debes configurar las variables de entorno en tu hosting
- (Ejemplo: Vercel, Railway, etc.)

---

## ⚠️ Importante

- **No compartas tu `.env.local` públicamente**
- El archivo ya debe estar en `.gitignore`
- Si publicas tu código, nadie verá este archivo

---

¿Necesitas cambiar a otro correo ahora? Solo dime cuál y te ayudo a hacerlo. 🚀
