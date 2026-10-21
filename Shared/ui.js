/* =========================================================
   CL.CONNECT RWANDA — SHARED UI HELPERS
   Used by every page. Nothing page-specific lives here.
   ========================================================= */

/* ---------------------------------------------------------
   1. TOAST NOTIFICATIONS
   --------------------------------------------------------- */
let __toastTimer;
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(__toastTimer);
  __toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ---------------------------------------------------------
   2. HTML ESCAPING (XSS safety for dynamic content)
   --------------------------------------------------------- */
function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/\n/g, ' ');
}

/* ---------------------------------------------------------
   3. SHAKE ANIMATION (invalid input feedback)
   --------------------------------------------------------- */
function shake(el) {
  if (!el || !el.animate) return;
  el.animate([
    { transform: 'translateX(0)'   },
    { transform: 'translateX(-8px)' },
    { transform: 'translateX(8px)'  },
    { transform: 'translateX(-6px)' },
    { transform: 'translateX(6px)'  },
    { transform: 'translateX(0)'    }
  ], { duration: 350 });
}

/* ---------------------------------------------------------
   4. ARTICLE CARD (shared across home / category / search)
   --------------------------------------------------------- */
function cardImageHTML(a) {
  return a.image
    ? `<img src="${escapeAttr(a.image)}" alt="${escapeAttr(a.title)}" loading="lazy">`
    : (a.emoji || '📰');
}

function articleCard(a, likes, saves) {
  const liked = likes && likes.has(a.id);
  const saved = saves && saves.has(a.id);

  return `
    <article class="card">
      <a class="card-link" href="article.html?id=${a.id}">
        <div class="card-img">
          ${cardImageHTML(a)}
          <span class="category-tag">${escapeHtml(a.category.toUpperCase())}</span>
        </div>
        <div class="card-body">
          <h4>${escapeHtml(a.title)}</h4>
          <p>${escapeHtml(a.excerpt)}</p>
        </div>
      </a>
      <div class="card-footer">
        <span>${escapeHtml(a.date)}</span>
        <div class="actions">
          <button class="action-btn ${liked ? 'liked' : ''}"
                  data-action="like" data-id="${a.id}"
                  aria-label="${liked ? 'Unlike' : 'Like'} this article">
            ${liked ? '❤️' : '🤍'} <span>${(a.likes || 0) + (liked ? 1 : 0)}</span>
          </button>
          <button class="action-btn ${saved ? 'saved' : ''}"
                  data-action="save" data-id="${a.id}"
                  aria-label="${saved ? 'Remove from' : 'Save to'} reading list">
            ${saved ? '🔖' : '📑'}
          </button>
        </div>
      </div>
    </article>
  `;
}

/* ---------------------------------------------------------
   5. TICKER (the red LIVE bar)
   --------------------------------------------------------- */
function buildTicker(items) {
  const track = document.getElementById('tickerTrack');
  if (!track) return;
  const list = items || (typeof TICKER_ITEMS !== 'undefined' ? TICKER_ITEMS : []);
  track.innerHTML = [...list, ...list]
    .map(t => `<span>• ${escapeHtml(t)}</span>`)
    .join('');
}

/* ---------------------------------------------------------
   6. SIDEBAR (Rwanda trends + World news)
   --------------------------------------------------------- */
function buildSidebar(opts = {}) {
  const trends = opts.trends || (typeof RWANDA_TRENDS !== 'undefined' ? RWANDA_TRENDS : []);
  const world  = opts.world  || (typeof WORLD_NEWS    !== 'undefined' ? WORLD_NEWS    : []);

  const rt = document.getElementById('rwandaTrends');
  if (rt) {
    rt.innerHTML = trends.map(t => `
      <li data-search="${escapeAttr(t.text)}">
        <span class="trend-num">${t.rank}</span>
        <div class="trend-text">
          <strong>${escapeHtml(t.text)}</strong>
          <small>${escapeHtml(t.meta)}</small>
        </div>
      </li>
    `).join('');
  }

  const wn = document.getElementById('worldNews');
  if (wn) {
    wn.innerHTML = world.map(w => `
      <li data-cat="world">
        <span class="flag">${w.flag}</span>
        <span>${escapeHtml(w.text)}</span>
      </li>
    `).join('');
  }
}

/* ---------------------------------------------------------
   7. SEARCH BOX WIRING
   --------------------------------------------------------- */
function initSearchBox(redirectTo = 'search.html') {
  const input = document.getElementById('searchInput');
  if (!input || input.dataset.wired === 'true') return;
  input.dataset.wired = 'true';

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      window.location.href =
        redirectTo + '?q=' + encodeURIComponent(input.value.trim());
    }
  });
}

/* ---------------------------------------------------------
   8. GLOBAL CLICK DELEGATION
   Handles likes, saves, and sidebar trend clicks on any page.
   --------------------------------------------------------- */
function initGlobalClicks() {
  if (document.body.dataset.clicksWired === 'true') return;
  document.body.dataset.clicksWired = 'true';

  document.addEventListener('click', (e) => {
    /* -- Like / Save buttons -- */
    const actionBtn = e.target.closest('[data-action]');
    if (actionBtn) {
      e.preventDefault();
      const id = Number(actionBtn.dataset.id);
      const action = actionBtn.dataset.action;
      if (action === 'like') handleLike(id, actionBtn);
      if (action === 'save') handleSave(id, actionBtn);
      return;
    }

    /* -- Sidebar list items -- */
    const li = e.target.closest('.trend-list li, .world-list li');
    if (li) {
      if (li.dataset.search) {
        location.href = 'search.html?q=' + encodeURIComponent(li.dataset.search);
      } else if (li.dataset.cat) {
        location.href = 'category.html?cat=' + li.dataset.cat;
      }
    }
  });
}

/* ---------------------------------------------------------
   9. LIKE / SAVE HANDLERS
   --------------------------------------------------------- */
function handleLike(id, btn) {
  if (typeof Store === 'undefined' || typeof getArticleById === 'undefined') return;

  const likes = Store.getLikes();
  const liked = likes.has(id);
  liked ? likes.delete(id) : likes.add(id);
  Store.setLikes(likes);

  btn.classList.toggle('liked', !liked);
  const article = getArticleById(id);
  const count = (article && article.likes ? article.likes : 0) + (!liked ? 1 : 0);
  btn.innerHTML = `${!liked ? '❤️' : '🤍'} <span>${count}</span>`;

  showToast(!liked ? '❤️ Added to likes' : 'Removed from likes');
}

function handleSave(id, btn) {
  if (typeof Auth === 'undefined' || typeof Store === 'undefined') return;

  if (!Auth.isLoggedIn()) {
    showToast('Log in to save articles');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 800);
    return;
  }

  const saves = Store.getSaves();
  const saved = saves.has(id);
  saved ? saves.delete(id) : saves.add(id);
  Store.setSaves(saves);

  btn.classList.toggle('saved', !saved);
  btn.innerHTML = !saved ? '🔖' : '📑';

  showToast(!saved ? '🔖 Saved to your reading list' : 'Removed from saves');
}

/* ---------------------------------------------------------
   10. UTILITY
   --------------------------------------------------------- */
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  } catch { return iso; }
}