const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');

// Mostrar usuario logueado
const username = localStorage.getItem('username');
userName.textContent = username || 'Usuario';

// Cerrar sesión
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.href = 'login.html';
});

// Añadir listeners para los botones de las pruebas
const testButtons = document.querySelectorAll('.btn-test');

testButtons.forEach(button => {
  button.addEventListener('click', () => {
    const testName = button.dataset.test; // 'stroop', 'memory', etc.
    if (testName) {
      // Redirigir a la página de la prueba
      window.location.href = `${testName}.html`;
    }
  });
});