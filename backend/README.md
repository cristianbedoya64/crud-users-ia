
# 🧩 Backend (Node.js/Express) — UARP-AI / Backend (Node.js/Express) — UARP-AI

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: presenta el backend (API, seguridad, auditoría y RBAC) y los pasos para reproducirlo.

---

## 🎓 Contexto Académico y Propósito / Academic Context & Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este módulo implementa la capa de servicios y control de acceso (auth/RBAC/auditoría), evidenciando criterios de seguridad y trazabilidad esperables en un sistema corporativo.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This module implements the services layer and access control (auth/RBAC/audit), providing security and traceability expected in a corporate-grade system.

---

## 🧭 Visión General / Overview
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** API RESTful para gestión de usuarios, roles, permisos y auditoría. Conecta a PostgreSQL y soporta autenticación/autorización y registro de eventos.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** RESTful API for users/roles/permissions/auditing. Connects to PostgreSQL and supports authentication/authorization and event logging.

---

## ✨ Características / Features
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- CRUD de usuarios, roles y permisos
- JWT + refresh tokens (rotación)
- Autorización por permisos (RBAC)
- Auditoría de acciones
- Integración con IA (servicio externo)
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Users/roles/permissions CRUD
- JWT + refresh tokens (rotation)
- Permission-based authorization (RBAC)
- Action auditing
- AI integration (external service)

---

## 🧾 Permisos Estándar (Matriz Base) / Standard Permissions (Base Matrix)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `create_user`, `read_user`, `update_user`, `delete_user`
- `manage_roles` (roles, permisos, asignaciones)
- `view_audit` (consultar auditoría)
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `create_user`, `read_user`, `update_user`, `delete_user`
- `manage_roles` (roles, permissions, assignments)
- `view_audit` (view audit)

---

## 🧱 Estructura / Structure
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `src/controllers/`: lógica por módulo
- `src/models/`: modelos Sequelize
- `src/routes/`: rutas HTTP
- `src/middleware/`: auth, permisos, auditoría
- `migrations/`: scripts de migración
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `src/controllers/`: module logic
- `src/models/`: Sequelize models
- `src/routes/`: HTTP routes
- `src/middleware/`: auth, permissions, audit
- `migrations/`: migration scripts

---

## 🌐 Endpoints Principales / Main Endpoints
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `/api/auth/login` · `/api/auth/refresh` · `/api/auth/logout`
- `/api/users` (protegido por auth + permisos)
- `/api/roles` (protegido)
- `/api/permissions` (protegido)
- `/api/audit` (requiere `view_audit`)
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `/api/auth/login` · `/api/auth/refresh` · `/api/auth/logout`
- `/api/users` (auth + permissions)
- `/api/roles` (protected)
- `/api/permissions` (protected)
- `/api/audit` (requires `view_audit`)

---

## 🛠️ Configuración (Local) / Setup (Local)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
1. Copia `.env.example` a `.env` y define `JWT_SECRET`.
2. Instala dependencias: `npm install`.
3. Migra DB: `node src/migrate.js`.
4. (Opcional) Seed demo: `node src/seed.js`.
5. Ejecuta: `npm start` (o `node src/server.js`).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
1. Copy `.env.example` to `.env` and set `JWT_SECRET`.
2. Install dependencies: `npm install`.
3. Migrate DB: `node src/migrate.js`.
4. (Optional) Demo seed: `node src/seed.js`.
5. Run: `npm start` (or `node src/server.js`).

---

## 🐳 Docker Compose / Docker Compose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Desde la raíz: `./start.sh` o `docker compose up -d`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** From repo root: `./start.sh` or `docker compose up -d`.

---

## 🔧 Variables de Entorno / Env Vars
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `PORT`, `NODE_ENV`, `JWT_SECRET`, `ACCESS_TOKEN_TTL`, `REFRESH_TOKEN_TTL`, `CORS_ALLOW_ALL`, `CORS_ORIGINS`, `SKIP_AUTH`, `IA_PANEL_URL`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `PORT`, `NODE_ENV`, `JWT_SECRET`, `ACCESS_TOKEN_TTL`, `REFRESH_TOKEN_TTL`, `CORS_ALLOW_ALL`, `CORS_ORIGINS`, `SKIP_AUTH`, `IA_PANEL_URL`.

---

## ▶️ Scripts / Scripts
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `npm start` — inicia servidor
- `node src/migrate.js` — sincroniza/migra DB
- `node src/seed.js` — crea datos demo
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `npm start` — starts server
- `node src/migrate.js` — sync/migrate DB
- `node src/seed.js` — creates demo data

---

## 🔐 Seguridad / Security
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Usa un `JWT_SECRET` fuerte; desactiva `CORS_ALLOW_ALL` en producción y define `CORS_ORIGINS`. No expongas Postgres públicamente.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Use a strong `JWT_SECRET`; disable `CORS_ALLOW_ALL` in production and set `CORS_ORIGINS`. Do not expose Postgres publicly.

---

## 🔗 Referencias / References
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** API: [../docs/api.md](../docs/api.md) · DB: [../docs/db.md](../docs/db.md) · Seguridad: [../docs/security.md](../docs/security.md)
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** API: [../docs/api.md](../docs/api.md) · DB: [../docs/db.md](../docs/db.md) · Security: [../docs/security.md](../docs/security.md)

---

## 🧪 Testing y Troubleshooting / Testing & Troubleshooting
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Si existen pruebas, ejecutar `npm test`. Ante fallos, verifica conexión DB y revisa logs del contenedor/proceso.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** If tests exist, run `npm test`. For issues, check DB connectivity and review container/process logs.
