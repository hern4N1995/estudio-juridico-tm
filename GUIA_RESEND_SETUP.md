# 📧 Guía Completa: Configurar Resend para Enviar Emails

## ✅ Paso 1: Resend Instalado
Ya instalamos el paquete:
```
npm install resend ✅
```

## 📋 Paso 2: Crear Cuenta en Resend

1. **Ve a https://resend.com**
2. **Haz clic en "Sign Up"**
3. **Regístrate con:**
   - Email
   - Contraseña
   - O usa GitHub

4. **Verifica tu email** - Te llegarán instrucciones de verificación

## 🔑 Paso 3: Obtener tu API Key

1. Una vez en tu dashboard de Resend
2. Ve a **"API Keys"** o **"Settings"** en el menú lateral
3. Copia tu **API Key** (empieza con `re_...`)
4. Ejemplo: `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## 🔐 Paso 4: Agregar API Key a Variables de Entorno

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Agrega esta línea:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Nota:** Reemplaza `re_xxx...` con tu API Key real

3. **IMPORTANTE:** El archivo `.env.local` ya debe estar en `.gitignore` (no se commitea)

## 🚀 Paso 5: Crear el API Route para Enviar Emails

Ya crearé esto por ti, pero tendrá esta estructura:

```
src/app/api/send-contact/route.ts
```

Este archivo:
- ✅ Recibe datos del formulario (POST)
- ✅ Valida los datos
- ✅ Envía email a tu dirección
- ✅ Envía confirmación al usuario
- ✅ Retorna respuesta al formulario

## 📝 Paso 6: Configurar el Formulario de Contacto

El componente `Contact.tsx` se modificará para:
- ✅ Hacer un POST al API route
- ✅ Mostrar loader mientras se envía
- ✅ Mostrar mensaje de éxito/error
- ✅ Limpiar formulario después de enviar

## 📧 Email de Prueba en Desarrollo

En desarrollo, Resend tiene un email de prueba:
```
onboarding@resend.dev
```

Puedes usar este para probar **ANTES** de verificar tu dominio.

## ✅ Resumen

| Paso | Estado | Descripción |
|------|--------|-------------|
| 1️⃣ Instalar Resend | ✅ Hecho | `npm install resend` |
| 2️⃣ Crear Cuenta | ⏳ Pendiente | Ve a resend.com y regístrate |
| 3️⃣ Obtener API Key | ⏳ Pendiente | Copia desde dashboard |
| 4️⃣ Variable de Entorno | ⏳ Pendiente | Agrega a `.env.local` |
| 5️⃣ API Route | ⏳ Pendiente | Lo crearé por ti |
| 6️⃣ Conectar Formulario | ⏳ Pendiente | Lo modificaré por ti |

## 🎯 Próximo Paso

Una vez que hayas hecho los pasos 2-4:

**Dime:**
1. ¿Creaste la cuenta en Resend? ✅
2. ¿Obtuviste tu API Key? 
3. ¿La agregaste a `.env.local`?

Entonces crearé automáticamente:
- El API Route para manejar los emails
- La funcionalidad en el formulario de contacto
- Todo estará listo para funcionar 🚀

---

## 💡 Preguntas Frecuentes

**¿Es gratis Resend?**
Sí, tienes 100 emails gratis por día durante 30 días. Luego puedes comprar créditos o plan pagado.

**¿Qué pasa con mi email personal?**
Se mantiene seguro. Solo usamos tu API Key, no la contraseña.

**¿Puedo usar mi dominio?**
Sí, en el plan pagado. Por ahora puedes usar `onboarding@resend.dev` para pruebas.

**¿Necesito backend?**
No, los API Routes de Next.js actúan como backend automáticamente.
