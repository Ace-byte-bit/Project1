/* =========================================================
   RWANDA BRIEF — Single article page
   ========================================================= */

function loadArticle() {
  const id = getQueryParam('id');
  const container = document.getElementById('readerContent');
  if (!container) return;

  const a = getArticleById(id);
  if (!a) {
    container.innerHTML = `
      <div class="empty">
        <div class="icon">📰</div>
        <h3>Article not found</h3>
        <a href="index.html">← Return home</a>
      </div>`;
    return;
  }

  /* Highlight active tab */
  document.querySelectorAll('.tab').forEach(t => {
    const href = t.getAttribute('href') || '';
    t.classList.toggle('active', href.includes(`cat=${a.category}`));
  });

  const likes = Store.getLikes();
  const saves = Store.getSaves();
  const liked = likes.has(a.id);
  const saved = saves.has(a.id);

  document.title = a.title + ' — The Rwanda Brief';

  container.innerHTML = `
    <a class="tag" href="category.html?cat=${a.category}">${a.category.toUpperCase()}</a>
    <h1>${escapeHtml(a.title)}</h1>
    <div class="reader-meta">
      <span>✍️ ${escapeHtml(a.author)}</span>
      <span>📅 ${escapeHtml(a.date)}</span>
    </div>
    <div class="reader-body">
      ${a.body.split('\n\n').map(p => `<p>${escapeHtml(p)}</p>`).join('')}
    </div>
    <div class="reader-actions">
      <button class="btn btn-primary"
              data-action="like" data-id="${a.id}">
        ${liked ? '❤️ Liked' : '🤍 Like'} (${(a.likes || 0) + (liked ? 1 : 0)})
      </button>
      <button class="btn btn-outline on-light"
              data-action="save" data-id="${a.id}">
        ${saved ? '🔖 Saved' : '📑 Save'}
      </button>
    </div>
  `;
}

/* Article-page version of handlers — re-renders whole reader */
function handleLike(id) {
  const likes = Store.getLikes();
  likes.has(id) ? likes.delete(id) : likes.add(id);
  Store.setLikes(likes);
  loadArticle();
}


function handleSave(id) {
  if (!Auth.isLoggedIn()) {
    showToast('Log in to save articles');
    setTimeout(() => {
      const basePath = getSiteRootPrefix();
      window.location.href = basePath + 'connect/index.html';
    }, 800);
    return;
  }
  

  const saves = Store.getSaves();
  saves.has(id) ? saves.delete(id) : saves.add(id);
  Store.setSaves(saves);
  loadArticle();
}

document.addEventListener('DOMContentLoaded', () => {
  buildTicker();
  loadArticle();
  initSearchBox();
  initGlobalClicks();
});