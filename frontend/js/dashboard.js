const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');
const btnReport = document.getElementById('btnReport');

// 1. Lógica de Sesión
const storedUsername = localStorage.getItem('username');
const token = localStorage.getItem('token');
userName.textContent = storedUsername || 'Usuario';

if (!token) {
  // window.location.href = 'login.html';
}

logoutBtn.addEventListener('click', () => {
  // Borrar datos locales
  localStorage.removeItem('token');
  localStorage.removeItem('username');

  // Borrar cookie
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

// 3. Obtener Estadísticas Reales
async function fetchStats() {
  try {
    const response = await fetch('/api/tests/stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error('Error al obtener estadísticas');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// 4. CONFIGURACIÓN DE LA GRÁFICA (Chart.js) y REPORTE
document.addEventListener('DOMContentLoaded', async function () {
  const stats = await fetchStats();
  const ctx = document.getElementById('progressChart');

  // Preparar datos para la gráfica (Puntaje vs Fecha)
  // Tomamos los últimos 10 resultados para no saturar la gráfica
  const recentStats = stats.slice(-10);
  const labels = recentStats.map(s => new Date(s.created_at).toLocaleDateString());
  const dataPoints = recentStats.map(s => s.score);

  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels.length ? labels : ['Sin datos'],
        datasets: [{
          label: 'Puntaje',
          data: dataPoints.length ? dataPoints : [0],
          borderColor: '#005A9C',
          backgroundColor: 'rgba(0, 90, 156, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#FF6F00',
          pointBorderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });
  }

  // 5. Lógica del Botón de Reporte
  if (btnReport) {
    btnReport.addEventListener('click', () => {
      if (stats.length === 0) {
        Swal.fire('Sin datos', 'Realiza algunas pruebas para generar un reporte.', 'info');
        return;
      }

      const totalTests = stats.length;

      // Helper: Case-insensitive partial match
      const getMaxScore = (keyword) => {
        const tests = stats.filter(s =>
          s.test_name && s.test_name.toLowerCase().includes(keyword)
        );

        if (tests.length === 0) return 0;
        return Math.max(...tests.map(s => Number(s.score)));
      };

      // Use partial keywords to match both English and Spanish (e.g., 'memor' matches 'Memory' and 'Memoria')
      const maxStroop = getMaxScore('stroop');
      const maxMemory = getMaxScore('memor');
      const maxPerception = getMaxScore('percep');

      Swal.fire({
        title: '<strong>Reporte Semanal</strong>',
        html: `
                <div style='text-align: left'>
                    <p class='mb-4'>Total de pruebas: <b>${totalTests}</b></p>
                    <h4 class='font-bold mb-2'>Mejores Puntajes:</h4>
                    <ul class='space-y-2'>
                        <li>🔴 Stroop: <b>${maxStroop}/100</b></li>
                        <li>🔵 Memoria: <b>${maxMemory}/100</b></li>
                        <li>🟢 Percepción: <b>${maxPerception}/100</b></li>
                    </ul>
                </div>
            `,
        icon: 'success',
        confirmButtonText: 'Entendido'
      });
    });
  }
});