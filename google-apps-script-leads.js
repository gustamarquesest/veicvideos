// Google Apps Script para receber leads do diagnostico.html e salvar no Google Sheets.
// 1. Crie uma planilha no Google Sheets.
// 2. Copie o ID da URL da planilha e cole abaixo.
// 3. Publique este projeto como Web App com acesso "Anyone".
// 4. Cole a URL do Web App em GOOGLE_SCRIPT_WEB_APP_URL no arquivo diagnostico.js.

const SPREADSHEET_ID = "COLE_AQUI_O_ID_DA_PLANILHA";
const SHEET_NAME = "Leads";

const HEADERS = [
  "Data de envio",
  "Nome",
  "Empresa",
  "WhatsApp",
  "E-mail",
  "Site ou Instagram",
  "Serviços selecionados",
  "Objetivo principal",
  "Ideias ou referências",
  "Prazo",
  "Melhor forma de contato",
  "Página de origem",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "UTM Term",
  "UTM Content",
];

function doPost(event) {
  try {
    const payload = parsePayload(event);
    const sheet = getLeadSheet();
    ensureHeaders(sheet);

    sheet.appendRow([
      payload.submitted_at ? new Date(payload.submitted_at) : new Date(),
      payload.nome || "",
      payload.empresa || "",
      payload.whatsapp || "",
      payload.email || "",
      payload.site_instagram || "",
      normalizeList(payload.selected_services),
      payload.main_goal || "",
      payload.references || "",
      payload.deadline || "",
      payload.contact_preference || "",
      payload.page_location || payload.page_path || "",
      payload.utm_source || "",
      payload.utm_medium || "",
      payload.utm_campaign || "",
      payload.utm_term || "",
      payload.utm_content || "",
    ]);

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error.message || "Erro desconhecido",
    });
  }
}

function doGet() {
  return jsonResponse({
    success: true,
    message: "Web App de leads da Veic Videos ativo.",
  });
}

// O formulário usa fetch com mode: "no-cors" e Content-Type text/plain
// para evitar preflight em site estático no GitHub Pages. Ainda assim,
// este endpoint retorna JSON para testes diretos do Web App.
function doOptions() {
  return jsonResponse({ success: true });
}

function parsePayload(event) {
  if (!event || !event.postData || !event.postData.contents) {
    throw new Error("Nenhum corpo de requisição recebido.");
  }
  return JSON.parse(event.postData.contents);
}

function getLeadSheet() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID === "COLE_AQUI_O_ID_DA_PLANILHA") {
    throw new Error("Configure o SPREADSHEET_ID no Apps Script.");
  }
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    return;
  }

  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const needsUpdate = HEADERS.some((header, index) => currentHeaders[index] !== header);
  if (needsUpdate) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function normalizeList(value) {
  if (Array.isArray(value)) return value.join(", ");
  return value || "";
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
