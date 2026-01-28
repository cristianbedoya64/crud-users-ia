// middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo de 100 peticiones por IP
  message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Evitar rate limit en endpoints demo usados por el dashboard
    return req.path.startsWith('/api/demo');
  }
});

const isProd = process.env.NODE_ENV === 'production';
module.exports = isProd ? limiter : (req, _res, next) => next();
