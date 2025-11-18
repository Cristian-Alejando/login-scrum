// js/perception.js (DISEÑO PRO)

const stimulusEl = document.getElementById('stimulus');
const optionsEl = document.getElementById('options');
const startBtn = document.getElementById('btnStart');
const progressBar = document.getElementById('progressBar');

// Usaremos Iconos de FontAwesome para hacerlo visual
const shapes = [
  { icon: '<i class="fas fa-star text-warning"></i>', val: 'star', distractor: '<i class="fas fa-heart text-danger"></i>', dVal: 'heart' },
  { icon: '<i class="fas fa-square text-primary"></i>', val: 'square', distractor: '<i class="fas fa-circle text-success"></i>', dVal: 'circle' },
  { icon: '<i class="fas fa-moon text-secondary"></i>', val: 'moon', distractor: '<i class="fas fa-sun text-warning"></i>', dVal: 'sun' },
  { icon: '<i class="fas fa-heart text-danger"></i>', val: 'heart', distractor: '<i class="fas fa-star text-warning"></i>', dVal: 'star' },
  { icon: '<i class="fas fa-cloud text-info"></i>', val: 'cloud', distractor: '<i class="fas fa-bolt text-warning"></i>', dVal: 'bolt' }
];
const MAX_ROUNDS = shapes.length;
let score = 0;
let round = 0;
let startTime;

startBtn.addEventListener('click', startTest);

function startTest() {
  score = 0;
  round = 0;
  startTime = Date.now();
  optionsEl.innerHTML = '';
  nextRound();
}

function nextRound() {
  const progressPercent = (round / MAX_ROUNDS) * 100;
  progressBar.style.width = `${progressPercent}%`;

  if (round >= MAX_ROUNDS) {
    endTest();
    return;
  }

  const current = shapes[round];
  
  // Mostrar estímulo
  stimulusEl.innerHTML = `
    <p class="text-muted mb-3">Encuentra la pareja:</p>
    <div style="font-size: 6rem;">${current.icon}</div>
  `;
  
  const opts = [current, { icon: current.distractor, val: current.dVal }].sort(() => Math.random() - 0.5);
  
  optionsEl.innerHTML = `
    <button class="btn btn-light btn-option shadow" data-val="${opts[0].val}" style="font-size: 4rem;">${opts[0].icon}</button>
    <button class="btn btn-light btn-option shadow" data-val="${opts[1].val}" style="font-size: 4rem;">${opts[1].icon}</button>
  `;

  optionsEl.querySelectorAll('.btn-option').forEach(btn => {
    btn.onclick = () => {
      if (btn.dataset.val === current.val) score++;
      round++;
      nextRound();
    };
  });
}

async function endTest() {
  progressBar.style.width = `100%`;
  const totalTimeMs = Date.now() - startTime;

  Swal.fire({
    title: '¡Buen ojo!',
    text: `Acertaste ${score} de ${MAX_ROUNDS} figuras.`,
    icon: 'success',
    confirmButtonText: 'Terminar'
  }).then(() => window.location.href = 'dashboard.html');

  try {
    await fetch('/api/tests/save-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ testName: 'Percepción', score, timeTakenMs: totalTimeMs })
    });
  } catch (e) {}
}