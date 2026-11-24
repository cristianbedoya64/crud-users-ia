// Conjunto de VALIDACIÓN: casos nuevos, escritos después de implementar la mejora,
// para medir el desempeño con datos que no se usaron al programarla.
jest.mock('../../src/models', () => ({ AuditLog: { findAndCountAll: jest.fn() }, User: {} }));
const { AuditLog } = require('../../src/models');
const ctrl = require('../../src/controllers/auditLogController');
async function sanitizar(details) {
  AuditLog.findAndCountAll.mockResolvedValue({ count: 1, rows: [{ id: 1, action: 'update', details, createdAt: new Date() }] });
  const res = { status() { return this; }, json(b) { this.body = b; return this; } };
  await ctrl.list({ query: {} }, res);
  return res.body.logs[0].details;
}
const contiene = (o, v) => JSON.stringify(o).includes(v);
const SENSIBLES = [
  ['V1', 'Clave "user_password"', { user_password: 'Abc#123' }, 'Abc#123'],
  ['V2', 'Clave "Contraseña" con tilde', { 'Contraseña': 'Xyz#987' }, 'Xyz#987'],
  ['V3', 'Clave "numero_documento"', { numero_documento: '31987654' }, '31987654'],
  ['V4', 'Clave "correoElectronico"', { correoElectronico: 'l.gomez@banco.co' }, 'l.gomez@banco.co'],
  ['V5', 'Clave "phoneNumber"', { phoneNumber: '+57 300 111 2233' }, '300 111 2233'],
  ['V6', 'Clave "apellidos"', { apellidos: 'Gómez Ruiz' }, 'Gómez Ruiz'],
  ['V7', 'IP en texto "IP 10.1.1.1"', 'intento fallido IP 10.1.1.1', '10.1.1.1'],
  ['V8', 'Correo en mayúsculas en texto', 'alerta para LUIS.GOMEZ@BANCO.CO', 'LUIS.GOMEZ@BANCO.CO'],
  ['V9', 'Texto "celular: 3001234567"', 'actualizado celular: 3001234567', '3001234567'],
  ['V10', 'Clave "nit"', { nit: '900123456' }, '900123456'],
  ['V11', 'Teléfono con espacios en texto libre', 'contacto 310 456 7890', '310 456 7890'],
  ['V12', 'Dirección IPv6 en texto', 'acceso desde 2001:db8::ff00:42:8329', '2001:db8::ff00:42:8329'],
  ['V13', 'Nombre de usuario en clave "username"', { username: 'jperez' }, 'jperez'],
  ['V14', 'Pasaporte en clave "pasaporte"', { pasaporte: 'AB123456' }, 'AB123456'],
  ['V15', 'Token en clave "refresh_token"', { refresh_token: 'rt-5555' }, 'rt-5555'],
];
const NEUTROS = [
  ['W1', 'Fecha en texto', 'cambio aplicado 2026-11-04', '2026-11-04'],
  ['W2', 'Clave "zipStatus"', { zipStatus: 'ok' }, 'ok'],
  ['W3', 'Monto de 7 dígitos', 'transferencia por 1500000 COP', '1500000'],
  ['W4', 'Clave "module"', { module: 'roles' }, 'roles'],
  ['W5', 'Clave "permissionName"', { permissionName: 'view_audit' }, 'view_audit'],
];
const R = [];
afterAll(() => require('fs').writeFileSync(__dirname + '/resultados_sanitizacion_validacion.json', JSON.stringify(R, null, 2)));
test.each(SENSIBLES)('%s %s', async (id, desc, d, v) => { const o = await sanitizar(typeof d === 'string' ? d : JSON.stringify(d)); R.push({ id, tipo: 'sensible', desc, oculto: !contiene(o, v) }); });
test.each(NEUTROS)('%s %s', async (id, desc, d, v) => { const o = await sanitizar(typeof d === 'string' ? d : JSON.stringify(d)); R.push({ id, tipo: 'neutro', desc, conservado: contiene(o, v) }); });
