/* =========================================================
   CONTACT PAGE — form validation + submission
   ========================================================= */
(function () {
  'use strict';

  const form = document.getElementById('contactForm');
  if (!form) return;

  function setError(input, hintEl, msg) {
    input.classList.add('invalid');
    hintEl.textContent = msg;
    hintEl.classList.add('error');
  }
  function clearError(input, hintEl) {
    input.classList.remove('invalid');
    hintEl.textContent = '';
    hintEl.classList.remove('error');
  }
  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameHint    = document.getElementById('nameHint');
  const emailHint   = document.getElementById('emailHint');
  const subjectHint = document.getElementById('subjectHint');
  const messageHint = document.getElementById('messageHint');

  nameInput.addEventListener('input',    () => clearError(nameInput,    nameHint));
  emailInput.addEventListener('input',   () => clearError(emailInput,   emailHint));
  subjectInput.addEventListener('change',() => clearError(subjectInput, subjectHint));
  messageInput.addEventListener('input', () => clearError(messageInput, messageHint));

  const submitBtn = form.querySelector('button[type="submit"]');
  let submitting = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitting) return;

    const name    = nameInput.value.trim();
    const email   = emailInput.value.trim();
    const subject = subjectInput.value;
    const message = messageInput.value.trim();

    let ok = true;

    if (!name) { setError(nameInput, nameHint, 'Please enter your name'); shake(nameInput); ok = false; }
    if (!email || !isEmail(email)) {
      setError(emailInput, emailHint, email ? 'Enter a valid email' : 'Email is required');
      shake(emailInput); ok = false;
    }
    if (!subject) { setError(subjectInput, subjectHint, 'Please choose a subject'); shake(subjectInput); ok = false; }
    if (message.length < 10) {
      setError(messageInput, messageHint, 'Message must be at least 10 characters');
      shake(messageInput); ok = false;
    }

    if (!ok) return;

    submitting = true;
    if (submitBtn) submitBtn.disabled = true;

    const mailtoBody = encodeURIComponent(
      `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`
    );
    const mailto = `mailto:hello@isokodigital.rw?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

    showToast('📧 Opening your email app…');
    setTimeout(() => {
      window.location.href = mailto;
      setTimeout(() => {
        submitting = false;
        if (submitBtn) submitBtn.disabled = false;
      }, 2000);
    }, 600);
  });

})();