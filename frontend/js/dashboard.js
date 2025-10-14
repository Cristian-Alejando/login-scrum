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
