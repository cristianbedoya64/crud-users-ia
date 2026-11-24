// Pruebas de seguridad del BFF (autenticación JWT, RBAC y acceso al servicio de IA)
const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = 'secreto-de-prueba-tesis';
const SECRET = process.env.JWT_SECRET;

jest.mock('axios', () => ({ post: jest.fn() }));
jest.mock('../../src/models', () => ({
  User: { findByPk: jest.fn() },
  Role: {},
  AuditLog: { count: jest.fn() }
}));
const axios = require('axios');
const { User, AuditLog } = require('../../src/models');
const auth = require('../../src/middleware/auth');
const iaPanelRoutes = require('../../src/routes/iaPanelRoutes');

const R = []; // registro de resultados para la tabla
function log(id, caso, esperado, obtenido) { R.push({ id, caso, esperado, obtenido, ok: String(esperado) === String(obtenido) }); }
afterAll(() => { require('fs').writeFileSync(__dirname + '/resultados_seguridad.json', JSON.stringify(R, null, 2)); });

function app() {
  const a = express();
  a.use(express.json());
  a.get('/protegido', auth(), (req, res) => res.json({ ok: true }));
  a.get('/admin', auth('admin'), (req, res) => res.json({ ok: true }));
  a.use('/api/ia-panel', iaPanelRoutes);
  return a;
}
const valido = (roles = ['analista']) => jwt.sign({ id: 1, roles }, SECRET, { expiresIn: '15m' });

describe('Autenticación JWT', () => {
  test('S1 sin encabezado Authorization', async () => {
    const r = await request(app()).get('/protegido'); log('S1', 'Petición sin token', 401, r.status); expect(r.status).toBe(401);
  });
  test('S2 encabezado Bearer vacío', async () => {
    const r = await request(app()).get('/protegido').set('Authorization', 'Bearer '); log('S2', 'Encabezado "Bearer" sin token', 401, r.status); expect(r.status).toBe(401);
  });
  test('S3 token firmado con otra clave', async () => {
    const t = jwt.sign({ id: 1, roles: ['admin'] }, 'clave-del-atacante');
    const r = await request(app()).get('/protegido').set('Authorization', `Bearer ${t}`); log('S3', 'Token firmado con una clave distinta', 401, r.status); expect(r.status).toBe(401);
  });
  test('S4 token con payload alterado', async () => {
    const [h, , s] = valido().split('.');
    const falso = Buffer.from(JSON.stringify({ id: 1, roles: ['admin'] })).toString('base64url');
    const r = await request(app()).get('/admin').set('Authorization', `Bearer ${h}.${falso}.${s}`); log('S4', 'Token con rol "admin" insertado manualmente', 401, r.status); expect(r.status).toBe(401);
  });
  test('S5 token sin firma (alg none)', async () => {
    const h = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
    const p = Buffer.from(JSON.stringify({ id: 1, roles: ['admin'] })).toString('base64url');
    const r = await request(app()).get('/admin').set('Authorization', `Bearer ${h}.${p}.`); log('S5', 'Token sin firma (algoritmo "none")', 401, r.status); expect(r.status).toBe(401);
  });
  test('S6 token expirado', async () => {
    const t = jwt.sign({ id: 1, roles: ['admin'], exp: Math.floor(Date.now() / 1000) - 60 }, SECRET);
    const r = await request(app()).get('/protegido').set('Authorization', `Bearer ${t}`); log('S6', 'Token vencido', 401, r.status); expect(r.status).toBe(401); expect(r.body.error).toMatch(/expirado/);
  });
  test('S7 token válido', async () => {
    const r = await request(app()).get('/protegido').set('Authorization', `Bearer ${valido()}`); log('S7', 'Token válido', 200, r.status); expect(r.status).toBe(200);
  });
});

describe('Control de acceso por roles', () => {
  test('S8 usuario sin rol admin en ruta de admin', async () => {
    const r = await request(app()).get('/admin').set('Authorization', `Bearer ${valido(['analista'])}`); log('S8', 'Usuario sin rol requerido', 403, r.status); expect(r.status).toBe(403);
  });
  test('S9 usuario con rol admin', async () => {
    const r = await request(app()).get('/admin').set('Authorization', `Bearer ${valido(['admin'])}`); log('S9', 'Usuario con rol requerido', 200, r.status); expect(r.status).toBe(200);
  });
});

