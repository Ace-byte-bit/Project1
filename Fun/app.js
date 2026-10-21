/* =========================================================
   FUN ZONE — index page (stats display)
   ========================================================= */
(function () {
  'use strict';

  function loadStats() {
    try {
      return JSON.parse(localStorage.getItem('funzone_stats')) || {
        plays: 0, bestScore: null, streak: 0
      };
    } catch {
      return { plays: 0, bestScore: null, streak: 0 };
    }
  }

  const stats = loadStats();
  const playsEl  = document.getElementById('playsCount');
  const bestEl   = document.getElementById('bestScore');
  const streakEl = document.getElementById('streakCount');

  if (playsEl)  playsEl.textContent  = stats.plays;
  if (bestEl)   bestEl.textContent   = stats.bestScore == null ? '—' : stats.bestScore;
  if (streakEl) streakEl.textContent = stats.streak;

  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

})();