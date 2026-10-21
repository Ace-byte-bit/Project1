/* =========================================================
   CL.CONNECT RWANDA — SHARED AUTH
   User session, likes, saves. Used on every page.
   ========================================================= */

const Auth = {
  STORAGE_KEY: 'clconnect_user',

  getUser() {
    try {
      const s = localStorage.getItem(this.STORAGE_KEY);
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  },

  login(name, email) {
    const user = {
      name:  name  || (email ? email.split('@')[0] : 'Guest'),
      email: email || '',
      loggedInAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    } catch (err) {
      console.warn('Could not save session:', err);
    }
    return user;
  },

  logout() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (err) {
      console.warn('Could not clear session:', err);
    }
  },

  isLoggedIn() {
    return !!this.getUser();
  },

  /* Optional: keep backward compatibility */
  isAdmin() {
    const u = this.getUser();
    return u && u.role === 'admin';
  }
};

/* =========================================================
   STORE — likes & saves, per-user (or guest)
   ========================================================= */
const Store = {
  PREFIX: 'clconnect',

  key(suffix) {
    const u = Auth.getUser();
    const who = u && u.email ? u.email : 'guest';
    return `${this.PREFIX}_${suffix}_${who}`;
  },

  /* ---- Likes ---- */
  getLikes() {
    return this._readSet('likes');
  },
  setLikes(set) {
    this._writeSet('likes', set);
  },

  /* ---- Saves ---- */
  getSaves() {
    return this._readSet('saves');
  },
  setSaves(set) {
    this._writeSet('saves', set);
  },

  /* ---- Private ---- */
  _readSet(name) {
    try {
      const raw = localStorage.getItem(this.key(name));
      return new Set(JSON.parse(raw || '[]'));
    } catch {
      return new Set();
    }
  },
  _writeSet(name, set) {
    try {
      localStorage.setItem(this.key(name), JSON.stringify([...set]));
    } catch (err) {
      console.warn('Could not write to localStorage:', err);
    }
  }
};

/* Figures out how many "../" to prefix based on script path.
   Works whether the page is at root or one level deep. */
/* =========================================================
   HEADER AUTH AREA
   Shows the current user IF logged in.
   Shows nothing (or falls back to a slot) if not.
   ========================================================= */
function renderAuthArea() {
  const area = document.getElementById('authArea');
  if (!area) return;

  const user = Auth.getUser();

  if (user) {
    const initial = (user.name || '?').charAt(0).toUpperCase();
    area.innerHTML = `
      <div class="user-badge">
        <div class="avatar">${initial}</div>
        <span>${escapeHtml(user.name)}</span>
      </div>
    `;
  } else {
    /* Logged out → show section label only */
    area.innerHTML = '';
  }
}
   function getSiteRootPrefix() {
  /* The current script is loaded as either:
       "shared/auth.js"  → page is at root
       "../shared/auth.js" → page is one level deep  */
  const scripts = document.querySelectorAll('script[src*="shared/auth.js"]');
  if (!scripts.length) return '';

  const src = scripts[scripts.length - 1].getAttribute('src') || '';
  const upCount = (src.match(/\.\.\//g) || []).length;
  return '../'.repeat(upCount);
}

/* =========================================================
   LOGIN / SIGNUP FORM HELPERS
   These expect specific input IDs. Use them if you want.
   ========================================================= */
function wireLoginForm(formId = 'loginForm') {
  const form = document.getElementById(formId);
  if (!form || form.dataset.wired === 'true') return;
  form.dataset.wired = 'true';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailEl = form.querySelector('input[type="email"]');
    const email = emailEl ? emailEl.value.trim() : '';

    if (!email) {
      if (typeof showToast === 'function') showToast('Please enter your email');
      return;
    }

    const name = email.split('@')[0];
    Auth.login(name, email);

    if (typeof showToast === 'function') showToast(`👋 Welcome back, ${name}!`);
    setTimeout(() => { window.location.href = 'index.html'; }, 700);
  });
}

function wireSignupForm(formId = 'signupForm') {
  const form = document.getElementById(formId);
  if (!form || form.dataset.wired === 'true') return;
  form.dataset.wired = 'true';

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameEl  = form.querySelector('input[type="text"]');
    const emailEl = form.querySelector('input[type="email"]');

    const name  = nameEl  ? nameEl.value.trim()  : '';
    const email = emailEl ? emailEl.value.trim() : '';

    if (!name || !email) {
      if (typeof showToast === 'function') showToast('Please fill in all fields');
      return;
    }

    Auth.login(name, email);
    if (typeof showToast === 'function') showToast(`🎉 Welcome, ${name}!`);
    setTimeout(() => { window.location.href = 'index.html'; }, 700);
  });
}

/* =========================================================
   AUTO-INIT (runs on every page)
   Wires the auth area as soon as the DOM is ready.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderAuthArea();
});