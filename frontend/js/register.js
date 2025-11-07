const form = document.getElementById('regForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('regUser').value;
  const password = document.getElementById('regPass').value;

  try {
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    msg.textContent = data.message || data.error;
    
    if(res.ok) {
      // Redirigir a login después de registrarse
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1000);
    }

  } catch (err) {
    msg.textContent = 'Error al registrar usuario';
  }
});
