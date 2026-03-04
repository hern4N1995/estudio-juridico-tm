# ⚡ QUICK START - 5 MINUTOS PARA DEPLOYAR

## 📝 Requisitos Previos

- [ ] Cuenta GitHub
- [ ] Cuenta Vercel (gratuita)
- [ ] Tu código en GitHub

---

## 🚀 Paso 1: Push a GitHub (2 minutos)

```powershell
cd 'd:\hern4N\Desktop\sistema-juridico'

# Si es primera vez
git init
git add .
git commit -m "Sistema Jurídico - Listo para producción"

# Crear repo en GitHub.com primero, luego:
git remote add origin https://github.com/TU_USUARIO/sistema-juridico.git
git branch -M main
git push -u origin main
```

---

## 🌐 Paso 2: Deploy a Vercel (3 minutos)

### A. Conectar Vercel a GitHub

1. Ve a **https://vercel.com**
2. Haz clic en **"New Project"**
3. Haz clic en **"Import Git Repository"**
4. Busca **"sistema-juridico"**
5. Haz clic en **"Import"**

### B. Configurar Variables de Entorno

Vercel automáticamente te pedirá las variables. Copia estas 7:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyD7uIzA4x5-w6t7uIoPr2BTJEHaQHCaAN8

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=estudio-juridico-tm.firebaseapp.com

NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://estudio-juridico-tm-default-rtdb.firebaseio.com

NEXT_PUBLIC_FIREBASE_PROJECT_ID=estudio-juridico-tm

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=estudio-juridico-tm.appspot.com

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=848912396921

NEXT_PUBLIC_FIREBASE_APP_ID=1:848912396921:web:ad70d51072f65516569aa8
```

### C. Deploy

1. Haz clic en **"Deploy"**
2. **Espera 2-3 minutos**
3. ¡Listo! Tu URL será: `https://sistema-juridico.vercel.app`

---

## ✅ Validación (30 segundos)

1. Abre tu URL en el navegador
2. Intenta agregar una noticia
3. Refresca la página (F5)
4. ¿La noticia sigue ahí? ✅ **FUNCIONA**

---

## 🎉 ¡COMPLETADO!

Tu sitio está ahora en producción.

**URL:** `https://sistema-juridico.vercel.app`

---

## 📚 Documentación Completa

Para más detalles, ver:
- `DEPLOYMENT_GUIDE.md` - Guía completa
- `DATOS_PERSISTENCIA.md` - Cómo funcionan los datos
- `RESUMEN_FINAL_ESTADO.md` - Estado completo del proyecto

---

## 🆘 Si algo falla

### "Firebase no carga datos"
→ Verifica que copiaste las variables correctamente en Vercel

### "Página en blanco"
→ Haz clic en Deployments en Vercel y lee los logs

### "Build failed"
→ Mismo lugar: lee los logs del deployment fallido

---

**¡Ahora sí está LISTO para producción!** 🚀

