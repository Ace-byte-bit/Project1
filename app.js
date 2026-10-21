/* =========================================================
   HOMEPAGE — page-specific JS
   Settings menu handled by shared/settings.js
   ========================================================= */
(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var hasVisited = null;
  try { hasVisited = sessionStorage.getItem('clconnect_visited'); } catch (e) {}
  if (!hasVisited) {
    setTimeout(function () {
      showToast(t('welcome'));
      try { sessionStorage.setItem('clconnect_visited', 'true'); } catch (e) {}
    }, 600);
  }
})();