describe('Acceso al servicio de IA a través del BFF', () => {
  beforeEach(() => {
    axios.post.mockReset();
    User.findByPk.mockReset().mockImplementation(async id => ({ id, Roles: [{ name: 'user' }] }));
    AuditLog.count.mockReset().mockResolvedValue(12);
  });
  test('S10 IA sin token: no se llama al servicio', async () => {
    const r = await request(app()).post('/api/ia-panel').send({});
    log('S10', 'Consulta a la IA sin token (¿se llama al servicio?)', '401 / no', `${r.status} / ${axios.post.mock.calls.length ? 'sí' : 'no'}`);
    expect(r.status).toBe(401); expect(axios.post).not.toHaveBeenCalled();
  });
  test('S11 IA con token inválido: no se llama al servicio', async () => {
    const r = await request(app()).post('/api/ia-panel').set('Authorization', 'Bearer abc.def.ghi').send({});
    log('S11', 'Consulta a la IA con token inválido (¿se llama al servicio?)', '401 / no', `${r.status} / ${axios.post.mock.calls.length ? 'sí' : 'no'}`);
    expect(r.status).toBe(401); expect(axios.post).not.toHaveBeenCalled();
  });
  test('S12 IA con token válido', async () => {
    axios.post.mockResolvedValue({ data: { suggestions: 'Usuario normal.' } });
    const r = await request(app()).post('/api/ia-panel').set('Authorization', `Bearer ${valido()}`).send({ num_roles: 1, is_admin: 0, activity_score: 10 });
    log('S12', 'Consulta a la IA con token válido', '200 / sí', `${r.status} / ${axios.post.mock.calls.length ? 'sí' : 'no'}`);
    expect(r.status).toBe(200);
  });
  test('S13 IA caída: mensaje de error expuesto', async () => {
    axios.post.mockRejectedValue(new Error('connect ECONNREFUSED 172.18.0.4:5001'));
    const r = await request(app()).post('/api/ia-panel').set('Authorization', `Bearer ${valido()}`).send({});
    const filtra = /ECONNREFUSED|172\.18/.test(JSON.stringify(r.body));
    log('S13', 'Servicio de IA caído: ¿la respuesta revela datos internos?', 'no', filtra ? 'sí' : 'no');
    expect(r.status).toBe(502); expect(filtra).toBe(false);
  });
  test('S14 ¿el BFF filtra datos personales antes de reenviar a la IA?', async () => {
    axios.post.mockResolvedValue({ data: {} });
    const cuerpo = { num_roles: 1, email: 'ana.perez@correo.com', documentId: '1144123456', name: 'Ana Pérez' };
    await request(app()).post('/api/ia-panel').set('Authorization', `Bearer ${valido()}`).send(cuerpo);
    const enviado = axios.post.mock.calls[0][1];
    const llegan = ['email', 'documentId', 'name'].filter(k => k in enviado);
    log('S14', 'Datos personales enviados por el cliente llegan a la IA', 'ninguno', llegan.length ? llegan.join(', ') : 'ninguno');
    expect(Object.keys(enviado).sort()).toEqual(['activity_score', 'is_admin', 'num_roles']);
  });
  test('S15 el cliente intenta manipular los indicadores', async () => {
    axios.post.mockResolvedValue({ data: {} });
    await request(app()).post('/api/ia-panel').set('Authorization', `Bearer ${valido()}`).send({ num_roles: 0, is_admin: 0, activity_score: 1 });
    const enviado = axios.post.mock.calls[0][1];
    const ok = enviado.num_roles === 1 && enviado.activity_score === 12;
    log('S15', 'Indicadores enviados por el cliente son ignorados (se calculan en el servidor)', 'sí', ok ? 'sí' : 'no');
    expect(ok).toBe(true);
  });
  test('S16 usuario no administrador intenta analizar a otro usuario', async () => {
    axios.post.mockResolvedValue({ data: {} });
    await request(app()).post('/api/ia-panel').set('Authorization', `Bearer ${valido(['user'])}`).send({ userId: 99 });
    const consultado = User.findByPk.mock.calls[0][0];
    log('S16', 'Usuario sin rol admin pide el análisis de otro usuario', 'se analiza solo a sí mismo', consultado === 1 ? 'se analiza solo a sí mismo' : `se analizó al usuario ${consultado}`);
    expect(consultado).toBe(1);
  });
});
