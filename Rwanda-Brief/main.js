/* =========================================================
   RWANDA BRIEF — Home page
   ========================================================= */

function buildTrendingChips() {
  const strip = document.getElementById('trendingStrip');
  if (!strip) return;

  const top = ARTICLES
    .filter(a => a.trendRank)
    .sort((a, b) => a.trendRank - b.trendRank)
    .slice(0, 6);

  strip.innerHTML = top.map(a => `
    <a class="trend-chip" href="article.html?id=${a.id}">
      <span class="rank">${a.trendRank}</span>
      ${escapeHtml(a.title.length > 40 ? a.title.slice(0, 40) + '…' : a.title)}
    </a>
  `).join('');
}

function renderHome() {
  const grid = document.getElementById('articlesGrid');
  const featuredWrap = document.getElementById('featuredWrap');
  if (!grid) return;

  const likes = Store.getLikes();
  const saves = Store.getSaves();

  const feat = ARTICLES.find(a => a.featured);
  if (feat && featuredWrap) {
    featuredWrap.innerHTML = `
      <a class="featured" href="article.html?id=${feat.id}">
        <span class="tag">FEATURED · ${escapeHtml(feat.category.toUpperCase())}</span>
        <h3>${escapeHtml(feat.title)}</h3>
        <p>${escapeHtml(feat.excerpt)}</p>
        <div class="meta">
          <span>✍️ ${escapeHtml(feat.author)}</span>
          <span>📅 ${escapeHtml(feat.date)}</span>
        </div>
      </a>
    `;
  }

  const list = ARTICLES.filter(a => !a.featured);
  grid.innerHTML = list.map(a => articleCard(a, likes, saves)).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  buildTicker();           // from shared/ui.js
  buildSidebar();          // from shared/ui.js
  buildTrendingChips();
  renderHome();
  initSearchBox();         // from shared/ui.js
  initGlobalClicks();      // from shared/ui.js
});