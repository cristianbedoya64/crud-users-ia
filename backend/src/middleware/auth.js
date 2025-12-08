// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (roles = []) {
  // roles puede ser un string o array
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No autenticado.' });
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {
      if (err) return res.status(403).json({ error: 'Token inválido.' });
      req.user = user;
      if (roles.length && (!user.roles || !roles.some(r => user.roles.includes(r)))) {
        return res.status(403).json({ error: 'No autorizado.' });
      }
      next();
    });
  };
};
