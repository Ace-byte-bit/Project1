/* =========================================================
   BOOKMARK PAGE — logic only (per-user namespacing)
   Shared helpers: ../shared/ui.js
   ========================================================= */

const titleInput      = document.querySelector('#titleInput');
const urlInput        = document.querySelector('#urlInput');
const categorySelect  = document.querySelector('#categorySelect');
const addBtn          = document.querySelector('#addBtn');
const searchInput     = document.querySelector('#searchInput');
const filterBtns      = document.querySelectorAll('.filter-btn');
const bookmarkList    = document.querySelector('#bookmarkList');
const emptyState      = document.querySelector('#emptyState');
const totalCountEl    = document.querySelector('#totalCount');
const showingCountEl  = document.querySelector('#showingCount');
const categoryCountEl = document.querySelector('#categoryCount');

let bookmarks     = loadBookmarks();
let currentFilter = 'all';
let currentSearch = '';

/* ---------- Per-user storage key (matches auth.js Store) ---------- */
function bookmarksKey() {
  const u = (typeof Auth !== 'undefined' && Auth.getUser) ? Auth.getUser() : null;
  const who = u && u.email ? u.email : 'guest';
  return `clconnect_bookmarks_${who}`;
}

function loadBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(bookmarksKey())) || [];
  } catch { return []; }
}

function save() {
  try {
    localStorage.setItem(bookmarksKey(), JSON.stringify(bookmarks));
  } catch (err) {
    console.warn('Could not save bookmarks:', err);
  }
}

/* ---------- URL helpers ---------- */
function normalizeUrl(url) {
  if (!url) return '';
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}
function isValidUrl(url) {
  try { new URL(url); return true; } catch { return false; }
}
function getDomain(url) {
  try { return new URL(url).hostname; } catch { return ''; }
}
function getFavicon(url) {
  const domain = getDomain(url);
  return domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
    : '';
}

/* ---------- Actions ---------- */
function addBookmark() {
  const title = titleInput.value.trim();
  let   url   = urlInput.value.trim();
  const cat   = categorySelect.value;

  if (!title) { shake(titleInput); titleInput.focus(); showToast('Please enter a title'); return; }
  if (!url)   { shake(urlInput);   urlInput.focus();   showToast('Please enter a URL');   return; }

  url = normalizeUrl(url);
  if (!isValidUrl(url)) {
    shake(urlInput); urlInput.focus();
    showToast('Invalid URL — try "youtube.com"');
    return;
  }

  if (bookmarks.some(b => b.url === url)) {
    showToast('That URL is already saved');
    return;
  }

  bookmarks.unshift({ id: Date.now(), title, url, category: cat, addedAt: Date.now() });
  titleInput.value = '';
  urlInput.value = '';
  categorySelect.value = 'other';
  titleInput.focus();

  save(); render();
  showToast('🔖 Bookmark added');
}

function deleteBookmark(id) {
  const bm = bookmarks.find(b => b.id === id);
  if (!bm) return;
  if (!confirm(`Delete "${bm.title}"?`)) return;
  bookmarks = bookmarks.filter(b => b.id !== id);
  save(); render();
  showToast('Bookmark deleted');
}

async function copyUrl(url) {
  try {
    await navigator.clipboard.writeText(url);
    showToast('📋 Copied to clipboard');
  } catch {
    const ta = document.createElement('textarea');
    ta.value = url;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showToast('📋 Copied'); }
    catch { showToast('Could not copy'); }
    document.body.removeChild(ta);
  }
}

function openBookmark(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

/* ---------- Filter ---------- */
function getFilteredBookmarks() {
  let list = bookmarks;
  if (currentFilter !== 'all') {
    list = list.filter(b => b.category === currentFilter);
  }
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.url.toLowerCase().includes(q)
    );
  }
  return list;
}

/* ---------- Render ---------- */
function render() {
  const filtered = getFilteredBookmarks();

  if (bookmarks.length === 0) {
    emptyState.querySelector('.title').textContent = 'No bookmarks yet';
    emptyState.querySelector('.subtitle').textContent = 'Add your first bookmark above!';
    emptyState.hidden = false;
  } else if (filtered.length === 0) {
    emptyState.querySelector('.title').textContent = 'No matches';
    emptyState.querySelector('.subtitle').textContent = 'Try a different search or filter.';
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
  }

  bookmarkList.innerHTML = filtered.map(bm => `
    <li data-cat="${bm.category}">
      <img class="favicon"
           src="${getFavicon(bm.url)}"
           alt=""
           loading="lazy"
           onerror="this.style.visibility='hidden'">
      <div class="bm-info" data-url="${escapeAttr(bm.url)}" tabindex="0" role="link"
           aria-label="Open ${escapeAttr(bm.title)}">
        <p class="bm-title">${escapeHtml(bm.title)}</p>
        <p class="bm-url">${escapeHtml(bm.url)}</p>
      </div>
      <span class="bm-category ${bm.category}">${bm.category}</span>
      <div class="bm-actions">
        <button class="copy-btn"   data-id="${bm.id}">Copy</button>
        <button class="delete-btn" data-id="${bm.id}">Delete</button>
      </div>
    </li>
  `).join('');

  totalCountEl.textContent    = bookmarks.length;
  showingCountEl.textContent  = filtered.length;
  categoryCountEl.textContent = new Set(bookmarks.map(b => b.category)).size;
}

/* ---------- Events ---------- */
addBtn.addEventListener('click', addBookmark);
titleInput.addEventListener('keydown', e => { if (e.key === 'Enter') urlInput.focus(); });
urlInput.addEventListener('keydown', e => { if (e.key === 'Enter') addBookmark(); });

searchInput.addEventListener('input', e => {
  currentSearch = e.target.value.trim();
  render();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.toggle('active', b === btn));
    render();
  });
});

bookmarkList.addEventListener('click', e => {
  const copyBtn = e.target.closest('.copy-btn');
  const delBtn  = e.target.closest('.delete-btn');
  const info    = e.target.closest('.bm-info');

  if (copyBtn) {
    e.stopPropagation();
    const bm = bookmarks.find(b => b.id === Number(copyBtn.dataset.id));
    if (bm) copyUrl(bm.url);
    return;
  }
  if (delBtn) {
    e.stopPropagation();
    deleteBookmark(Number(delBtn.dataset.id));
    return;
  }
  if (info) openBookmark(info.dataset.url);
});

bookmarkList.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const info = e.target.closest('.bm-info');
    if (info) { e.preventDefault(); openBookmark(info.dataset.url); }
  }
});

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
  render();
});