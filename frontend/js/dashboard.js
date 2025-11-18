const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');

// 1. Lógica de Sesión
const storedUsername = localStorage.getItem('username');
userName.textContent = storedUsername || 'Usuario';

logoutBtn.addEventListener('click', () => {
  // Borrar datos locales
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  
  // Borrar cookie (opcional, el servidor lo maneja pero esto ayuda a limpiar la UI)
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  window.location.href = 'login.html';
});

// 2. Lógica de Botones de Prueba
const testButtons = document.querySelectorAll('.btn-test');

testButtons.forEach(button => {
  button.addEventListener('click', () => {
    const testName = button.dataset.test; 
    if (testName) {
      window.location.href = `${testName}.html`;
    }
  });
});

// 3. CONFIGURACIÓN DE LA GRÁFICA (Chart.js)
// Esto simula datos de progreso. Más adelante podrías conectarlo a tu API real.
document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('progressChart');
  
  if(ctx) {
    new Chart(ctx, {
      type: 'line', // Tipo de gráfica: Línea
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Puntaje Promedio',
          data: [65, 59, 80, 81, 56, 55, 90], // Datos de ejemplo
          borderColor: '#005A9C', // Azul CogniKids
          backgroundColor: 'rgba(0, 90, 156, 0.1)',
          tension: 0.4, // Curvatura de la línea
          fill: true,
          pointBackgroundColor: '#FF6F00', // Puntos naranjas
          pointBorderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
});