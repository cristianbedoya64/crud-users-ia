// Pruebas funcionales de la sanitización de registros de auditoría (safeDetails)
jest.mock('../../src/models', () => ({ AuditLog: { findAndCountAll: jest.fn() }, User: {} }));
const { AuditLog } = require('../../src/models');
const ctrl = require('../../src/controllers/auditLogController');

async function sanitizar(details) {
  AuditLog.findAndCountAll.mockResolvedValue({ count: 1, rows: [{ id: 1, action: 'update', details, createdAt: new Date() }] });
  const res = { status() { return this; }, json(b) { this.body = b; return this; } };
  await ctrl.list({ query: {} }, res);
  return res.body.logs[0].details;
}
const contiene = (salida, valor) => JSON.stringify(salida).includes(valor);

// [id, categoría, descripción, details, valor sensible que NO debe aparecer]
const SENSIBLES = [
  ['F1', 'Credencial', 'Clave "password" en JSON', { password: 'Clave#2026' }, 'Clave#2026'],
  ['F2', 'Credencial', 'Clave "token" en JSON', { token: 'eyJhbGciOi.abc' }, 'eyJhbGciOi.abc'],
  ['F3', 'Credencial', 'Clave "accessToken" en JSON', { accessToken: 'tok-123' }, 'tok-123'],
  ['F4', 'Credencial', 'Clave "secret" en JSON', { secret: 's3cr3t' }, 's3cr3t'],
  ['F5', 'Credencial', 'Clave "authorization" en JSON', { authorization: 'Bearer xyz' }, 'Bearer xyz'],
  ['F6', 'Credencial', 'Clave "cookie" en JSON', { cookie: 'sid=999' }, 'sid=999'],
  ['F7', 'Red', 'Clave "ip" en JSON', { ip: '190.25.4.8' }, '190.25.4.8'],
  ['F8', 'Red', 'Clave "ipAddress" en JSON', { ipAddress: '10.0.0.5' }, '10.0.0.5'],
  ['F9', 'Ubicación', 'Clave "address" en JSON', { address: 'Calle 5 # 10-20' }, 'Calle 5 # 10-20'],
  ['F10', 'Identificación', 'Clave "documentId" en JSON', { documentId: '1144123456' }, '1144123456'],
  ['F11', 'Credencial', 'Password anidado en objeto', { cambios: { password: 'Nueva#1' } }, 'Nueva#1'],
  ['F12', 'Credencial', 'Token dentro de un arreglo', { sesiones: [{ token: 'tk-arr' }] }, 'tk-arr'],
  ['F13', 'Credencial', 'Texto libre "password=..."', 'password=Clave2026 cambio exitoso', 'Clave2026'],
  ['F14', 'Credencial', 'Texto libre "token: ..."', 'token: abc999 renovado', 'abc999'],
  ['F15', 'Red', 'Texto libre "ip=..."', 'login ip=181.50.3.2', '181.50.3.2'],
  ['F16', 'Contacto', 'Clave "email" en JSON', { email: 'ana.perez@correo.com' }, 'ana.perez@correo.com'],
  ['F17', 'Identidad', 'Clave "name" en JSON', { name: 'Ana Pérez' }, 'Ana Pérez'],
  ['F18', 'Contacto', 'Clave "telefono" en JSON', { telefono: '3104567890' }, '3104567890'],
  ['F19', 'Identificación', 'Clave "cedula" en JSON', { cedula: '1144987654' }, '1144987654'],
  ['F20', 'Credencial', 'Clave "clave" (en español)', { clave: 'MiClave1' }, 'MiClave1'],
  ['F21', 'Credencial', 'Clave "pwd"', { pwd: 'Pwd#77' }, 'Pwd#77'],
  ['F22', 'Contacto', 'Correo en texto libre', 'usuario ana.perez@correo.com actualizado', 'ana.perez@correo.com'],
  ['F23', 'Red', 'IP en texto libre sin etiqueta', 'acceso desde 192.168.1.5', '192.168.1.5'],
  ['F24', 'Identificación', 'Cédula en texto libre', 'cc 1144123456 verificada', '1144123456'],
  ['F25', 'Contacto', 'Correo en un valor con clave neutra', { destinatario: 'juan@empresa.co' }, 'juan@empresa.co'],
];
// Campos NO sensibles que deberían conservarse (falsos positivos)
const NEUTROS = [
  ['N1', 'Clave "action"', { action: 'update_role' }, 'update_role'],
  ['N2', 'Clave "resource"', { resource: 'users' }, 'users'],
  ['N3', 'Clave "description"', { description: 'cambio de rol' }, 'cambio de rol'],
  ['N4', 'Clave "roleId"', { roleId: 3 }, '3'],
  ['N5', 'Clave "permission"', { permission: 'users.read' }, 'users.read'],
  ['N6', 'Clave "recipient" (sistema)', { recipient: 'modulo-reportes' }, 'modulo-reportes'],
];

const R = [];
afterAll(() => require('fs').writeFileSync(__dirname + '/resultados_sanitizacion.json', JSON.stringify(R, null, 2)));

describe('Datos sensibles', () => {
  test.each(SENSIBLES)('%s %s – %s', async (id, cat, desc, details, valor) => {
    const out = await sanitizar(typeof details === 'string' ? details : JSON.stringify(details));
    R.push({ id, tipo: 'sensible', cat, desc, oculto: !contiene(out, valor) });
  });
});
describe('Datos no sensibles', () => {
  test.each(NEUTROS)('%s %s', async (id, desc, details, valor) => {
    const out = await sanitizar(JSON.stringify(details));
    R.push({ id, tipo: 'neutro', desc, conservado: contiene(out, valor) });
  });
});
