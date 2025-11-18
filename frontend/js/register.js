const form = document.getElementById('regForm');

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
    
    if(res.ok) {
      // Alerta de Éxito
      Swal.fire({
        icon: 'success',
        title: '¡Cuenta Creada!',
        text: 'Redirigiendo al inicio de sesión...',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        window.location.href = 'login.html';
      });
      
    } else {
      // Alerta de Error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data.error || 'Error al registrar usuario'
      });
    }

  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error de conexión',
      text: 'Intenta nuevamente más tarde'
    });
  }
});