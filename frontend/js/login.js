const API = 'http://localhost:3000/api/auth';

document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('loginUser').value,
      password: document.getElementById('loginPass').value
    })
  });
  const data = await res.json();
  document.getElementById('msg').textContent = data.message || data.error;
});