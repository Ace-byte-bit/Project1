/* =========================================================
   RWANDA BRIEF — Search page
   ========================================================= */

function runSearch() {
  const q = (getQueryParam('q') || '').trim();
  const input = document.getElementById('searchInput');
  const title = document.getElementById('searchTitle');
  const grid = document.getElementById('articlesGrid');

  if (input) input.value = q;

  if (!q) {
    title.textContent = 'Search';
    grid.innerHTML = `
      <div class="empty">
        <div class="icon">🔍</div>
        <h3>Type something to search</h3>
        <p>Try "unemployment", "health", or "climate".</p>
      </div>`;
    return;
  }

  title.textContent = `Results for "${q}"`;
  const results = searchArticles(q);

  if (results.length === 0) {
    grid.innerHTML = `
      <div class="empty">
        <div class="icon">🔍</div>
        <h3>No results found</h3>
        <p>Try a different keyword.</p>
      </div>`;
    return;
  }

  const likes = Store.getLikes();
  const saves = Store.getSaves();
  grid.innerHTML = results.map(a => articleCard(a, likes, saves)).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  buildTicker();
  runSearch();
  initSearchBox();
  initGlobalClicks();
});