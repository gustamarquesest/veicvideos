(() => {
  const form = document.querySelector('#briefingForm');
  const overlay = document.querySelector('#entryOverlay');
  const identityForm = document.querySelector('#identityForm');
  const identityPanel = document.querySelector('#identityPanel');
  const welcomePanel = document.querySelector('#welcomePanel');
  const identityError = document.querySelector('#identityError');
  const identitySubmit = document.querySelector('#identitySubmit');
  const continueWithoutCapture = document.querySelector('#continueWithoutCapture');
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
  let isCapturingIdentity = false;

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

  function showWelcome() {
    identityPanel.hidden = true;
    welcomePanel.hidden = false;
    welcomePanel.querySelector('button').focus();
  }

  function setIdentityMessage(element, message) {
    element.textContent = message;
    element.hidden = !message;
  }

  async function captureIdentity(name, email, phone) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch('https://formsubmit.co/ajax/comercial@veicvideos.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'Nome completo': name,
          'E-mail de contato': email,
          'WhatsApp': phone,
          '_subject': 'Novos dados capturados | Veic Vídeos',
          '_template': 'table',
          '_replyto': email,
          '_honey': identityForm.querySelector('[name="_honey"]').value,
          '_url': `${window.location.origin}/briefing`
        }),
        signal: controller.signal
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result || (result.success !== true && result.success !== 'true')) throw new Error('FormSubmit did not confirm the capture.');
    } finally {
      window.clearTimeout(timeout);
    }
  }

  identityForm.addEventListener('submit', async event => {
    event.preventDefault();
    const name = contact.name.value.trim();
    const email = contact.email.value.trim();
    const phoneLength = digitsOnly(contact.phone.value).length;
    let message = '';
    if (name.length < 3) message = 'Informe seu nome completo para continuar.';
    else if (!contact.email.checkValidity()) message = 'Informe um e-mail válido.';
    else if (phoneLength < 10 || phoneLength > 11) message = 'Informe um WhatsApp válido com DDD.';
    if (message) {
      setIdentityMessage(identityError, message);
      return;
    }
    if (isCapturingIdentity) return;
    isCapturingIdentity = true;
    identitySubmit.disabled = true;
    identitySubmit.setAttribute('aria-busy', 'true');
    identitySubmit.firstChild.textContent = 'Registrando dados ';
    setIdentityMessage(identityError, '');
    setContactFields();
    try {
      await captureIdentity(name, email, contact.phone.value.trim());
      showWelcome();
    } catch {
      setIdentityMessage(identityError, 'Não foi possível registrar seus dados agora. Tente novamente ou siga para o briefing; ao concluí-lo, seus dados serão enviados junto das respostas.');
      continueWithoutCapture.hidden = false;
    } finally {
      isCapturingIdentity = false;
      identitySubmit.disabled = false;
      identitySubmit.removeAttribute('aria-busy');
      identitySubmit.firstChild.textContent = 'Continuar ';
    }
  });

  continueWithoutCapture.addEventListener('click', () => {
    setContactFields();
    showWelcome();
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
