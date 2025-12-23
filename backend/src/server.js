// server.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const iaPanelRoutes = require('./routes/iaPanelRoutes');
const dashboardDummyRoutes = require('./routes/dashboardDummyRoutes');
const userRoleRoutes = require('./routes/userRoleRoutes');



const rateLimit = require('./middleware/rateLimit');
const app = express();
// Behind Codespaces/other proxies we trust the forwarded headers for rate-limit and CORS.
app.set('trust proxy', 1);
app.use(helmet());

// CORS: solo dominios permitidos (ajusta para prod)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://uarp-frontend.com', // tu dominio custom si lo tienes
  'https://miapp.ondigitalocean.app' // dominio público DO (ajusta al real)
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Permite Postman/health
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('No permitido por CORS'), false);
  },
  credentials: true
}));
// Preflight OPTIONS
app.options('*', cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('No permitido por CORS'), false);
  },
  credentials: true
}));

const logFailedAccess = require('./middleware/logFailedAccess');
app.use(rateLimit);
app.use(logFailedAccess);
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/user-roles', userRoleRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api', dashboardDummyRoutes);
app.use('/api/ia-panel', iaPanelRoutes);
app.use('/api/audit', require('./routes/auditLogRoutes'));

app.get('/', (req, res) => res.send('UARP-AI Backend Running'));

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    const host = '0.0.0.0';
    if (process.env.NODE_ENV !== 'production') {
      console.log('Connected to PostgreSQL');
      app.listen(PORT, host, () => console.log(`Server running on ${host}:${PORT}`));
    } else {
      app.listen(PORT, host);
    }
  })
  .catch(err => {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Unable to connect to DB:', err);
    }
  });
