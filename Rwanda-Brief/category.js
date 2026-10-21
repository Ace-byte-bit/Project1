/* =========================================================
   RWANDA BRIEF — Category page
   ========================================================= */

function renderCategory() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat') || 'all';
  const grid = document.getElementById('articlesGrid');
  const title = document.getElementById('categoryTitle');

  title.textContent = cat === 'all'
    ? 'All News'
    : cat.charAt(0).toUpperCase() + cat.slice(1) + ' News';

  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === cat);
  });

  const list = getArticlesByCategory(cat);
  const likes = Store.getLikes();
  const saves = Store.getSaves();

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty">
        <div class="icon">📰</div>
        <h3>No articles in this category yet</h3>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(a => articleCard(a, likes, saves)).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  buildTicker();
  buildSidebar();
  renderCategory();
  initSearchBox();
  initGlobalClicks();
});