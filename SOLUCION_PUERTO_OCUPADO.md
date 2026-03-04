# 🔧 SOLUCIONES PARA EL PUERTO 3000 OCUPADO

## El Problema

```
Error: listen EADDRINUSE: address already in use :::3000
```

Esto sucede cuando:
- El servidor anterior no se cerró correctamente
- Next.js está corriendo en background
- Otro proceso está usando el puerto

---

## ✅ SOLUCIONES (Elige una)

### Opción 1: Usar Puerto Diferente (Más Fácil)

Simplemente usa un comando diferente:

```powershell
# Puerto 3000 (default)
npm run dev

# Puerto 3001 si 3000 está ocupado
npm run dev:3001

# Puerto 3002 si ambos están ocupados
npm run dev:3002
```

**Ventaja:** No necesitas matar nada, solo cambias de puerto
**URL:** `http://localhost:3001` o `http://localhost:3002`

---

### Opción 2: Usar el Script de Limpieza Automática

Ejecuta el script que prepara el puerto y luego inicia el servidor:

```powershell
.\kill-port.ps1
```

O con puerto específico:

```powershell
.\kill-port.ps1 -Port 3001
```

**Ventaja:** Limpia automáticamente y inicia el servidor
**Nota:** Es un PowerShell script, debe estar habilitado en tu sistema

---

### Opción 3: Matar Manualmente el Proceso

Si necesitas matar el proceso manualmente:

```powershell
# Ver qué está usando el puerto 3000
Get-NetTCPConnection -LocalPort 3000

# Matar el proceso por ID
Stop-Process -Id <PID> -Force

# O buscar por nombre (node.exe para Next.js)
Get-Process node | Stop-Process -Force
```

---

### Opción 4: Desde Terminal de Windows CMD

Si usas CMD en lugar de PowerShell:

```cmd
# Ver qué usa el puerto 3000
netstat -ano | findstr :3000

# Matar proceso por ID (reemplaza PID)
taskkill /PID <PID> /F

# O matar todos los node.exe
taskkill /IM node.exe /F
```

---

## 🎯 RECOMENDACIÓN

**La mejor solución es la Opción 1: Usar puertos diferentes**

### Por qué:

✅ No necesitas scripts
✅ No necesitas permisos especiales
✅ Más seguro (no matas procesos)
✅ Más rápido (solo cambias el comando)
✅ Funciona siempre

### Cómo usarlo:

1. Intenta con `npm run dev` (puerto 3000)
2. Si falla, usa `npm run dev:3001` (puerto 3001)
3. Si falla, usa `npm run dev:3002` (puerto 3002)

---

## 📋 Guía Paso a Paso

### Cuando ves el error "EADDRINUSE":

```powershell
# ❌ Error: EADDRINUSE: address already in use :::3000

# ✅ Solución: Cambia de puerto
npm run dev:3001

# Ahora abre en tu navegador:
# http://localhost:3001
```

---

## 🔄 Prevenir el Problema en el Futuro

### Cerrar correctamente el servidor:

En el terminal donde corre Next.js, presiona:
```
Ctrl + C
```

Esto debería parar el servidor y liberar el puerto.

### Si aún así falla:

1. Cierra VS Code completamente
2. Abre VS Code nuevamente
3. Ejecuta `npm run dev` en una nueva terminal

---

## 🆘 Si Ninguna Solución Funciona

Reinicia tu computadora. Esto garantiza que todos los procesos se cierren y los puertos se liberen.

```powershell
# En PowerShell (requiere admin):
Restart-Computer
```

---

## 📌 Resumen Rápido

| Problema | Solución |
|----------|----------|
| Puerto 3000 ocupado | Usa `npm run dev:3001` |
| Servidor no responde | Presiona `Ctrl + C` y reinicia |
| El script falla | Intenta opción 3 (manual) |
| Nada funciona | Reinicia la computadora |

---

## 🚀 Ahora Sí, Sin Problemas

Con estas opciones nunca más necesitarás estar matando procesos. ¡Simplemente cambia de puerto o cierra correctamente el servidor!

