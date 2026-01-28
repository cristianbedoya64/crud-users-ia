
# Backend (Node.js/Express) - UARP-AI
# Backend (Node.js/Express) - UARP-AI

---

## Visión General
## Overview
API RESTful para gestión de usuarios, roles, permisos y auditoría. Conexión a PostgreSQL y soporte para autenticación, autorización y logs.
RESTful API for user, role, permission, and audit management. Connects to PostgreSQL and supports authentication, authorization, and logging.

---

## Características
## Features
- CRUD de usuarios, roles, permisos  
	User, role, and permission CRUD
- Autenticación JWT con refresh tokens y rotación  
	JWT authentication with refresh tokens and rotation
- Autorización por permisos (RBAC)  
	Permission-based authorization (RBAC)
- Auditoría de acciones  
	Action auditing
- Integración con IA (servicio externo)  
	IA integration (external service)

### Permisos estándar (matriz base)
### Standard Permissions (base matrix)
- `create_user`, `read_user`, `update_user`, `delete_user`
- `manage_roles` (roles, permisos, asignaciones)  
	(roles, permissions, assignments)
- `view_audit` (consultar auditoría)  
	(view audit)

---

## Estructura
## Structure
- **src/controllers/**: Lógica de negocio  
	Business logic
- **src/models/**: Modelos Sequelize  
	Sequelize models
- **src/routes/**: Rutas HTTP  
	HTTP routes
- **src/middleware/**: Auth, permisos, auditoría  
	Auth, permissions, audit
- **migrations/**: Scripts de migración DB  
	DB migration scripts

---

## Endpoints principales
## Main Endpoints
- `/api/auth/login` | `/api/auth/refresh` | `/api/auth/logout`: flujo de autenticación JWT + refresh  
	JWT + refresh authentication flow
- `/api/users`: CRUD de usuarios (protegido por auth + permisos)  
	User CRUD (protected by auth + permissions)
- `/api/roles`: CRUD de roles + asignación de permisos (protegido)  
	Role CRUD + permission assignment (protected)
- `/api/permissions`: CRUD de permisos (protegido)  
	Permission CRUD (protected)
- `/api/audit`: Logs de auditoría (protegido, requiere `view_audit`)  
	Audit logs (protected, requires `view_audit`)

---

## Configuración (local)
## Setup (local)
1. Copia `.env.example` a `.env` y define `JWT_SECRET` (obligatorio en prod)  
	 Copy `.env.example` to `.env` and set `JWT_SECRET` (required in prod)
2. Instala dependencias: `npm install`  
	 Install dependencies: `npm install`
3. Migra DB: `node src/migrate.js` (usa sequelize.sync alter)  
	 Migrate DB: `node src/migrate.js` (uses sequelize.sync alter)
4. (Opcional) Seed demo: `node src/seed.js` (crea admin@demo.com / password)  
	 (Optional) Demo seed: `node src/seed.js` (creates admin@demo.com / password)
5. Ejecuta: `npm start` (o `node src/server.js`)  
	 Run: `npm start` (or `node src/server.js`)

### Con Docker Compose
### With Docker Compose
- Desde la raíz: `./scripts/start.sh` o `docker-compose up -d` (backend expone 3000)  
	From root: `./scripts/start.sh` or `docker-compose up -d` (backend exposes 3000)
- Variables se inyectan desde `docker-compose.yml`; ajusta JWT_SECRET/CORS ahí o en App Platform  
	Variables injected from `docker-compose.yml`; adjust JWT_SECRET/CORS there or in App Platform

---

## Variables de Entorno
## Env Vars
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`
- `PORT` (default: 3000)
- `NODE_ENV` (production/development)
- `JWT_SECRET` (obligatorio)  
	(required)
- `ACCESS_TOKEN_TTL` (ej: `15m`)
- `REFRESH_TOKEN_TTL` (ej: `7d`)
- `CORS_ALLOW_ALL` (default true; en prod poner false)  
	(default true; set false in prod)
- `CORS_ORIGINS` (csv de dominios permitidos cuando `CORS_ALLOW_ALL=false`)  
	(allowed domains CSV when `CORS_ALLOW_ALL=false`)
- `SKIP_AUTH` (solo dev; evita usarlo en prod)  
	(dev only; avoid in prod)
- `IA_PANEL_URL` (default `http://ia-panel:5001/ia-panel`)

---

## Scripts
- `npm start` — inicia servidor  
	starts server
- `node src/migrate.js` — sincroniza DB  
	syncs DB
- `node src/seed.js` — crea datos demo  
	creates demo data

---

## Dependencias
## Dependencies
- express, sequelize, pg, helmet, cors, bcryptjs, jsonwebtoken, express-rate-limit

---

## Seguridad
## Security
- Define `JWT_SECRET` fuerte; desactiva `CORS_ALLOW_ALL` en prod y configura `CORS_ORIGINS`  
	Use strong `JWT_SECRET`; disable `CORS_ALLOW_ALL` in prod and set `CORS_ORIGINS`
- No exponer Postgres; usar Managed DB o red privada  
	Do not expose Postgres; use Managed DB or private network
- Seeds crean credenciales demo; no usarlas en prod  
	Seeds create demo credentials; do not use in prod

---

## Referencias
## References
- API spec: ../../docs/api.md
- DB y migraciones: ../../docs/db.md  
	DB and migrations: ../../docs/db.md
- Seguridad: ../../docs/security.md  
	Security: ../../docs/security.md

---

## Testing
- `npm test` (si hay tests / if available)  
	(if available)

---

## Troubleshooting
- Verifica conexión a DB / Check DB connection
- Revisa logs de errores / Review error logs
