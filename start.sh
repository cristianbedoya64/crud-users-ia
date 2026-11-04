# PowerShell launcher for the local Windows setup.
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$localScript = Join-Path $root 'scripts\start-local.ps1'

if (-not (Test-Path $localScript)) {
    throw "No se encontró el lanzador local: $localScript"
}

Write-Host 'Iniciando UARP-IA en modo local sin Docker...'
& powershell.exe -ExecutionPolicy Bypass -File $localScript
