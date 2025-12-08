// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const iaPanelRoutes = require('./routes/iaPanelRoutes');
const dashboardDummyRoutes = require('./routes/dashboardDummyRoutes');


const app = express();
const allowedOrigins = [
  'http://localhost:5173', // Vite dev
  'http://localhost:3000', // React dev
  'https://uarp-frontend.com' // Producción (ajusta según dominio real)
];
app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origin (como Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('No permitido por CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api', dashboardDummyRoutes);
app.use('/api/ia-panel', iaPanelRoutes);
app.use('/api/audit', require('./routes/auditLogRoutes'));

app.get('/', (req, res) => res.send('UARP-AI Backend Running'));

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Unable to connect to DB:', err);
  });
