// middleware/auth.js
const jwt = require('jsonwebtoken');

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET is required in production');
    }
    return 'supersecret';
  }
  return secret;
}

module.exports = function (roles = []) {
  // roles puede ser un string o array
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No autenticado.' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, getJwtSecret(), (err, user) => {
      if (err) {
        // 401 permite al frontend intentar refresh de sesión.
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token expirado.' });
        }
        return res.status(401).json({ error: 'Token inválido.' });
      }
      req.user = user;
      if (roles.length && (!user.roles || !roles.some(r => user.roles.includes(r)))) {
        return res.status(403).json({ error: 'No autorizado.' });
      }
      next();
    });
  };
};
