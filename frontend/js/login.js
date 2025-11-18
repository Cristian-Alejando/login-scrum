const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const username = document.getElementById('loginUser').value;
  const password = document.getElementById('loginPass').value;

  try {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', 
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if(res.ok) {
      // Guardar username
      localStorage.setItem('username', data.username);
      
      // Alerta de Éxito con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Iniciando sesión...',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        window.location.href = 'dashboard.html';
      });
      
    } else {
      // Alerta de Error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.error || 'Credenciales incorrectas'
      });
    }

  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: 'No se pudo conectar con el servidor'
    });
  }
});