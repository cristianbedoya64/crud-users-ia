
# 🗄️ Base de Datos / Database

> **Trabajo de Grado – Facultad de Ingeniería**<br>
> **Universidad Santiago de Cali**<br>
> **Enfoque:** propuesta de investigación aplicada con IA para scoring de riesgo.<br>
>
> Documento técnico orientado a evaluación académica: describe el modelo de datos (PostgreSQL/Sequelize), entidades, relaciones y procedimientos de migración/seed para validar el alcance del sistema.
---

## 🎓 Contexto Académico / Academic Context
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Esta guía respalda la evaluación del trabajo de grado y permite verificar consistencia entre modelo de datos, funcionalidad y seguridad (RBAC, auditoría, tokens).

---

## 🧭 Enfoque de investigación (problema → solución → valor)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
La seguridad en el registro de usuarios requiere complementar RBAC con modelos predictivos de riesgo. El modelo de datos actual soporta auditoría y control de acceso, y sirve como base para el microservicio de scoring con IA en la fase de grado.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
Secure and efficient management of users, roles, and auditing is a key challenge in modern enterprise systems, where traceability and access control are critical for trust and compliance. This project integrates robust authentication, granular permission control, and an AI panel for analysis, addressing common limitations of generic solutions. Modular architecture, audit logging, and AI integration provide differential value, enabling adaptability, transparency, and strong academic defense before evaluators.

<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This guide supports the academic evaluation of the graduation project and allows judges to validate consistency between the data model, functionality, and security (RBAC, auditing, tokens).

---

## 🧱 Entidades Principales / Main Entities
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Users**: `id`, `documentId` (único), `name`, `email` (único), `password` (bcrypt), `status` ENUM(active/inactive), `createdAt/updatedAt`, `createdBy/updatedBy`
- **Roles**: `id`, `name` (único), `description`, `createdAt/updatedAt`
- **Permissions**: `id`, `name` (único), `description`, `createdAt/updatedAt`
- **UserRoles**: `userId` → `roleId` (N:M)
- **RolePermissions**: `roleId` → `permissionId` (N:M)
- **RefreshTokens**: `id`, `tokenHash` (único), `expiresAt`, `revokedAt`, `userId`, timestamps
- **AuditLogs**: `id`, `userId`, `action`, `details`, `createdBy`, `createdAt/updatedAt`
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Users**: `id`, `documentId` (unique), `name`, `email` (unique), `password` (bcrypt), `status` ENUM(active/inactive), `createdAt/updatedAt`, `createdBy/updatedBy`
- **Roles**: `id`, `name` (unique), `description`, `createdAt/updatedAt`
- **Permissions**: `id`, `name` (unique), `description`, `createdAt/updatedAt`
- **UserRoles**: `userId` → `roleId` (N:M)
- **RolePermissions**: `roleId` → `permissionId` (N:M)
- **RefreshTokens**: `id`, `tokenHash` (unique), `expiresAt`, `revokedAt`, `userId`, timestamps
- **AuditLogs**: `id`, `userId`, `action`, `details`, `createdBy`, `createdAt/updatedAt`

---

## 🔗 Relaciones / Relationships
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- User → Role (N:M) vía **UserRoles**
- Role → Permission (N:M) vía **RolePermissions**
- User 1:N **RefreshTokens**
- User 1:N **AuditLogs**
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- User → Role (N:M) via **UserRoles**
- Role → Permission (N:M) via **RolePermissions**
- User 1:N **RefreshTokens**
- User 1:N **AuditLogs**

---

## 🧬 Migraciones y Seed / Migrations & Seeding
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Carpeta activa: `backend/migrations/`.
- `backend/src/migrate.js` permite `sync/alter` solo fuera de producción. En producción se deben usar migraciones.
- `MIGRATE_MODE=sync` habilita sync en entornos no productivos; por defecto en producción es `migrations`.
- La carpeta raíz `migrations/` puede contener duplicados; para coherencia se recomienda la de `backend/`.
- Seed: `node backend/src/seed.js`.
	- `SEED_MODE=demo` crea usuarios demo (admin/usuariodemo y dataset de ejemplo).
	- `SEED_MODE=prod` solo crea roles/permisos base (sin usuarios demo).
	- `SEED_ALLOW_SYNC=true` permite `sequelize.sync()` solo en entornos no productivos.
	- Contraseña demo: `Password1!`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Active folder: `backend/migrations/`.
- `backend/src/migrate.js` allows `sync/alter` only outside production. Production must use migrations.
- `MIGRATE_MODE=sync` enables sync in non‑production; production defaults to `migrations`.
- Root `migrations/` may contain duplicates; for consistency, prefer `backend/`.
- Seed: `node backend/src/seed.js`.
	- `SEED_MODE=demo` creates demo users (admin/usuariodemo and sample dataset).
	- `SEED_MODE=prod` creates only base roles/permissions (no demo users).
	- `SEED_ALLOW_SYNC=true` allows `sequelize.sync()` only in non‑production.
	- Demo password: `Password1!`.

---

## 🧪 Pasos Locales (sin Docker) / Local Steps (without Docker)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
1. Configura `.env` en `backend/` con `DB_*` y `JWT_SECRET`.
2. Ejecuta migración: `node backend/src/migrate.js`.
3. (Opcional) Ejecuta seed demo: `SEED_MODE=demo node backend/src/seed.js`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
1. Set up `backend/.env` with `DB_*` and `JWT_SECRET`.
2. Run migration: `node backend/src/migrate.js`.
3. (Optional) Run demo seed: `SEED_MODE=demo node backend/src/seed.js`.

---

## 🐳 Docker Compose / Docker Compose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- La DB se crea con credenciales de `docker-compose.yml` (`POSTGRES_*`).
- El backend arranca; usar migraciones para producción y ejecutar seed demo manualmente si se requieren datos de prueba.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- DB is created with credentials from `docker-compose.yml` (`POSTGRES_*`).
- Backend starts; use migrations in production and run demo seed manually if test data is needed.

---

## 📝 Notas / Notes
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Los refresh tokens se almacenan como hash (sha256) y se rotan; `revokedAt` marca invalidación.
- AuditLogs registran acciones exitosas y accesos fallidos (middleware).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Refresh tokens are stored as sha256 hashes and rotated; `revokedAt` marks invalidation.
- AuditLogs record successful actions and failed accesses (middleware).
