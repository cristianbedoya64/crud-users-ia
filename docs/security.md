
# 🔒 Seguridad y Configuración / Security & Configuration

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: detalla controles de seguridad, variables críticas y recomendaciones de despliegue seguro del sistema.

---

## 🎓 Contexto Académico y Destinatario / Academic Context & Audience
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este documento soporta la evaluación del proyecto de grado (Universidad Santiago de Cali) evidenciando decisiones de seguridad (JWT, RBAC, CORS, rate limiting, auditoría) y pautas para despliegue responsable.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This document supports academic evaluation by detailing security decisions (JWT, RBAC, CORS, rate limiting, auditing) and safe deployment guidelines.

---

## 🧪 Variables Críticas / Critical Variables
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `JWT_SECRET` (obligatorio en prod). El fallback `supersecret` solo aplica en desarrollo: cambiar.
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
- `CORS_ALLOW_ALL` por defecto `true` (acepta cualquier origen).
- Para producción: usar `CORS_ALLOW_ALL=false` y definir `CORS_ORIGINS` (lista separada por comas).
- Codespaces `*.app.github.dev` se permite explícitamente.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `CORS_ALLOW_ALL` defaults to `true` (accepts any origin).
- For production: set `CORS_ALLOW_ALL=false` and define `CORS_ORIGINS` (comma-separated list).
- Codespaces `*.app.github.dev` is explicitly allowed.

---

## 🛡️ Autorización / Authorization
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Middleware `auth` valida JWT; `permission` verifica permisos vía DB.
- `SKIP_AUTH=true` omite permisos (solo dev). No usar en prod.
- Rate limit: 100 req / 15m por IP (`src/middleware/rateLimit.js`).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `auth` middleware validates JWT; `permission` checks permissions via DB.
- `SKIP_AUTH=true` skips permissions (dev only). Do not use in prod.
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
- Flask `/ia-panel` no tiene autenticación propia; se expone detrás del proxy del backend.
- No publicar directamente sin red interna o autenticación adicional.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Flask `/ia-panel` has no own auth; it is exposed behind the backend proxy.
- Do not publish it directly without internal network or additional auth.

---

## 🧾 Logs y Auditoría / Logs & Audit
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- AuditLog captura acciones exitosas y accesos fallidos (401/403) para monitoreo.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- AuditLog captures successful actions and failed accesses (401/403) for monitoring.

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
