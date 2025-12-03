const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'mi-secreto-super-seguro';

function extractToken(req) {
  const authHeader = req.headers['authorization'];
  const cookie = req.headers.cookie;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  if (cookie) {
    const tokenCookie = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('token='));
    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }
  }
  return null;
}

function verifyToken(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado, no hay token' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    req.userId = payload.userId; // Esto es vital para guardar los resultados
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

module.exports = {
  verifyToken,
};