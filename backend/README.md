

# Backend (Node.js/Express) - UARP-AI

## Overview / Visión General
API RESTful para gestión de usuarios, roles, permisos y auditoría. Conexión a PostgreSQL y soporte para autenticación, autorización y logs.

## Features / Características
- CRUD de usuarios, roles, permisos
- Middleware de autenticación y autorización
- Auditoría de acciones
- Integración con IA (servicio externo)

## Structure / Estructura
- **src/controllers/**: Business logic / Lógica de negocio
- **src/models/**: Sequelize models
- **src/routes/**: HTTP routes
- **src/middleware/**: Auth, permissions, audit
- **migrations/**: DB migration scripts

## Main Endpoints / Endpoints principales
- `/api/users`: User CRUD
- `/api/roles`: Role CRUD
- `/api/permissions`: Permission CRUD
- `/api/audit`: Audit logs

## Setup / Configuración
1. Copy `.env.example` to `.env` and set variables / Copia `.env.example` a `.env` y configura las variables
2. Install dependencies: `npm install`
3. Run migrations: `node src/migrate.js`
4. (Optional) Seed: `node src/seed.js`
5. Start: `node src/server.js`

## Env Vars / Variables de Entorno
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`
- `PORT` (default: 3000)
- `NODE_ENV` (production/development)

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
