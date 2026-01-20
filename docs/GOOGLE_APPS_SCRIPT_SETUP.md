# 📝 Configuración de Google Apps Script para Formulario de Contacto

Este documento explica cómo configurar el backend en Google Apps Script para recibir los datos del formulario de contacto.

## 🎯 Objetivo

Crear un script que:
- Reciba peticiones POST con JSON desde el frontend
- Almacene los datos en Google Sheets
- Soporte CORS para peticiones cross-origin
- Maneje preflight requests (OPTIONS)

---

## 📋 Paso a Paso

### 1. Crear Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala: **"Contactos Landing 1io0"** (o el nombre que prefieras)
4. Renombra la primera pestaña a: **"ContactForm"**
5. En la primera fila, agrega estos encabezados:
   ```
   | Timestamp | Name | Email | Message |
   ```
6. Copia el ID de la hoja desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit
   ```

### 2. Crear Google Apps Script

1. Desde tu Google Sheet, ve a: **Extensiones → Apps Script**
2. Se abrirá el editor de Google Apps Script
3. Borra el código por defecto
4. Pega el código completo del archivo `google-apps-script.js` (ver abajo)
5. **IMPORTANTE:** Reemplaza el `SPREADSHEET_ID` con el ID que copiaste en el paso 1

### 3. Código de Google Apps Script

```javascript
// ====== CONFIGURACIÓN ======
const SPREADSHEET_ID = "TU_SPREADSHEET_ID_AQUI"; // ⚠️ CAMBIA ESTO
const SHEET_NAME = "ContactForm";

