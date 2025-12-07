# UARP-AI Backend

Servidor Express conectado a PostgreSQL usando Sequelize.

## Endpoints principales
- `/api/users` CRUD de usuarios
- `/api/roles` CRUD de roles
- `/api/permissions` CRUD de permisos

## Configuración
- Variables en `.env`
- Ejecuta `node src/migrate.js` para migrar modelos
- Ejecuta `node src/server.js` para iniciar el servidor
