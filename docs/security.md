
# Seguridad y configuración
# Security and Configuration

---

## Variables críticas
## Critical Variables
- `JWT_SECRET` (obligatorio en prod). Fallback `supersecret` solo para dev → cambiar.  
	`JWT_SECRET` (required in prod). Fallback `supersecret` only for dev → change it.
- `ACCESS_TOKEN_TTL` (default 15m), `REFRESH_TOKEN_TTL` (default 7d).
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` (backend). Para IA usar `POSTGRES_*`.  
	(backend). For IA use `POSTGRES_*`.
- Frontend: `VITE_API_URL` debe apuntar a backend (HTTPS en Codespaces reescribe host automáticamente).  
	Frontend: `VITE_API_URL` must point to backend (HTTPS in Codespaces auto-rewrites host).

---

## CORS
- `CORS_ALLOW_ALL` por defecto true → acepta cualquier origen. Para prod, poner `false` y definir `CORS_ORIGINS` (lista separada por comas). Codespaces *.app.github.dev está permitido explícitamente.  
	`CORS_ALLOW_ALL` default true → accepts any origin. For prod, set `false` and define `CORS_ORIGINS` (comma-separated list). Codespaces *.app.github.dev is explicitly allowed.

---

## Autorización
## Authorization
- Middleware `auth` valida JWT; `permission` verifica permisos via DB. `SKIP_AUTH=true` salta permisos (solo dev). No usar en prod.  
	`auth` middleware validates JWT; `permission` checks permissions via DB. `SKIP_AUTH=true` skips permissions (dev only). Do not use in prod.
- Rate limit: 100 req / 15m por IP (`src/middleware/rateLimit.js`).  
	100 req / 15m per IP (`src/middleware/rateLimit.js`).

---

## Políticas de credenciales
## Credential Policies
- Contraseña requerida con minúscula, mayúscula, dígito y símbolo (backend valida regex). No reutilizar contraseñas (el seed rechaza password duplicada, pero no compara hashes previos más allá de igualdad).  
	Password required with lowercase, uppercase, digit, and symbol (backend validates regex). Do not reuse passwords (seed rejects duplicate password, but does not compare previous hashes beyond equality).
- Seeds crean `admin@demo.com` con contraseña `password` (hash). Cambiar en producción o deshabilitar seed.  
	Seeds create `admin@demo.com` with password `password` (hash). Change in production or disable seed.

---

## Base de datos
## Database
- En Docker, Postgres no expone puerto 5432 por defecto. Solo abrir en dev local si es necesario.  
	In Docker, Postgres does not expose port 5432 by default. Only open in local dev if needed.
- Volumen `pgdata` mantiene datos. Hacer backups antes de alteraciones.  
	`pgdata` volume keeps data. Make backups before changes.

---

## Servicio IA
## IA Service
- Flask `/ia-panel` sin autenticación propia; se expone tras backend proxy. No publicar directamente sin red interna o auth adicional.  
	Flask `/ia-panel` has no own auth; exposed behind backend proxy. Do not publish directly without internal network or extra auth.

---

## Logs y auditoría
## Logs and Audit
- AuditLog captura acciones exitosas y accesos fallidos (401/403). Revisar para monitoreo.  
	AuditLog captures successful actions and failed accesses (401/403). Review for monitoring.

---

## Recomendaciones rápidas prod
## Quick Prod Recommendations
- Establecer `JWT_SECRET`, `CORS_ALLOW_ALL=false`, `CORS_ORIGINS=<dominios>`, `SKIP_AUTH=false`.  
	Set `JWT_SECRET`, `CORS_ALLOW_ALL=false`, `CORS_ORIGINS=<domains>`, `SKIP_AUTH=false`.
- Rotar `JWT_SECRET` con cuidado (invalidará tokens). Limpiar refresh tokens si rota.  
	Rotate `JWT_SECRET` carefully (will invalidate tokens). Clean refresh tokens if rotated.
- Habilitar HTTPS en frontend/backend (reverse proxy) y secure cookies si se usan.  
	Enable HTTPS in frontend/backend (reverse proxy) and secure cookies if used.
