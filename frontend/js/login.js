const form = document.getElementById('loginForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('loginUser').value;
  const password = document.getElementById('loginPass').value;

  try {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // accept cookies from server
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    msg.textContent = data.message || data.error;

    if(res.ok) {
      // Guardar username para UI; token is set as HttpOnly cookie by server
      localStorage.setItem('username', data.username);
      // Redirigir a dashboard
      window.location.href = 'dashboard.html';
    }

  } catch (err) {
    msg.textContent = 'Error al iniciar sesión';
  }
});
