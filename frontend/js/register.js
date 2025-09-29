const API = 'http://localhost:3000/api/auth';

document.getElementById('regForm').addEventListener('submit', async e => {
  e.preventDefault();
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: document.getElementById('regUser').value,
      password: document.getElementById('regPass').value
    })
  });
  const data = await res.json();
  document.getElementById('msg').textContent = data.message || data.error;
});