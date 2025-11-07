// js/perception.js

// Referencias a elementos (Igual que stroop.js)
const stimulusEl = document.getElementById('stimulus');
const optionsEl = document.getElementById('options');
const startBtn = document.getElementById('btnStart');
const gameScreen = document.querySelector('.game-screen');
const resultsScreen = document.getElementById('results');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

let score = 0;
let round = 0;
const MAX_ROUNDS = 5;
let startTime;

// Pares de prueba
const shapes = [
  { item: 'Círculo', distractor: 'Cuadrado' },
  { item: 'Triángulo', distractor: 'Estrella' },
  { item: 'Cuadrado', distractor: 'Círculo' },
  { item: 'Estrella', distractor: 'Triángulo' },
  { item: 'Luna', distractor: 'Sol' },
];

startBtn.addEventListener('click', startTest);

function startTest() {
  score = 0;
  round = 0;
  startTime = Date.now();
  startBtn.style.display = 'none';
  nextRound();
}

function nextRound() {
  if (round >= MAX_ROUNDS) {
    endTest();
    return;
  }

  const currentShape = shapes[round];
  
  // --- LÓGICA DEL TEST DE PERCEPCIÓN ---
  // 1. Mostrar estímulo (la forma a emparejar)
  stimulusEl.innerHTML = `<p style="font-size: 1.5rem;">Empareja la forma:</p><h2 style="font-size: 3rem;">${currentShape.item}</h2>`;
  
  // 2. Mezclar y mostrar opciones
  const options = [currentShape.item, currentShape.distractor].sort(() => Math.random() - 0.5);
  
  optionsEl.innerHTML = `
    <button class="btn-option" data-item="${options[0]}">${options[0]}</button>
    <button class="btn-option" data-item="${options[1]}">${options[1]}</button>
  `;

  optionsEl.querySelectorAll('.btn-option').forEach(btn => {
    btn.onclick = () => {
      if (btn.dataset.item === currentShape.item) { // Respuesta correcta
        score++;
      }
      round++; // Avanzar de ronda
      nextRound();
    };
  });
}

async function endTest() {
  const endTime = Date.now();
  const totalTimeMs = endTime - startTime;
  const totalTimeSec = (totalTimeMs / 1000).toFixed(2);

  // Mostrar resultados en la UI (Igual que stroop.js)
  gameScreen.style.display = 'none';
  resultsScreen.style.display = 'block';
  scoreEl.textContent = `${score} / ${MAX_ROUNDS}`;
  timeEl.textContent = totalTimeSec;

  // Enviar resultados al backend (¡CAMBIO CLAVE!)
  try {
    const res = await fetch('/api/tests/save-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        testName: 'Percepción', // <-- ¡CAMBIO AQUÍ!
        score: score,
        timeTakenMs: totalTimeMs
      })
    });
    const data = await res.json();
    console.log(data.message || data.error);
    
  } catch (err) {
    console.error('Error al guardar el resultado:', err);
  }
}