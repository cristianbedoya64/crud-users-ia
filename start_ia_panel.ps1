# PowerShell script to start the Flask IA panel service
$iaPath = "c:\Proyectos\UARP\ia"
$pythonExe = "python"
$script = "ia_panel.py"

Write-Host "Iniciando servicio IA Panel en $iaPath..."
Push-Location $iaPath
Start-Process $pythonExe -ArgumentList $script
Pop-Location
Write-Host "Servicio IA Panel iniciado en segundo plano."
