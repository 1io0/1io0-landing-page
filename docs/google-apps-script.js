// ====== CONFIGURACIÓN ======
// ⚠️ IMPORTANTE: Cambia este ID por el de tu Google Sheet
const SPREADSHEET_ID = "TU_SPREADSHEET_ID_AQUI";
const SHEET_NAME = "ContactForm";

// ====== FUNCIONES INTERNAS ======
function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error(`No existe la pestaña "${SHEET_NAME}" en el spreadsheet`);
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

// ====== MANEJO DE GET (opcional para testing) ======
function doGet(e) {
  const output = ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "API is working. Use POST to submit data.",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ====== TU WEBHOOK doPost ======
function doPost(e) {
  try {
    Logger.log("doPost hit: " + (e && e.postData ? e.postData.contents : "no body"));

    if (!e || !e.postData) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "No postData received"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const contentType = String(e.postData.type || "").toLowerCase();
    let data = {};

    if (contentType.includes("json")) {
      data = JSON.parse(e.postData.contents || "{}");
    } else {
      data = e.parameter || {};
    }

    Logger.log("Datos recibidos: " + JSON.stringify(data));

    // Validación básica
    if (!data.name || !data.email || !data.message) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Missing required fields: name, email, or message"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    addContactRow_(data);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data added successfully",
      data: {
        name: data.name,
        email: data.email,
        message: data.message
      }
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error in doPost: " + error + "\nStack: " + (error.stack || ""));
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: String(error.message || error)
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ====== TESTS PARA EJECUTAR DESDE EL EDITOR ======

// Test 1: Agrega una fila directamente
function testAddRowFromEditor() {
  try {
    const inserted = addContactRow_({
      name: "Test Editor",
      email: "test@editor.com",
      message: "Fila agregada desde el editor (sin doPost)."
    });
    Logger.log("✅ Fila insertada: " + JSON.stringify(inserted));
  } catch (error) {
    Logger.log("❌ Error: " + error);
  }
}

// Test 2: Simula un doPost con JSON
function testDoPostJSON() {
  try {
    const e = {
      postData: {
        contents: JSON.stringify({
          name: "Test doPost JSON",
          email: "json@test.com",
          message: "Simulación de doPost con JSON"
        }),
        type: "application/json"
      }
    };
    const response = doPost(e);
    Logger.log("✅ Respuesta doPost: " + response.getContent());
  } catch (error) {
    Logger.log("❌ Error: " + error);
  }
}

// Test 3: Simula un doPost con form data
function testDoPostForm() {
  try {
    const e = {
      postData: {
        contents: "name=Test+Form&email=form%40test.com&message=Test+message",
        type: "application/x-www-form-urlencoded"
      },
      parameter: {
        name: "Test Form",
        email: "form@test.com",
        message: "Simulación de doPost con e.parameter"
      }
    };
    const response = doPost(e);
    Logger.log("✅ Respuesta doPost: " + response.getContent());
  } catch (error) {
    Logger.log("❌ Error: " + error);
  }
}

// Test 4: Verifica la configuración
function testConfiguration() {
  try {
    Logger.log("🔍 Verificando configuración...");
    Logger.log("SPREADSHEET_ID: " + SPREADSHEET_ID);
    Logger.log("SHEET_NAME: " + SHEET_NAME);

    const sheet = getSheet_();
    Logger.log("✅ Sheet encontrado: " + sheet.getName());
    Logger.log("Filas actuales: " + sheet.getLastRow());

    const headers = sheet.getRange(1, 1, 1, 4).getValues()[0];
    Logger.log("Headers: " + JSON.stringify(headers));

  } catch (error) {
    Logger.log("❌ Error en configuración: " + error);
  }
}
