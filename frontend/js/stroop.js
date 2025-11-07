// js/stroop.js (VERSIÓN CORREGIDA)

// Referencias a elementos
const stimulusEl = document.getElementById('stimulus');
const optionsEl = document.getElementById('options');
const startBtn = document.getElementById('btnStart');

const gameScreen = document.querySelector('.game-screen');
const resultsScreen = document.getElementById('results');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');

// 1. Definimos 5 preguntas diferentes
const questions = [
  { word: 'ROJO', color: 'blue', answer: 'blue' },   // Pregunta 1: Palabra ROJO, color AZUL
  { word: 'AZUL', color: 'red', answer: 'red' },     // Pregunta 2: Palabra AZUL, color ROJO
  { word: 'ROJO', color: 'red', answer: 'red' },     // Pregunta 3: Palabra ROJO, color ROJO
  { word: 'AZUL', color: 'blue', answer: 'blue' },  // Pregunta 4: Palabra AZUL, color AZUL
  { word: 'ROJO', color: 'blue', answer: 'blue' }    // Pregunta 5: (Repetimos)
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
  startBtn.style.display = 'none'; // Ocultar botón
  nextRound();
}

function nextRound() {
  // Si ya pasamos la última ronda, terminar el test
  if (round >= MAX_ROUNDS) {
    endTest();
    return;
  }

  // 2. Obtenemos la pregunta ACTUAL de la lista
  const currentQuestion = questions[round];

  // --- Lógica del Test de Stroop ---
  // 3. Mostramos el estímulo y las opciones de la pregunta actual
  stimulusEl.innerHTML = `<p style="color: ${currentQuestion.color};">${currentQuestion.word}</p>`;
  optionsEl.innerHTML = `
    <button class="btn-option" data-color="red">Rojo</button>
    <button class="btn-option" data-color="blue">Azul</button>
  `;

  // 4. Asignamos los listeners para los botones
  optionsEl.querySelectorAll('.btn-option').forEach(btn => {
    btn.onclick = () => {
      // 5. Verificamos si la respuesta es correcta
      if (btn.dataset.color === currentQuestion.answer) {
        score++;
      }
      
      // 6. AVANZAMOS A LA SIGUIENTE RONDA (¡Este era el error!)
      round++;
      
      // 7. Llamamos a nextRound() para mostrar la siguiente pregunta
      nextRound();
    };
  });
}

async function endTest() {
  const endTime = Date.now();
  const totalTimeMs = endTime - startTime;
  const totalTimeSec = (totalTimeMs / 1000).toFixed(2);

  // Mostrar resultados en la UI
  gameScreen.style.display = 'none';
  resultsScreen.style.display = 'block';
  scoreEl.textContent = `${score} / ${MAX_ROUNDS}`;
  timeEl.textContent = totalTimeSec;

  // Enviar resultados al backend (¡Ahora debería funcionar!)
  try {
    const res = await fetch('/api/tests/save-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        testName: 'Stroop',
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