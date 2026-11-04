$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$backend = Join-Path $root 'backend'
$frontend = Join-Path $root 'frontend'
$ia = Join-Path $root 'ia'

foreach ($command in @('node', 'npm', 'python')) {
    if (-not (Get-Command $command -ErrorAction SilentlyContinue)) {
        throw "No se encontro '$command'. Instala la herramienta y vuelve a intentar."
    }
}

$env:NODE_ENV = 'development'
$env:PORT = '3000'
$env:DB_HOST = 'localhost'
$env:DB_PORT = '5432'
$env:DB_USER = 'postgres'
$env:DB_PASS = 'NoHayMas'
$env:DB_NAME = 'uarp_ai'
$env:JWT_SECRET = 'local-development-secret'
$env:CORS_ALLOW_ALL = 'true'
$env:CORS_ORIGINS = 'http://localhost:5173'
$env:IA_PANEL_URL = 'http://127.0.0.1:5001/ia-panel'
$env:MIGRATE_MODE = 'sync'
$env:MIGRATE_ALTER = 'false'
$env:SEED_MODE = 'demo'

Write-Host 'Ejecutando migracion local...'
Push-Location $backend
try {
    & node src/migrate.js
    if ($LASTEXITCODE -ne 0) {
        throw 'La migracion local fallo.'
    }
    Write-Host 'Ejecutando seed local...'
    & node src/seed.js
    if ($LASTEXITCODE -ne 0) {
        throw 'El seed local fallo.'
    }
}
finally {
    Pop-Location
}

Write-Host 'Iniciando servicio IA en http://localhost:5001...'
Start-Process powershell.exe -ArgumentList @(
    '-NoExit',
    '-Command',
    'python ia_panel.py'
) -WorkingDirectory $ia

Write-Host 'Iniciando backend en http://localhost:3000...'
Start-Process powershell.exe -ArgumentList @(
    '-NoExit',
    '-Command',
    'npm start'
) -WorkingDirectory $backend

Write-Host 'Iniciando frontend en http://localhost:5173...'
Start-Process powershell.exe -ArgumentList @(
    '-NoExit',
    '-Command',
    'npm run dev -- --host 0.0.0.0 --port 5173'
) -WorkingDirectory $frontend

Write-Host ''
Write-Host 'Servicios iniciados:'
Write-Host '  Frontend: http://localhost:5173'
Write-Host '  Backend:  http://localhost:3000'
Write-Host '  Health:   http://localhost:3000/health'
Write-Host '  IA status: http://localhost:5001'
Write-Host '  IA API:   http://localhost:5001/ia-panel (POST)'
