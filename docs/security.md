# Seguridad y configuración

## Variables críticas
- `JWT_SECRET` (obligatorio en prod). Fallback `supersecret` solo para dev → cambiar.
- `ACCESS_TOKEN_TTL` (default 15m), `REFRESH_TOKEN_TTL` (default 7d).
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` (backend). Para IA usar `POSTGRES_*`.
- Frontend: `VITE_API_URL` debe apuntar a backend (HTTPS en Codespaces reescribe host automáticamente).

## CORS
- `CORS_ALLOW_ALL` por defecto true → acepta cualquier origen. Para prod, poner `false` y definir `CORS_ORIGINS` (lista separada por comas). Codespaces *.app.github.dev está permitido explícitamente.

## Autorización
- Middleware `auth` valida JWT; `permission` verifica permisos via DB. `SKIP_AUTH=true` salta permisos (solo dev). No usar en prod.
- Rate limit: 100 req / 15m por IP (`src/middleware/rateLimit.js`).

## Políticas de credenciales
- Contraseña requerida con minúscula, mayúscula, dígito y símbolo (backend valida regex). No reutilizar contraseñas (el seed rechaza password duplicada, pero no compara hashes previos más allá de igualdad).
- Seeds crean `admin@demo.com` con contraseña `password` (hash). Cambiar en producción o deshabilitar seed.

## Base de datos
- En Docker, Postgres no expone puerto 5432 por defecto. Solo abrir en dev local si es necesario.
- Volumen `pgdata` mantiene datos. Hacer backups antes de alteraciones.

## Servicio IA
- Flask `/ia-panel` sin autenticación propia; se expone tras backend proxy. No publicar directamente sin red interna o auth adicional.

## Logs y auditoría
- AuditLog captura acciones exitosas y accesos fallidos (401/403). Revisar para monitoreo.

## Recomendaciones rápidas prod
- Establecer `JWT_SECRET`, `CORS_ALLOW_ALL=false`, `CORS_ORIGINS=<dominios>`, `SKIP_AUTH=false`.
- Rotar `JWT_SECRET` con cuidado (invalidará tokens). Limpiar refresh tokens si rota.
- Habilitar HTTPS en frontend/backend (reverse proxy) y secure cookies si se usan.
