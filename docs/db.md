
# Base de datos
# Database

---

PostgreSQL con Sequelize. Tablas principales y relaciones.
PostgreSQL with Sequelize. Main tables and relationships.

---

## Entidades
## Entities
- Users: id, documentId (único), name, email (único), password (bcrypt), status ENUM(active/inactive), createdAt/updatedAt, createdBy/updatedBy  
	Users: id, documentId (unique), name, email (unique), password (bcrypt), status ENUM(active/inactive), createdAt/updatedAt, createdBy/updatedBy
- Roles: id, name (único), description, createdAt/updatedAt  
	Roles: id, name (unique), description, createdAt/updatedAt
- Permissions: id, name (único), description, createdAt/updatedAt  
	Permissions: id, name (unique), description, createdAt/updatedAt
- UserRoles: userId → roleId (N:M)  
	UserRoles: userId → roleId (N:M)
- RolePermissions: roleId → permissionId (N:M)  
	RolePermissions: roleId → permissionId (N:M)
- RefreshTokens: id, tokenHash (único), expiresAt, revokedAt, userId, timestamps  
	RefreshTokens: id, tokenHash (unique), expiresAt, revokedAt, userId, timestamps
- AuditLogs: id, userId, action, details, createdBy, createdAt/updatedAt  
	AuditLogs: id, userId, action, details, createdBy, createdAt/updatedAt

---

## Relaciones
## Relationships
- User → Role (N:M) vía UserRoles  
	User → Role (N:M) via UserRoles
- Role → Permission (N:M) vía RolePermissions  
	Role → Permission (N:M) via RolePermissions
- User 1:N RefreshTokens  
	User 1:N RefreshTokens
- User 1:N AuditLogs  
	User 1:N AuditLogs

---

## Migraciones y seeds
## Migrations and seeds
- Carpeta activa: `backend/migrations/` (usar `backend/src/migrate.js` con `sequelize.sync({ alter: true })`).  
	Active folder: `backend/migrations/` (use `backend/src/migrate.js` with `sequelize.sync({ alter: true })`).
- Carpeta raíz `migrations/` contiene duplicados; preferir la de `backend/` para coherencia.  
	Root folder `migrations/` contains duplicates; prefer `backend/` for consistency.
- Seed: `node backend/src/seed.js` (crea roles base, permisos base, admin demo y ~50 usuarios demo). Contraseña demo hash corresponde a `password`.  
	Seed: `node backend/src/seed.js` (creates base roles, base permissions, demo admin and ~50 demo users). Demo password hash matches `password`.

---

## Pasos locales (sin Docker)
## Local steps (without Docker)
1. Configura `.env` en `backend/` con DB_* y JWT_SECRET.  
	 Set up `.env` in `backend/` with DB_* and JWT_SECRET.
2. Ejecuta migración: `node backend/src/migrate.js`.  
	 Run migration: `node backend/src/migrate.js`.
3. (Opcional) Seed: `node backend/src/seed.js`.  
	 (Optional) Seed: `node backend/src/seed.js`.

---

## Pasos con Docker Compose
## Steps with Docker Compose
- DB se crea con credenciales de `docker-compose.yml` (POSTGRES_*).  
	DB is created with credentials from `docker-compose.yml` (POSTGRES_*).
- Backend arranca y sincroniza modelos al conectar (usa sync); ejecutar seed manualmente si se requiere datos demo.  
	Backend starts and syncs models on connect (uses sync); run seed manually if demo data is needed.

---

## Notas
## Notes
- Refresh tokens se almacenan con hash (sha256) y tienen rotación; campo revokedAt marca invalidación.  
	Refresh tokens are stored as hash (sha256) and are rotated; revokedAt field marks invalidation.
- AuditLogs registran acciones exitosas y accesos fallidos (middleware).  
	AuditLogs record successful actions and failed accesses (middleware).
