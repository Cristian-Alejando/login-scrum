// backend/auth.js
const jwt = require('jsonwebtoken');
// Traemos el secreto de tu archivo .env (el mismo que usas en server.js)
const SECRET = process.env.JWT_SECRET || 'mi-secreto-super-seguro'; 

/**
 * Esta es la función que extrae el token.
 * Es una copia de la lógica que ya tienes en tu server.js
 */
function extractToken(req) {
  const authHeader = req.headers['authorization'];
  const cookie = req.headers.cookie;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  if (cookie) {
    // Busca la cookie 'token='
    const tokenCookie = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('token='));
    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }
  }
  return null;
}

/**
 * ESTA ES LA FUNCIÓN (MIDDLEWARE) QUE FALTABA
 */
function verifyToken(req, res, next) {
  
  const token = extractToken(req); // Usamos la lógica de arriba

  if (!token) {
    // Si no hay token, no está autenticado
    // Esta es una API, así que devolvemos un error JSON
    return res.status(401).json({ error: 'Acceso no autorizado, no hay token' });
  }

  try {
    // Intentamos verificar el token
    const payload = jwt.verify(token, SECRET);
    
    // ¡IMPORTANTE! Guardamos el ID del usuario en el objeto 'req'
    // para que la ruta /save-result sepa QUIÉN está guardando la prueba
    req.userId = payload.userId; 
    
    // Todo bien, le damos permiso para continuar a la ruta
    next(); 
  } catch (err) {
    // El token era inválido o expiró
    return res.status(403).json({ error: 'Token inválido' });
  }
}

// Exportamos la función para que tests.js pueda importarla
module.exports = {
  verifyToken
};