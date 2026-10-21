/* =========================================================
   RWANDA TRIVIA — quiz logic
   ========================================================= */
(function () {
  'use strict';

  const QUESTIONS = [
    { q: "What is the capital city of Rwanda?", answers: ["Kigali", "Butare", "Gisenyi", "Ruhengeri"], correct: 0 },
    { q: "In which year did the Genocide against the Tutsi occur?", answers: ["1990", "1992", "1994", "1996"], correct: 2 },
    { q: "What is Rwanda's official language alongside English and French?", answers: ["Swahili", "Kinyarwanda", "Kirundi", "Luganda"], correct: 1 },
    { q: "Which currency is used in Rwanda?", answers: ["Kenyan Shilling", "Rwandan Franc", "Burundian Franc", "Ugandan Shilling"], correct: 1 },
    { q: "What is Rwanda famously known as?", answers: ["Land of a Thousand Hills", "Pearl of Africa", "Heart of Darkness", "Gateway to the East"], correct: 0 }
  ];

  const TOTAL = QUESTIONS.length;

  const startScreen    = document.getElementById('startScreen');
  const questionScreen = document.getElementById('questionScreen');
  const resultScreen   = document.getElementById('resultScreen');

  const startBtn      = document.getElementById('startBtn');
  const retryBtn      = document.getElementById('retryBtn');
  const questionText  = document.getElementById('questionText');
  const answersWrap   = document.getElementById('answersWrap');
  const progressBar   = document.getElementById('progressBar');
  const qNum          = document.getElementById('qNum');
  const qTotal        = document.getElementById('qTotal');
  const scoreNum      = document.getElementById('scoreNum');
  const scoreTotal    = document.getElementById('scoreTotal');
  const resultEmoji   = document.getElementById('resultEmoji');
  const resultTitle   = document.getElementById('resultTitle');
  const resultMessage = document.getElementById('resultMessage');
  const bestScoreStart= document.getElementById('bestScoreStart');

  let current = 0;
  let score = 0;
  let locked = false;

  qTotal.textContent = TOTAL;
  scoreTotal.textContent = TOTAL;

  function getStats() {
    try {
      return JSON.parse(localStorage.getItem('funzone_stats')) || { plays: 0, bestScore: null, streak: 0 };
    } catch { return { plays: 0, bestScore: null, streak: 0 }; }
  }
  function saveStats(stats) {
    try { localStorage.setItem('funzone_stats', JSON.stringify(stats)); } catch {}
  }

  const currentStats = getStats();
  if (bestScoreStart) {
    bestScoreStart.textContent = currentStats.bestScore == null
      ? '—'
      : `${currentStats.bestScore}/${TOTAL}`;
  }

  function showScreen(name) {
    startScreen.hidden    = name !== 'start';
    questionScreen.hidden = name !== 'question';
    resultScreen.hidden   = name !== 'result';
  }

  function renderQuestion() {
    const item = QUESTIONS[current];
    questionText.textContent = item.q;
    qNum.textContent = current + 1;
    progressBar.style.width = `${(current / TOTAL) * 100}%`;
    answersWrap.innerHTML = '';
    item.answers.forEach((text, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'answer-btn';
      btn.textContent = text;
      btn.addEventListener('click', () => pickAnswer(idx, btn));
      answersWrap.appendChild(btn);
    });
    locked = false;
  }

  function pickAnswer(idx, btn) {
    if (locked) return;
    locked = true;
    const item = QUESTIONS[current];
    const buttons = answersWrap.querySelectorAll('.answer-btn');
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === item.correct) b.classList.add('correct');
      if (i === idx && i !== item.correct) b.classList.add('wrong');
    });
    if (idx === item.correct) { score++; showToast('✅ Correct!'); }
    else { showToast('❌ Not quite'); }
    setTimeout(() => {
      current++;
      if (current < TOTAL) renderQuestion();
      else finishQuiz();
    }, 1100);
  }

  function finishQuiz() {
    progressBar.style.width = '100%';
    scoreNum.textContent = score;

    let emoji = '🎉', title = 'Well played!', msg = '';
    if (score === TOTAL)    { emoji = '🏆'; title = 'Perfect score!'; msg = "You really know Rwanda. Impressive!"; }
    else if (score >= 4)    { emoji = '🌟'; title = 'Excellent!'; msg = 'Just one short of perfect. Try again to nail it.'; }
    else if (score >= 3)    { emoji = '👍'; title = 'Nice work!'; msg = 'Solid effort — you know your country well.'; }
    else if (score >= 1)    { emoji = '📚'; title = 'Good try!'; msg = "Some brushing up and you'll ace it next time."; }
    else                    { emoji = '🤔'; title = 'Rough round!'; msg = 'No shame — every Rwandan learns something new.'; }

    resultEmoji.textContent = emoji;
    resultTitle.textContent = title;
    resultMessage.textContent = msg;

    const stats = getStats();
    stats.plays = (stats.plays || 0) + 1;
    if (stats.bestScore == null || score > stats.bestScore) stats.bestScore = score;
    if (score === TOTAL) stats.streak = (stats.streak || 0) + 1;
    else stats.streak = 0;
    saveStats(stats);

    showScreen('result');
  }

  function startQuiz() {
    current = 0; score = 0; locked = false;
    showScreen('question');
    renderQuestion();
  }

  startBtn.addEventListener('click', startQuiz);
  retryBtn.addEventListener('click', startQuiz);

  showScreen('start');

  document.querySelectorAll('.year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

})();