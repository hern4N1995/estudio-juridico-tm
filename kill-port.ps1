# Script para matar procesos en puerto específico y reiniciar dev
param(
    [int]$Port = 3000
)

Write-Host "🔍 Buscando procesos en puerto $Port..." -ForegroundColor Cyan

# Buscar procesos que usan el puerto
$processes = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue

if ($processes) {
    Write-Host "❌ Encontrados procesos en puerto $Port" -ForegroundColor Red
    $processes | ForEach-Object {
        $pid = $_.OwningProcess
        $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($process) {
            Write-Host "   Matando: $($process.Name) (PID: $pid)" -ForegroundColor Yellow
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
    }
    Write-Host "✅ Procesos terminados" -ForegroundColor Green
} else {
    Write-Host "✅ Puerto $Port está disponible" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Iniciando servidor de desarrollo..." -ForegroundColor Cyan
npm run dev

