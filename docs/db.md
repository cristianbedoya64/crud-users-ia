# Base de datos

PostgreSQL con Sequelize. Tablas principales y relaciones.

## Entidades
- Users: id, documentId (único), name, email (único), password (bcrypt), status ENUM(active/inactive), createdAt/updatedAt, createdBy/updatedBy
- Roles: id, name (único), description, createdAt/updatedAt
- Permissions: id, name (único), description, createdAt/updatedAt
- UserRoles: userId ↔ roleId (N:M)
- RolePermissions: roleId ↔ permissionId (N:M)
- RefreshTokens: id, tokenHash (único), expiresAt, revokedAt, userId, timestamps
- AuditLogs: id, userId, action, details, createdBy, createdAt/updatedAt

## Relaciones
- User ↔ Role (N:M) vía UserRoles
- Role ↔ Permission (N:M) vía RolePermissions
- User 1:N RefreshTokens
- User 1:N AuditLogs

## Migraciones y seeds
- Carpeta activa: `backend/migrations/` (usar `backend/src/migrate.js` con `sequelize.sync({ alter: true })`).
- Carpeta raíz `migrations/` contiene duplicados; preferir la de `backend/` para coherencia.
- Seed: `node backend/src/seed.js` (crea roles base, permisos base, admin demo y ~50 usuarios demo). Contraseña demo hash corresponde a `password`.

## Pasos locales (sin Docker)
1. Configura `.env` en `backend/` con DB_* y JWT_SECRET.
2. Ejecuta migración: `node backend/src/migrate.js`.
3. (Opcional) Seed: `node backend/src/seed.js`.

## Pasos con Docker Compose
- DB se crea con credenciales de `docker-compose.yml` (POSTGRES_*).
- Backend arranca y sincroniza modelos al conectar (usa sync); ejecutar seed manualmente si se requiere datos demo.

## Notas
- Refresh tokens se almacenan con hash (sha256) y tienen rotación; campo revokedAt marca invalidación.
- AuditLogs registran acciones exitosas y accesos fallidos (middleware).
