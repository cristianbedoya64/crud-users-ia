

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

## Setup / Configuración (local)
1. Copia `.env.example` a `.env` y define `JWT_SECRET` (obligatorio en prod)
2. Instala dependencias: `npm install`
3. Migra DB: `node src/migrate.js` (usa sequelize.sync alter)
4. (Opcional) Seed demo: `node src/seed.js` (crea admin@demo.com / password)
5. Ejecuta: `npm start` (o `node src/server.js`)

### Con Docker Compose
- Desde la raíz: `./start.sh` o `docker-compose up -d` (backend expone 3000)
- Variables se inyectan desde `docker-compose.yml`; ajusta JWT_SECRET/CORS ahí o en App Platform

## Env Vars / Variables de Entorno
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`
- `PORT` (default: 3000)
- `NODE_ENV` (production/development)
- `JWT_SECRET` (obligatorio)
- `ACCESS_TOKEN_TTL` (ej: `15m`)
- `REFRESH_TOKEN_TTL` (ej: `7d`)
- `CORS_ALLOW_ALL` (default true; en prod poner false)
- `CORS_ORIGINS` (csv de dominios permitidos cuando `CORS_ALLOW_ALL=false`)
- `SKIP_AUTH` (solo dev; evita usarlo en prod)
- `IA_PANEL_URL` (default `http://ia-panel:5001/ia-panel`)

## Scripts
- `npm start` — inicia servidor
- `node src/migrate.js` — sincroniza DB
- `node src/seed.js` — crea datos demo

## Dependencies / Dependencias
- express, sequelize, pg, helmet, cors, bcryptjs, jsonwebtoken, express-rate-limit

## Security / Seguridad
- Define `JWT_SECRET` fuerte; desactiva `CORS_ALLOW_ALL` en prod y configura `CORS_ORIGINS`
- No exponer Postgres; usar Managed DB o red privada
- Seeds crean credenciales demo; no usarlas en prod

## Referencias
- API spec: ../../docs/api.md
- DB y migraciones: ../../docs/db.md
- Seguridad: ../../docs/security.md

## Testing
- `npm test` (si hay tests / if available)

## Troubleshooting
- Verifica conexión a DB / Check DB connection
- Revisa logs de errores / Review error logs
