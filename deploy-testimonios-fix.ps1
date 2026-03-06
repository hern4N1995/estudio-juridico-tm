# Deploy hotfix para testimonios y noticias
# Uso: .\deploy-testimonios-fix.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "DEPLOY: Hotfix Testimonios v2.2.0" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Paso 1: Verificar que estamos en un repo git
Write-Host "1️⃣  Verificando repositorio Git..." -ForegroundColor Yellow
if (-Not (Test-Path ".git")) {
    Write-Host "❌ Error: No es un repositorio Git" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Git repository encontrado" -ForegroundColor Green

# Paso 2: Ver status
Write-Host ""
Write-Host "2️⃣  Estado de cambios:" -ForegroundColor Yellow
git status

# Paso 3: Agregar cambios
Write-Host ""
Write-Host "3️⃣  Agregando cambios..." -ForegroundColor Yellow
git add .
Write-Host "✅ Cambios agregados" -ForegroundColor Green

# Paso 4: Commit
Write-Host ""
Write-Host "4️⃣  Creando commit..." -ForegroundColor Yellow
$commitMessage = "Fix(v2.2.0): Testimonios y noticias ahora cargan desde API endpoints"
git commit -m "$commitMessage"
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit creado exitosamente" -ForegroundColor Green
} else {
    Write-Host "⚠️  No hay cambios para commitear (esto es normal si ya fue hecho)" -ForegroundColor Yellow
}

# Paso 5: Push
Write-Host ""
Write-Host "5️⃣  Enviando a GitHub..." -ForegroundColor Yellow
git push origin main
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Cambios enviados a GitHub" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 DESPLIEGUE EN PROGRESO" -ForegroundColor Green
    Write-Host "Vercel/Render detectarán el cambio automáticamente" -ForegroundColor Cyan
    Write-Host "Esto tardará 2-5 minutos..." -ForegroundColor Cyan
} else {
    Write-Host "❌ Error al hacer push" -ForegroundColor Red
    exit 1
}

# Paso 6: Información post-deploy
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "✅ TODO LISTO" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Espera 2-5 minutos para que Vercel/Render despliegue" -ForegroundColor Cyan
Write-Host "2. Abre: https://tu-dominio.com/api/debug-firebase" -ForegroundColor Cyan
Write-Host "3. Debería mostrar: { status: 'OK', data: { testimonios: {...}, noticias: {...} } }" -ForegroundColor Cyan
Write-Host "4. Los testimonios y noticias aparecerán en la página" -ForegroundColor Cyan
Write-Host ""
Write-Host "Si hay problemas:" -ForegroundColor Yellow
Write-Host "• Abre la consola del navegador (F12)" -ForegroundColor Cyan
Write-Host "• Lee SOLUCION_TESTIMONIOS_NOTICIAS.md para troubleshooting" -ForegroundColor Cyan
Write-Host ""
