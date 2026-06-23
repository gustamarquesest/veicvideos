const VEIC_WHATSAPP_NUMBER = "5531983335876";
const FORM_NAME = "Diagnóstico Inicial de Projeto";

const form = document.querySelector("#diagnosticLeadForm");
const statusMessage = document.querySelector("#formStatus");
const phoneInput = document.querySelector("#whatsapp");

function onlyDigits(value = "") {
  return String(value).replace(/\D/g, "");
}

function formatBrazilPhone(value = "") {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function getCheckedValues(name) {
  return [...form.querySelectorAll(`input[name="${name}"]:checked`)].map((field) => field.value);
}

function getFieldValue(name) {
  return form.elements[name]?.value.trim() || "";
}

function setFieldError(field, message = "") {
  const group = field.closest(".form-field, .choice-group");
  const error = group?.querySelector(".field-error");
  field.setAttribute("aria-invalid", message ? "true" : "false");
  if (error) error.textContent = message;
}

function setChoiceError(name, message = "") {
  const group = form.querySelector(`[data-choice-group="${name}"]`);
  const error = group?.querySelector(".field-error");
  const inputs = [...form.querySelectorAll(`input[name="${name}"]`)];
  inputs.forEach((field) => field.setAttribute("aria-invalid", message ? "true" : "false"));
  if (error) error.textContent = message;
}

function validateForm() {
  const requiredFields = [
    ["nome", "Informe seu nome."],
    ["empresa", "Informe o nome da empresa."],
    ["whatsapp", "Informe um WhatsApp válido."],
  ];
  let firstInvalid = null;

  requiredFields.forEach(([name, message]) => {
    const field = form.elements[name];
    const value = getFieldValue(name);
    const isPhone = name === "whatsapp";
    const valid = isPhone ? onlyDigits(value).length >= 10 : Boolean(value);
    setFieldError(field, valid ? "" : message);
    if (!valid && !firstInvalid) firstInvalid = field;
  });

  const emailField = form.elements.email;
  const email = getFieldValue("email");
  const emailValid = !email || emailField.checkValidity();
  setFieldError(emailField, emailValid ? "" : "Confira o e-mail informado.");
  if (!emailValid && !firstInvalid) firstInvalid = emailField;

  const selectedServices = getCheckedValues("services");
  const mainGoal = getFieldValue("goal");
  const deadline = getFieldValue("deadline");
  const contactPreference = getFieldValue("contactPreference");

  setChoiceError("services", selectedServices.length ? "" : "Escolha pelo menos uma opção.");
  setChoiceError("goal", mainGoal ? "" : "Escolha o principal objetivo.");
  setChoiceError("deadline", deadline ? "" : "Escolha um prazo.");
  setChoiceError("contactPreference", contactPreference ? "" : "Escolha a melhor forma de contato.");

  if (!selectedServices.length && !firstInvalid) firstInvalid = form.querySelector('input[name="services"]');
  if (!mainGoal && !firstInvalid) firstInvalid = form.querySelector('input[name="goal"]');
  if (!deadline && !firstInvalid) firstInvalid = form.querySelector('input[name="deadline"]');
  if (!contactPreference && !firstInvalid) firstInvalid = form.querySelector('input[name="contactPreference"]');

  return { valid: !firstInvalid, firstInvalid, selectedServices, mainGoal, deadline, contactPreference };
}

function buildMessage(data) {
  const lines = [
    "Olá, Veic Vídeos! Preenchi o Diagnóstico Inicial de Projeto.",
    "",
    `Nome: ${data.nome}`,
    `Empresa: ${data.empresa}`,
    `WhatsApp: ${data.whatsapp}`,
    `E-mail: ${data.email || "Não informado"}`,
    `Site/Instagram: ${data.siteInstagram || "Não informado"}`,
    "",
    `O que procuro: ${data.selectedServices.join(", ")}`,
    `Objetivo principal: ${data.mainGoal}`,
    `Ideias ou referências: ${data.references || "Não informado"}`,
    `Prazo: ${data.deadline}`,
    `Melhor forma de contato: ${data.contactPreference}`,
  ];
  return lines.join("\n");
}

function pushLeadEvents(data) {
  window.dataLayer = window.dataLayer || [];
  const payload = {
    form_name: FORM_NAME,
    lead_source: "site",
    page_path: window.location.pathname || "/diagnostico.html",
    selected_services: data.selectedServices,
    main_goal: data.mainGoal,
  };
  window.dataLayer.push({ event: "lead_form_diagnostico", ...payload });
  window.dataLayer.push({ event: "lead_form", ...payload });
}

phoneInput?.addEventListener("input", () => {
  phoneInput.value = formatBrazilPhone(phoneInput.value);
  setFieldError(phoneInput, "");
});

form?.addEventListener("input", (event) => {
  const target = event.target;
  if (target.matches("input, textarea")) {
    target.setAttribute("aria-invalid", "false");
    const group = target.closest(".form-field, .choice-group");
    const error = group?.querySelector(".field-error");
    if (error) error.textContent = "";
  }
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const validation = validateForm();

  if (!validation.valid) {
    statusMessage.textContent = "Quase lá. Revise os campos destacados para enviar.";
    validation.firstInvalid?.focus();
    return;
  }

  const data = {
    nome: getFieldValue("nome"),
    empresa: getFieldValue("empresa"),
    whatsapp: getFieldValue("whatsapp"),
    email: getFieldValue("email"),
    siteInstagram: getFieldValue("siteInstagram"),
    references: getFieldValue("references"),
    selectedServices: validation.selectedServices,
    mainGoal: validation.mainGoal,
    deadline: validation.deadline,
    contactPreference: validation.contactPreference,
  };

  pushLeadEvents(data);
  const message = encodeURIComponent(buildMessage(data));
  const url = `https://wa.me/${VEIC_WHATSAPP_NUMBER}?text=${message}`;
  statusMessage.textContent = "Tudo certo. Abrindo WhatsApp com seu diagnóstico preenchido.";
  window.open(url, "_blank", "noopener");
});
