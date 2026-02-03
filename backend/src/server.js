// server.js
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const iaPanelRoutes = require('./routes/iaPanelRoutes');
const dashboardDummyRoutes = require('./routes/dashboardDummyRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoleRoutes = require('./routes/userRoleRoutes');
const authRoutes = require('./routes/authRoutes');



const rateLimit = require('./middleware/rateLimit');
const app = express();
// Behind Codespaces/other proxies we trust the forwarded headers for rate-limit and CORS.
app.set('trust proxy', 1);
app.use(helmet());

// CORS: solo dominios permitidos (ajusta para prod)
const isProduction = process.env.NODE_ENV === 'production';
let allowAll = process.env.CORS_ALLOW_ALL === 'true' && !isProduction;
if (isProduction && process.env.CORS_ALLOW_ALL === 'true') {
  console.error('CORS_ALLOW_ALL no está permitido en producción. Se forzará a false.');
  allowAll = false;
}
const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map(o => o.trim()).filter(Boolean).concat([
  'http://localhost:5173',
  'http://localhost:3000',
  'https://uarp-frontend.com',
  'https://miapp.ondigitalocean.app'
]);
const isAllowedOrigin = (origin) => {
  if (allowAll) return true;
  if (!origin) return true; // Permite Postman/health
  if (allowedOrigins.includes(origin)) return true;
  if (origin.includes('app.github.dev')) return true; // Codespaces subdomains (any port)
  try {
    const { hostname } = new URL(origin);
    if (hostname.endsWith('.app.github.dev')) return true; // Codespaces subdomains
  } catch (err) {
    return false;
  }
  return false;
};
app.use(cors({
  origin: function (origin, callback) {
    if (isAllowedOrigin(origin)) return callback(null, true);
    return callback(new Error('No permitido por CORS'), false);
  },
  credentials: true
}));
// Preflight OPTIONS
app.options('*', cors({
  origin: function (origin, callback) {
    if (isAllowedOrigin(origin)) return callback(null, true);
    return callback(new Error('No permitido por CORS'), false);
  },
  credentials: true
}));

const logFailedAccess = require('./middleware/logFailedAccess');
app.use(rateLimit);
app.use(logFailedAccess);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user-roles', userRoleRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/demo', dashboardDummyRoutes);
app.use('/api', dashboardDummyRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ia-panel', iaPanelRoutes);
app.use('/api/audit', require('./routes/auditLogRoutes'));

app.get('/', (req, res) => res.send('UARP-AI Backend Running'));

let dbReady = false;
let lastDbError = null;

const IA_PANEL_URL = process.env.IA_PANEL_URL || 'http://ia-panel:5001/ia-panel';

async function checkDb() {
  try {
    await sequelize.authenticate();
    dbReady = true;
    lastDbError = null;
    return true;
  } catch (err) {
    dbReady = false;
    lastDbError = err?.message || 'DB error';
    return false;
  }
}

async function checkIa() {
  try {
    const payload = { num_roles: 1, is_admin: 0, activity_score: 10 };
    await axios.post(IA_PANEL_URL, payload, { timeout: 2000 });
    return true;
  } catch (err) {
    return false;
  }
}

app.get('/health', async (req, res) => {
  const [dbOk, iaOk] = await Promise.all([checkDb(), checkIa()]);
  res.json({
    status: 'ok',
    db: dbOk ? 'ok' : 'error',
    ia: iaOk ? 'ok' : 'error'
  });
});

app.get('/ready', async (req, res) => {
  const [dbOk, iaOk] = await Promise.all([checkDb(), checkIa()]);
  if (!dbOk || !iaOk) {
    return res.status(503).json({
      status: 'not_ready',
      db: dbOk ? 'ok' : 'error',
      ia: iaOk ? 'ok' : 'error',
      ...(dbOk ? {} : { dbError: lastDbError })
    });
  }
  return res.json({ status: 'ready', db: 'ok', ia: 'ok' });
});

const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';

app.listen(PORT, host, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server running on ${host}:${PORT}`);
  }
});

checkDb().then((ok) => {
  if (ok && process.env.NODE_ENV !== 'production') {
    console.log('Connected to PostgreSQL');
  }
}).catch((err) => {
  const msg = err?.message || err;
  console.error('Database connection failed at startup:', msg);
});
