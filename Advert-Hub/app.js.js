/* =========================================================
   ADVERT HUB — inquiry form + plan preselection
   ========================================================= */
(function () {
  'use strict';

  document.querySelectorAll('.btn-plan').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.dataset.plan;
      const select = document.getElementById('plan');
      if (select && plan) select.value = plan;
      document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => document.getElementById('business')?.focus(), 400);
    });
  });

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

  const form = document.getElementById('inquiryForm');
  if (!form) return;

  const businessEl = document.getElementById('business');
  const nameEl     = document.getElementById('contactName');
  const emailEl    = document.getElementById('contactEmail');
  const planEl     = document.getElementById('plan');
  const messageEl  = document.getElementById('adMessage');

  const businessHint = document.getElementById('businessHint');
  const nameHint     = document.getElementById('contactNameHint');
  const emailHint    = document.getElementById('contactEmailHint');
  const planHint     = document.getElementById('planHint');
  const messageHint  = document.getElementById('adMessageHint');

  businessEl.addEventListener('input', () => clearError(businessEl, businessHint));
  nameEl.addEventListener('input',     () => clearError(nameEl, nameHint));
  emailEl.addEventListener('input',    () => clearError(emailEl, emailHint));
  planEl.addEventListener('change',    () => clearError(planEl, planHint));
  messageEl.addEventListener('input',  () => clearError(messageEl, messageHint));

  const submitBtn = form.querySelector('button[type="submit"]');
  let submitting = false;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (submitting) return;

    const business = businessEl.value.trim();
    const name     = nameEl.value.trim();
    const email    = emailEl.value.trim();
    const plan     = planEl.value;
    const message  = messageEl.value.trim();

    let ok = true;

    if (!business) { setError(businessEl, businessHint, 'Business name is required'); shake(businessEl); ok = false; }
    if (!name)     { setError(nameEl, nameHint, 'Your name is required'); shake(nameEl); ok = false; }
    if (!email || !isEmail(email)) {
      setError(emailEl, emailHint, email ? 'Enter a valid email' : 'Email is required');
      shake(emailEl); ok = false;
    }
    if (!plan) { setError(planEl, planHint, 'Choose a plan'); shake(planEl); ok = false; }
    if (message.length < 20) {
      setError(messageEl, messageHint, 'Please describe your business (20+ characters)');
      shake(messageEl); ok = false;
    }

    if (!ok) return;

    submitting = true;
    if (submitBtn) submitBtn.disabled = true;

    const subject = `Ad Inquiry — ${business} (${plan})`;
    const body = encodeURIComponent(
      `Business: ${business}\nContact: ${name}\nEmail: ${email}\nPlan: ${plan}\n\n${message}`
    );
    const mailto = `mailto:ads@isokodigital.rw?subject=${encodeURIComponent(subject)}&body=${body}`;

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