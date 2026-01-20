#!/bin/bash
# Script de configuración de variables de entorno para Mac/Linux
# Ejecutar: ./setup-env.sh

echo "🔧 Configuración de Variables de Entorno - 1io0 Landing"
echo ""

# Verificar si .env ya existe
if [ -f ".env" ]; then
    echo "⚠️  El archivo .env ya existe."
    read -p "¿Deseas sobrescribirlo? (s/N): " overwrite
    if [ "$overwrite" != "s" ] && [ "$overwrite" != "S" ]; then
        echo "❌ Operación cancelada."
        exit 1
    fi
fi

# Copiar .env.example a .env
cp .env.example .env
echo "✅ Archivo .env creado desde .env.example"
echo ""

# Información sobre las variables
echo "📝 Configura las siguientes variables:"
echo ""
echo "1. VITE_GOOGLE_SCRIPT_ID"
echo "   - Obtén el ID desde tu Google Apps Script deployment"
echo "   - Ejemplo: https://script.google.com/macros/s/YOUR_ID/exec"
echo "   - Documentación: docs/GOOGLE_APPS_SCRIPT_SETUP.md"
echo ""

read -p "Ingresa tu VITE_GOOGLE_SCRIPT_ID (o Enter para configurar después): " scriptId

if [ ! -z "$scriptId" ]; then
    # Reemplazar el valor en .env
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/VITE_GOOGLE_SCRIPT_ID=your_script_id_here/VITE_GOOGLE_SCRIPT_ID=$scriptId/" .env
    else
        # Linux
        sed -i "s/VITE_GOOGLE_SCRIPT_ID=your_script_id_here/VITE_GOOGLE_SCRIPT_ID=$scriptId/" .env
    fi
    echo "✅ VITE_GOOGLE_SCRIPT_ID configurado"
else
    echo "⚠️  Recuerda configurar VITE_GOOGLE_SCRIPT_ID en .env antes de usar el formulario de contacto"
fi

echo ""
echo "🎉 Configuración completada!"
echo ""
echo "Próximos pasos:"
echo "1. Verifica las variables en .env"
echo "2. Ejecuta: npm install"
echo "3. Ejecuta: npm run dev"
echo ""
echo "📚 Lee docs/ENV_BEST_PRACTICES.md para más información"