// ====== FUNCIONES INTERNAS ======
function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error(\`No existe la pestaña "\${SHEET_NAME}" en el spreadsheet\`);
  return sheet;
}

function addContactRow_(data) {
  const sheet = getSheet_();
  const row = [
    new Date(),
    data.name || "",
    data.email || "",
    data.message || ""
  ];
  sheet.appendRow(row);
  return row;
}

// ====== MANEJO DE CORS ======
function setCorsHeaders_(output) {
  return output
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
}

// ====== CRITICAL: MANEJO DE PREFLIGHT OPTIONS ======
function doOptions(e) {
  Logger.log("OPTIONS preflight request received");
  const output = ContentService.createTextOutput('');
  return setCorsHeaders_(output);
}

// ====== MANEJO DE GET (opcional para testing) ======
function doGet(e) {
  const output = ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "API is working. Use POST to submit data."
  })).setMimeType(ContentService.MimeType.JSON);
  return setCorsHeaders_(output);
}

// ====== TU WEBHOOK doPost ======
function doPost(e) {
  try {
    Logger.log("doPost hit: " + (e && e.postData ? e.postData.contents : "no body"));
    
    if (!e || !e.postData) {
      const errorOutput = ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "No postData received"
      })).setMimeType(ContentService.MimeType.JSON);
      return setCorsHeaders_(errorOutput);
    }

    const contentType = String(e.postData.type || "").toLowerCase();
    let data = {};

    if (contentType.includes("json")) {
      data = JSON.parse(e.postData.contents || "{}");
    } else {
      data = e.parameter || {};
    }

    Logger.log("Datos recibidos: " + JSON.stringify(data));

    addContactRow_(data);

    const successOutput = ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data added successfully",
      data: data
    })).setMimeType(ContentService.MimeType.JSON);
    
    return setCorsHeaders_(successOutput);

  } catch (error) {
    Logger.log("Error in doPost: " + error + "\\nStack: " + (error.stack || ""));
    const errorOutput = ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: String(error.message || error)
    })).setMimeType(ContentService.MimeType.JSON);
    
    return setCorsHeaders_(errorOutput);
  }
}
```

### 4. Desplegar como Web App

1. Click en **"Implementar"** (Deploy) → **"Nueva implementación"** (New deployment)
2. Click en el ícono de engranaje ⚙️ → Selecciona **"Aplicación web"** (Web app)
3. Configura:
   - **Descripción:** "API de formulario de contacto"
   - **Ejecutar como:** Tu cuenta
   - **Quién tiene acceso:** Cualquier persona (Anyone)
4. Click en **"Implementar"** (Deploy)
5. **Autoriza el script** cuando te lo pida (es necesario darle permisos para escribir en Sheets)
6. Copia la URL que te da (termina en `/exec`)
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```
7. Extrae solo el ID (la parte entre `/s/` y `/exec`)

### 5. Configurar el Frontend

1. Crea/edita el archivo `.env` en la raíz del proyecto:
   ```env
   VITE_GOOGLE_SCRIPT_ID=tu_script_id_aqui
   ```
2. Reinicia el servidor de desarrollo si estaba corriendo

---

## 🧪 Testing

### Test 1: Verificar GET
Abre en el navegador:
```
https://script.google.com/macros/s/TU_SCRIPT_ID/exec
```

Deberías ver:
```json
{"status":"ok","message":"API is working. Use POST to submit data."}
```

### Test 2: Verificar POST desde Postman
```
POST https://script.google.com/macros/s/TU_SCRIPT_ID/exec
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "message": "Test message"
}
```

Deberías recibir:
```json
{
  "status": "success",
  "message": "Data added successfully",
  "data": {
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }
}
```

### Test 3: Verificar desde el Frontend
1. Llena el formulario en tu web
2. Envía el mensaje
3. Abre DevTools (F12) → Console
4. Deberías ver logs como:
   ```
   📤 Enviando datos: {name: "...", email: "...", message: "..."}
   📥 Response status: 200
   ✅ Parsed result: {status: "success", ...}
   ```
5. Verifica que los datos aparezcan en Google Sheets

---

## 🐛 Troubleshooting

### Error: "Access to fetch... has been blocked by CORS policy"

**Causa:** Google Apps Script no tiene implementada la función `doOptions()`

**Solución:**
1. Verifica que tu código tenga la función `doOptions(e)`
2. Despliega una **nueva versión** (no basta con guardar):
   - Implementar → Administrar implementaciones
   - Click en ✏️ (editar)
   - Versión → "Nueva versión"
   - Implementar

### Error: "No existe la pestaña..."

**Causa:** El nombre de la pestaña no coincide con `SHEET_NAME`

**Solución:**
1. Verifica que la pestaña se llame exactamente "ContactForm"
2. O cambia la constante `SHEET_NAME` en el código

### Los datos no se guardan

**Causa:** Puede ser un problema de permisos o de parsing

**Solución:**
1. Ve a **Ver → Registros** (View → Logs) en Apps Script
2. Busca mensajes de error
3. Verifica que el `SPREADSHEET_ID` sea correcto
4. Asegúrate de haber autorizado el script

### Error: "Failed to fetch"

**Causas posibles:**
1. URL incorrecta
2. Script no desplegado correctamente
3. Problemas de red

**Solución:**
1. Verifica que el `VITE_GOOGLE_SCRIPT_ID` en `.env` sea correcto
2. Prueba la URL en el navegador (debería responder)
3. Reinicia el servidor de desarrollo después de cambiar `.env`

---

## 🔄 Actualizar el Script

Si necesitas hacer cambios al código:

1. Edita el código en Apps Script
2. **Guarda** (Ctrl+S o ⌘+S)
3. **Despliega nueva versión:**
   - Implementar → Administrar implementaciones
   - Click en ✏️ junto a tu implementación
   - Versión → "Nueva versión"
   - Descripción del cambio
   - Implementar
4. La URL se mantiene igual, no necesitas actualizar `.env`

---

## 🔒 Seguridad

Para producción, considera:

1. **Validación de datos:** Añadir validación del lado del servidor
2. **Rate limiting:** Limitar el número de peticiones por IP/usuario
3. **Notificaciones:** Enviar email cuando se recibe un mensaje nuevo
4. **Whitelist de dominios:** En lugar de `'*'`, especifica tu dominio en CORS:
   ```javascript
   .setHeader('Access-Control-Allow-Origin', 'https://tu-dominio.com')
   ```

---

## 📚 Referencias

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Web Apps Guide](https://developers.google.com/apps-script/guides/web)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
