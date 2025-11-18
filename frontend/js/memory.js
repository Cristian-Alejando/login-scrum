// js/memory.js (DISEÑO PRO)

const stimulusEl = document.getElementById('stimulus');
const optionsEl = document.getElementById('options');
const startBtn = document.getElementById('btnStart');
const progressBar = document.getElementById('progressBar');

const words = [
  { item: 'LEÓN', distractor: 'TIGRE' },
  { item: 'SOL', distractor: 'LUNA' },
  { item: 'MESA', distractor: 'SILLA' },
  { item: 'AGUA', distractor: 'FUEGO' },
  { item: 'ROJO', distractor: 'AZUL' },
];
const MAX_ROUNDS = words.length;
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

  const current = words[round];
  
  // Fase 1: Memorizar
  stimulusEl.innerHTML = `
    <p class="text-muted fs-5 mb-2">Memoriza esta palabra:</p>
    <h1 class="display-1 fw-bold text-primary">${current.item}</h1>
  `;
  optionsEl.innerHTML = ''; // Ocultar botones

  // Fase 2: Responder (después de 1.5s)
  setTimeout(() => {
    stimulusEl.innerHTML = `<p class="text-muted fs-4">¿Cuál viste?</p>`;
    
    const opts = [current.item, current.distractor].sort(() => Math.random() - 0.5);
    
    optionsEl.innerHTML = `
      <button class="btn btn-light btn-option shadow border" data-item="${opts[0]}">${opts[0]}</button>
      <button class="btn btn-light btn-option shadow border" data-item="${opts[1]}">${opts[1]}</button>
    `;

    optionsEl.querySelectorAll('.btn-option').forEach(btn => {
      btn.onclick = () => {
        if (btn.dataset.item === current.item) score++;
        round++;
        nextRound();
      };
    });
  }, 1500);
}

async function endTest() {
  progressBar.style.width = `100%`;
  const totalTimeMs = Date.now() - startTime;

  Swal.fire({
    title: '¡Excelente!',
    text: `Recordaste ${score} de ${MAX_ROUNDS} palabras.`,
    icon: 'success',
    confirmButtonText: 'Finalizar'
  }).then(() => window.location.href = 'dashboard.html');

  try {
    await fetch('/api/tests/save-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ testName: 'Memoria', score, timeTakenMs: totalTimeMs })
    });
  } catch (e) {}
}