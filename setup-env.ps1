# Script de configuración de variables de entorno
# Ejecutar: .\setup-env.ps1

Write-Host "🔧 Configuración de Variables de Entorno - 1io0 Landing" -ForegroundColor Cyan
Write-Host ""

# Verificar si .env ya existe
if (Test-Path ".env") {
    Write-Host "⚠️  El archivo .env ya existe." -ForegroundColor Yellow
    $overwrite = Read-Host "¿Deseas sobrescribirlo? (s/N)"
    if ($overwrite -ne "s" -and $overwrite -ne "S") {
        Write-Host "❌ Operación cancelada." -ForegroundColor Red
        exit
    }
}

# Copiar .env.example a .env
Copy-Item ".env.example" ".env"
Write-Host "✅ Archivo .env creado desde .env.example" -ForegroundColor Green
Write-Host ""

# Leer el contenido del .env
Write-Host "📝 Configura las siguientes variables:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. VITE_GOOGLE_SCRIPT_ID" -ForegroundColor White
Write-Host "   - Obtén el ID desde tu Google Apps Script deployment" -ForegroundColor Gray
Write-Host "   - Ejemplo: https://script.google.com/macros/s/YOUR_ID/exec" -ForegroundColor Gray
Write-Host "   - Documentación: docs/GOOGLE_APPS_SCRIPT_SETUP.md" -ForegroundColor Gray
Write-Host ""

$scriptId = Read-Host "Ingresa tu VITE_GOOGLE_SCRIPT_ID (o Enter para configurar después)"

if ($scriptId) {
    # Reemplazar el valor en .env
    $content = Get-Content ".env" -Raw
    $content = $content -replace "VITE_GOOGLE_SCRIPT_ID=your_script_id_here", "VITE_GOOGLE_SCRIPT_ID=$scriptId"
    Set-Content ".env" $content
    Write-Host "✅ VITE_GOOGLE_SCRIPT_ID configurado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Recuerda configurar VITE_GOOGLE_SCRIPT_ID en .env antes de usar el formulario de contacto" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Configuración completada!" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Verifica las variables en .env" -ForegroundColor White
Write-Host "2. Ejecuta: npm install" -ForegroundColor White
Write-Host "3. Ejecuta: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "📚 Lee docs/ENV_BEST_PRACTICES.md para más información" -ForegroundColor Gray
