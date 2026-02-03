
# 🔒 Seguridad y Configuración / Security & Configuration

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: detalla controles de seguridad, variables críticas y recomendaciones de despliegue seguro del sistema.
---

## 🎓 Contexto Académico y Destinatario / Academic Context & Audience
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este documento soporta la evaluación del proyecto de grado (Universidad Santiago de Cali) evidenciando decisiones de seguridad (JWT, RBAC, CORS, rate limiting, auditoría) y pautas para despliegue responsable.

---

## 🧭 Alcance, narrativa y rúbrica (problema → solución → valor)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
La gestión segura y eficiente de usuarios, roles y auditoría es un reto clave en sistemas empresariales modernos, donde la trazabilidad y el control de acceso son críticos para la confianza y el cumplimiento. Este proyecto integra autenticación robusta, control granular de permisos y un panel de IA para análisis, resolviendo limitaciones comunes de soluciones genéricas. La arquitectura modular, el registro de auditoría y la integración de IA aportan valor diferencial, facilitando la adaptabilidad, la transparencia y la defensa académica ante jueces evaluadores.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
Secure and efficient management of users, roles, and auditing is a key challenge in modern enterprise systems, where traceability and access control are critical for trust and compliance. This project integrates robust authentication, granular permission control, and an AI panel for analysis, addressing common limitations of generic solutions. Modular architecture, audit logging, and AI integration provide differential value, enabling adaptability, transparency, and strong academic defense before evaluators.

---

## 🧪 Variables Críticas / Critical Variables
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `JWT_SECRET` es obligatorio en producción. No se permite fallback inseguro.
- `ACCESS_TOKEN_TTL` (default 15m), `REFRESH_TOKEN_TTL` (default 7d).
- Backend DB: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`. Para IA usar `POSTGRES_*`.
- Frontend: `VITE_API_URL` debe apuntar al backend (en Codespaces el host HTTPS puede reescribirse automáticamente).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `JWT_SECRET` (required in prod). The `supersecret` fallback is dev-only: change it.
- `ACCESS_TOKEN_TTL` (default 15m), `REFRESH_TOKEN_TTL` (default 7d).
- Backend DB: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`. For IA use `POSTGRES_*`.
- Frontend: `VITE_API_URL` must point to the backend (in Codespaces the HTTPS host may be auto-rewritten).

---

## 🌐 CORS
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- En producción, `CORS_ALLOW_ALL` debe ser `false` y se requiere `CORS_ORIGINS` explícito (lista separada por comas).
- Codespaces `*.app.github.dev` se permite explícitamente.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- In production, `CORS_ALLOW_ALL` must be `false` and `CORS_ORIGINS` is required (comma-separated list).
- Codespaces `*.app.github.dev` is explicitly allowed.

---

## 🛡️ Autorización / Authorization
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Middleware `auth` valida JWT; `permission` verifica permisos vía DB.
- `SKIP_AUTH=true` solo tiene efecto fuera de producción; en producción se ignora.
- Rate limit: 100 req / 15m por IP (`src/middleware/rateLimit.js`).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `auth` middleware validates JWT; `permission` checks permissions via DB.
- `SKIP_AUTH=true` only works outside production; it is ignored in production.
- Rate limit: 100 req / 15m per IP (`src/middleware/rateLimit.js`).

---

## 🔑 Políticas de Credenciales / Credential Policies
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- La contraseña requiere minúscula, mayúscula, dígito y símbolo (validación por regex).
- Evitar reutilización de contraseñas (en seed se rechaza duplicación directa).
- Seeds crean `admin@demo.com` con contraseña `password` (hash). Cambiar en producción o deshabilitar seed.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Password requires lowercase, uppercase, digit, and symbol (regex validation).
- Avoid password reuse (seed rejects direct duplicates).
- Seeds create `admin@demo.com` with password `password` (hash). Change in production or disable seed.

---

## 🗄️ Base de Datos / Database
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- En Docker, Postgres no expone 5432 por defecto; abrir solo en dev si se requiere.
- El volumen `pgdata` mantiene datos; hacer backups antes de alteraciones.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- In Docker, Postgres does not expose 5432 by default; open it only for dev if needed.
- `pgdata` volume persists data; back up before changes.

---

## 🤖 Servicio IA / IA Service
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Postura: la IA es asistente/demo para análisis, no motor de decisiones de acceso.
- Flask `/ia-panel` no tiene autenticación propia; se consume vía backend (proxy) en red interna.
- No publicar directamente sin red interna o controles adicionales.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Posture: AI is an assistant/demo for analysis, not an access decision engine.
- Flask `/ia-panel` has no own auth; it is consumed via the backend proxy on the internal network.
- Do not publish it directly without internal network or additional controls.

---

## ⚠️ Amenaza → Mitigación (IA) / Threat → Mitigation (AI)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Amenaza:** Exposición pública directa del microservicio IA podría permitir consultas no autorizadas y fuga de señales del modelo.
- **Mitigación:** El servicio IA no expone puerto público por defecto y sólo se consume vía backend (proxy) dentro de la red interna.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Threat:** Direct public exposure of the AI microservice could allow unauthorized queries and model signal leakage.
- **Mitigation:** The AI service does not expose a public port by default and is only consumed via the backend proxy on the internal network.

---

## 🧾 Logs y Auditoría / Logs & Audit
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- AuditLog captura acciones exitosas y accesos fallidos (401/403) para monitoreo.
- No se deben registrar contraseñas ni tokens en logs.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- AuditLog captures successful actions and failed accesses (401/403) for monitoring.
- Passwords and tokens must never be logged.

---

## ✅ Recomendaciones Rápidas para Producción / Quick Production Recommendations
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Establecer `JWT_SECRET`, `CORS_ALLOW_ALL=false`, `CORS_ORIGINS=<dominios>`, `SKIP_AUTH=false`.
- Rotar `JWT_SECRET` con cuidado (invalidará tokens); considerar limpieza de refresh tokens si aplica.
- Habilitar HTTPS para frontend/backend (reverse proxy) y asegurar cookies si se utilizan.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Set `JWT_SECRET`, `CORS_ALLOW_ALL=false`, `CORS_ORIGINS=<domains>`, `SKIP_AUTH=false`.
- Rotate `JWT_SECRET` carefully (invalidates tokens); consider cleaning refresh tokens if needed.
- Enable HTTPS for frontend/backend (reverse proxy) and secure cookies if used.
