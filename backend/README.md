

# Backend (Node.js/Express) - UARP-AI

## Overview / Visión General
API RESTful para gestión de usuarios, roles, permisos y auditoría. Conexión a PostgreSQL y soporte para autenticación, autorización y logs.

## Features / Características
- CRUD de usuarios, roles, permisos
- Autenticación JWT con refresh tokens y rotación
- Autorización por permisos (RBAC)
- Auditoría de acciones
- Integración con IA (servicio externo)

### Permisos estándar (matriz base)
- `create_user`, `read_user`, `update_user`, `delete_user`
- `manage_roles` (roles, permisos, asignaciones)
- `view_audit` (consultar auditoría)

## Structure / Estructura
- **src/controllers/**: Business logic / Lógica de negocio
- **src/models/**: Sequelize models
- **src/routes/**: HTTP routes
- **src/middleware/**: Auth, permissions, audit
- **migrations/**: DB migration scripts

## Main Endpoints / Endpoints principales
- `/api/auth/login` | `/api/auth/refresh` | `/api/auth/logout`: flujo de autenticación JWT + refresh
- `/api/users`: User CRUD (protegido por auth + permisos)
- `/api/roles`: Role CRUD + asignación de permisos (protegido)
- `/api/permissions`: Permission CRUD (protegido)
- `/api/audit`: Audit logs (protegido, requiere `view_audit`)

## Setup / Configuración
1. Copy `.env.example` to `.env` and set variables / Copia `.env.example` a `.env` y configura las variables (define `JWT_SECRET`).
2. Install dependencies: `npm install`
3. Run migrations: `node src/migrate.js` (incluye RefreshTokens y campos de auditoría)
4. (Optional) Seed: `node src/seed.js`
5. Start: `node src/server.js`

## Env Vars / Variables de Entorno
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`
- `PORT` (default: 3000)
- `NODE_ENV` (production/development)
- `JWT_SECRET` (obligatorio en producción)
- `ACCESS_TOKEN_TTL` (ej: `15m` por defecto)
- `REFRESH_TOKEN_TTL` (ej: `7d` por defecto)

## Dependencies / Dependencias
- express
- sequelize
- pg

## Security / Seguridad
- CORS restringido a dominios permitidos
- No exponer credenciales en el repo
- Revisar logs y errores en producción

## Testing
- `npm test` (si hay tests / if available)

## Troubleshooting
- Verifica conexión a DB / Check DB connection
- Revisa logs de errores / Review error logs
