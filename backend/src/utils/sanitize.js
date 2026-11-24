// utils/sanitize.js
// Sanitización de datos personales y credenciales en registros de auditoría.
// Se evalúa cada nombre de campo por palabras completas (no por subcadenas)
// para evitar falsos positivos como "description" o "recipient", y se
// enmascaran correos, IP y números de identificación que aparezcan en texto libre.

const SENSITIVE_WORDS = new Set([
  // credenciales
  'password', 'passwd', 'pwd', 'pass', 'clave', 'contrasena', 'token', 'secret',
  'authorization', 'cookie', 'apikey', 'jwt',
  // red y ubicación
  'ip', 'ipaddress', 'address', 'direccion',
  // identificación
  'document', 'documentid', 'documento', 'cedula', 'dni', 'nit',
  // contacto e identidad
  'email', 'correo', 'mail', 'phone', 'telefono', 'celular', 'movil',
  'name', 'nombre', 'nombres', 'apellido', 'apellidos', 'firstname', 'lastname', 'fullname'
]);

function normalize(text) {
  return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// "accessToken" -> ["access","token"], "ip_address" -> ["ip","address"]
function keyWords(key) {
  return normalize(key)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function isSensitiveKey(key) {
  const words = keyWords(key);
  if (words.some(w => SENSITIVE_WORDS.has(w))) return true;
  return SENSITIVE_WORDS.has(words.join(''));
}

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const IPV4_RE = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
const ID_NUMBER_RE = /\b\d{6,12}\b/g;
const LABELED_RE = /\b(password|passwd|pwd|clave|contrase(?:ñ|n)a|token|secret|authorization|cookie|ip|address|direcci(?:ó|o)n|documento|c(?:é|e)dula|email|correo|tel(?:é|e)fono|celular)\s*[:=]\s*[^\s,;]+/gi;

function maskText(value) {
  return String(value)
    .replace(LABELED_RE, '$1: [oculto]')
    .replace(EMAIL_RE, '[correo oculto]')
    .replace(IPV4_RE, '[ip oculta]')
    .replace(ID_NUMBER_RE, '[número oculto]');
}

function sanitizeValue(item) {
  if (Array.isArray(item)) return item.slice(0, 20).map(sanitizeValue);
  if (item && typeof item === 'object') {
    const clean = {};
    Object.entries(item).forEach(([key, nested]) => {
      if (!isSensitiveKey(key)) clean[key] = sanitizeValue(nested);
    });
    return clean;
  }
  return typeof item === 'string' ? maskText(item.slice(0, 300)) : item;
}

function safeDetails(value) {
  if (!value) return null;
  let parsed = value;
  if (typeof value === 'string') {
    try { parsed = JSON.parse(value); } catch {
      return maskText(value.slice(0, 500));
    }
  }
  if (!parsed || typeof parsed !== 'object') return maskText(String(parsed).slice(0, 500));
  return sanitizeValue(parsed);
}

module.exports = { safeDetails, isSensitiveKey, maskText };
