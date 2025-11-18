// js/stroop.js (DISEÑO PRO)

const stimulusEl = document.getElementById('stimulus');
const optionsEl = document.getElementById('options');
const startBtn = document.getElementById('btnStart');
const progressBar = document.getElementById('progressBar');

const questions = [
  { word: 'ROJO', color: 'blue', answer: 'blue' },
  { word: 'AZUL', color: 'red', answer: 'red' },
  { word: 'VERDE', color: 'orange', answer: 'orange' }, // Añadí variedad
  { word: 'AMARILLO', color: 'green', answer: 'green' },
  { word: 'ROJO', color: 'blue', answer: 'blue' }
];
const MAX_ROUNDS = questions.length;

let score = 0;
let round = 0;
let startTime;

startBtn.addEventListener('click', startTest);

function startTest() {
  score = 0;
  round = 0;
  startTime = Date.now();
  // Ocultar botón de inicio y preparar layout de botones
  optionsEl.innerHTML = ''; 
  nextRound();
}

function nextRound() {
  // Actualizar Barra de Progreso
  const progressPercent = (round / MAX_ROUNDS) * 100;
  progressBar.style.width = `${progressPercent}%`;

  if (round >= MAX_ROUNDS) {
    endTest();
    return;
  }

  const q = questions[round];

  // Mostrar estímulo
  stimulusEl.innerHTML = `<span style="color: ${q.color}; font-size: 5rem; font-weight: 900;">${q.word}</span>`;
  
  // Mostrar botones (usando colores de Bootstrap o CSS custom)
  // Mapeo de colores a nombres en español para los botones
  const colorMap = { 'red': 'Rojo', 'blue': 'Azul', 'green': 'Verde', 'orange': 'Naranja' };

  optionsEl.innerHTML = `
    <button class="btn btn-danger btn-option btn-lg shadow" data-color="red">ROJO</button>
    <button class="btn btn-primary btn-option btn-lg shadow" data-color="blue">AZUL</button>
    <button class="btn btn-success btn-option btn-lg shadow" data-color="green">VERDE</button>
    <button class="btn btn-warning text-white btn-option btn-lg shadow" data-color="orange">NARANJA</button>
  `;

  // Ajustar el grid a 2x2
  optionsEl.style.gridTemplateColumns = "1fr 1fr";

  optionsEl.querySelectorAll('.btn-option').forEach(btn => {
    btn.onclick = () => {
      if (btn.dataset.color === q.answer) score++;
      round++;
      nextRound();
    };
  });
}

async function endTest() {
  progressBar.style.width = `100%`;
  const totalTimeMs = Date.now() - startTime;
  
  // Alerta bonita con SweetAlert2
  Swal.fire({
    title: '¡Prueba Completada!',
    html: `
      <div class="text-start">
        <p><strong>Puntaje:</strong> ${score} / ${MAX_ROUNDS}</p>
        <p><strong>Tiempo:</strong> ${(totalTimeMs / 1000).toFixed(2)} segundos</p>
      </div>
    `,
    icon: 'success',
    confirmButtonText: 'Volver al Dashboard',
    allowOutsideClick: false
  }).then(() => {
    window.location.href = 'dashboard.html';
  });

  // Guardar en segundo plano
  try {
    await fetch('/api/tests/save-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ testName: 'Stroop', score, timeTakenMs: totalTimeMs })
    });
  } catch (err) {
    console.error(err);
  }
}