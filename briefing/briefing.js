(() => {
  const form = document.querySelector('#briefingForm');
  const overlay = document.querySelector('#entryOverlay');
  const identityForm = document.querySelector('#identityForm');
  const identityPanel = document.querySelector('#identityPanel');
  const welcomePanel = document.querySelector('#welcomePanel');
  const identityError = document.querySelector('#identityError');
  const steps = [...document.querySelectorAll('.form-step')];
  const progress = [...document.querySelectorAll('[data-progress]')];
  const reviewPanel = document.querySelector('#reviewPanel');
  const reviewContent = document.querySelector('#reviewContent');
  const reviewButton = document.querySelector('#reviewButton');
  const contact = {
    name: document.querySelector('#contactName'),
    email: document.querySelector('#contactEmail'),
    phone: document.querySelector('#contactPhone')
  };
  const finalContact = {
    name: document.querySelector('#finalContactName'),
    email: document.querySelector('#finalContactEmail'),
    phone: document.querySelector('#finalContactPhone'),
    replyTo: document.querySelector('#replyTo')
  };
  let activeStep = 1;

  const digitsOnly = value => value.replace(/\D/g, '').slice(0, 11);
  const formatPhone = value => {
    const digits = digitsOnly(value);
    if (digits.length <= 2) return digits ? `(${digits}` : '';
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  contact.phone.addEventListener('input', event => {
    event.target.value = formatPhone(event.target.value);
  });

  function setContactFields() {
    finalContact.name.value = contact.name.value.trim();
    finalContact.email.value = contact.email.value.trim();
    finalContact.phone.value = contact.phone.value.trim();
    finalContact.replyTo.value = contact.email.value.trim();
  }

  identityForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = contact.name.value.trim();
    const email = contact.email.value.trim();
    const phoneLength = digitsOnly(contact.phone.value).length;
    let message = '';
    if (name.length < 3) message = 'Informe seu nome completo para continuar.';
    else if (!contact.email.checkValidity()) message = 'Informe um e-mail válido.';
    else if (phoneLength < 10 || phoneLength > 11) message = 'Informe um WhatsApp válido com DDD.';
    if (message) {
      identityError.textContent = message;
      identityError.hidden = false;
      return;
    }
    identityError.hidden = true;
    setContactFields();
    identityPanel.hidden = true;
    welcomePanel.hidden = false;
    welcomePanel.querySelector('button').focus();
  });

  document.querySelector('#startBriefing').addEventListener('click', () => {
    overlay.hidden = true;
    document.querySelector('#clientName').focus();
  });

  function showStep(number) {
    activeStep = number;
    steps.forEach(step => {
      const active = Number(step.dataset.step) === number;
      step.hidden = !active;
      step.classList.toggle('is-active', active);
    });
    progress.forEach(item => item.classList.toggle('is-active', Number(item.dataset.progress) === number));
    reviewPanel.hidden = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function validateStep(number) {
    const step = steps.find(item => Number(item.dataset.step) === number);
    const controls = [...step.querySelectorAll('input, textarea')]
      .filter(control => !control.disabled && control.type !== 'hidden' && control.type !== 'radio');
    for (const control of controls) {
      if (!control.checkValidity()) {
        control.reportValidity();
        return false;
      }
    }
    const groups = new Map();
    step.querySelectorAll('input[type="radio"][required]').forEach(radio => groups.set(radio.name, radio));
    for (const radio of groups.values()) {
      if (!radio.checkValidity()) {
        radio.reportValidity();
        return false;
      }
    }
    return true;
  }

  document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => {
    if (!validateStep(activeStep)) return;
    showStep(activeStep + 1);
  }));
  document.querySelectorAll('[data-prev]').forEach(button => button.addEventListener('click', () => showStep(activeStep - 1)));

  document.querySelectorAll('.other-option, .visual-other').forEach(option => {
    const radio = option.querySelector('input[type="radio"]');
    const input = option.querySelector('.other-input');
    const sync = () => {
      const selected = radio.checked;
      input.disabled = !selected;
      input.required = selected;
      if (!selected) input.value = '';
    };
    form.querySelectorAll(`input[name="${CSS.escape(radio.name)}"]`).forEach(item => item.addEventListener('change', sync));
    sync();
  });

  function createReview() {
    setContactFields();
    const excluded = new Set(['_subject', '_template', '_replyto', '_honey']);
    const entries = [...new FormData(form).entries()].filter(([key, value]) => !excluded.has(key) && value.trim());
    reviewContent.replaceChildren();
    entries.forEach(([label, value]) => {
      const item = document.createElement('div');
      item.className = 'review-item';
      const heading = document.createElement('strong');
      heading.textContent = label;
      const answer = document.createElement('p');
      answer.textContent = value;
      item.append(heading, answer);
      reviewContent.append(item);
    });
  }

  reviewButton.addEventListener('click', () => {
    if (!validateStep(3)) return;
    createReview();
    reviewPanel.hidden = false;
    reviewPanel.focus();
    reviewPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  ['#editReview', '#backFromReview'].forEach(selector => document.querySelector(selector).addEventListener('click', () => {
    reviewPanel.hidden = true;
    reviewButton.focus();
  }));

  form.addEventListener('submit', event => {
    setContactFields();
    if (!reviewPanel.hidden || !form.checkValidity()) {
      if (form.checkValidity()) return;
      event.preventDefault();
      for (const number of [1, 2, 3]) {
        if (!validateStep(number)) {
          showStep(number);
          break;
        }
      }
    }
  });
})();
