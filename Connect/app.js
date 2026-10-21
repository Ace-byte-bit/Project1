/* =========================================================
   CONNECT — Multi-step signup wizard
   ========================================================= */
(function () {
  'use strict';

  const wizard  = document.getElementById('wizard');
  const steps   = [...wizard.querySelectorAll('.step')];
  const dots    = [...wizard.querySelectorAll('.dot')];
  const TOTAL   = 3;
  const ANIM_MS = 300;

  let current = 1;
  let animating = false;

  function goTo(nextStep) {
    if (animating) return;

    const from = steps.find(s => Number(s.dataset.step) === current);
    const to   = steps.find(s => Number(s.dataset.step) === nextStep);
    if (!from || !to || from === to) return;

    const goingBack = nextStep < current;
    const outClass = goingBack ? 'vanish-back' : 'vanish';
    const inClass  = goingBack ? 'enter-back'  : 'enter';

    animating = true;
    from.classList.add(outClass);

    setTimeout(() => {
      from.hidden = true;
      from.classList.remove(outClass);

      to.hidden = false;
      to.classList.add(inClass);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          to.classList.remove(inClass);
          animating = false;
        });
      });

      const firstInput = to.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 50);

      current = nextStep;
      updateDots();

      if (nextStep === 4) {
        setTimeout(() => {
          showToast('Redirecting to home…');
          setTimeout(() => {
            window.location.href = '../index.html';
          }, 1200);
        }, 400);
      }
    }, ANIM_MS);
  }

  function updateDots() {
    dots.forEach(d => {
      const num = Number(d.dataset.dot);
      d.classList.toggle('active', num === Math.min(current, TOTAL));
      d.classList.toggle('done',   num < current);
    });
  }

  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
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

  const emailInput = document.getElementById('emailInput');
  const emailHint  = document.getElementById('emailHint');
  emailInput.addEventListener('input', () => clearError(emailInput, emailHint));

  document.querySelector('[data-step="1"]').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = emailInput.value.trim();
    if (!v) { setError(emailInput, emailHint, 'Email is required'); shake(emailInput); return; }
    if (!isEmail(v)) { setError(emailInput, emailHint, 'Enter a valid email address'); shake(emailInput); return; }
    clearError(emailInput, emailHint);
    goTo(2);
  });

  const passwordInput = document.getElementById('passwordInput');
  const passwordHint  = document.getElementById('passwordHint');
  passwordInput.addEventListener('input', () => clearError(passwordInput, passwordHint));

  document.querySelector('[data-step="2"]').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = passwordInput.value;
    if (v.length < 6) {
      setError(passwordInput, passwordHint, 'Password must be at least 6 characters');
      shake(passwordInput); return;
    }
    clearError(passwordInput, passwordHint);
    goTo(3);
  });

  const nameInput = document.getElementById('nameInput');
  const nameHint  = document.getElementById('nameHint');
  nameInput.addEventListener('input', () => clearError(nameInput, nameHint));

  document.querySelector('[data-step="3"]').addEventListener('submit', (e) => {
    e.preventDefault();
    const v = nameInput.value.trim();
    if (!v) { setError(nameInput, nameHint, 'Please enter your name'); shake(nameInput); return; }
    clearError(nameInput, nameHint);

    try {
      Auth.login(v, emailInput.value.trim());
    } catch (err) {
      showToast('Could not save your account in this browser.');
      return;
    }

    document.getElementById('successMsg').textContent =
      `Welcome, ${v}! Your account is ready.`;

    showToast(`🎉 Welcome, ${v}!`);
    goTo(4);
  });

  wizard.querySelectorAll('[data-back]').forEach((btn) => {
    btn.addEventListener('click', () => goTo(current - 1));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && current > 1 && current <= 3 && !animating) {
      goTo(current - 1);
    }
  });

  setTimeout(() => emailInput.focus(), 100);

})();