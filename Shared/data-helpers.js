/* =========================================================
   CL.CONNECT RWANDA — SHARED DATA HELPERS
   These functions read from the ARTICLES array (defined in
   data.js) and provide the utilities every page needs.
   ========================================================= */

/* ---------------------------------------------------------
   GET ONE ARTICLE BY ID
   --------------------------------------------------------- */
function getArticleById(id) {
  if (typeof ARTICLES === 'undefined') return null;
  return ARTICLES.find(a => a.id === Number(id)) || null;
}

/* ---------------------------------------------------------
   GET ARTICLES BY CATEGORY
   - 'all' → every article
   - 'rwanda' → articles with category = 'rwanda' OR a special
     "Rwanda" flag. Falls back to searching the title for "Rwanda".
   --------------------------------------------------------- */
function getArticlesByCategory(cat) {
  if (typeof ARTICLES === 'undefined') return [];
  if (!cat || cat === 'all') return ARTICLES;

  const key = cat.toLowerCase();

  return ARTICLES.filter(a => {
    if (a.category && a.category.toLowerCase() === key) return true;
    // Special-case: "rwanda" tab also matches any article mentioning Rwanda
    if (key === 'rwanda' && /rwanda/i.test(a.title + ' ' + (a.excerpt || ''))) return true;
    return false;
  });
}

/* ---------------------------------------------------------
   SEARCH ARTICLES
   Simple case-insensitive substring search across title,
   excerpt, body, category and author.
   --------------------------------------------------------- */
function searchArticles(query) {
  if (typeof ARTICLES === 'undefined') return [];
  const q = String(query || '').trim().toLowerCase();
  if (!q) return [];

  return ARTICLES.filter(a => {
    const haystack = [
      a.title, a.excerpt, a.body, a.category, a.author
    ].join(' ').toLowerCase();
    return haystack.includes(q);
  });
}

/* ---------------------------------------------------------
   SORT HELPERS (optional, handy for future use)
   --------------------------------------------------------- */
function getFeaturedArticle() {
  if (typeof ARTICLES === 'undefined') return null;
  return ARTICLES.find(a => a.featured) || null;
}

function getTrendingArticles(limit = 6) {
  if (typeof ARTICLES === 'undefined') return [];
  return [...ARTICLES]
    .filter(a => a.trendRank)
    .sort((a, b) => a.trendRank - b.trendRank)
    .slice(0, limit);
}