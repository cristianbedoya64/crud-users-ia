
# Backend UARP-AI

API RESTful construida con Node.js, Express y Sequelize (PostgreSQL).

## Estructura
- **src/controllers/**: Lógica de negocio y controladores
- **src/models/**: Modelos Sequelize
- **src/routes/**: Rutas HTTP
- **src/middleware/**: Middlewares de autenticación, permisos y auditoría
- **migrations/**: Scripts de migración de base de datos

## Endpoints principales
- `/api/users`: CRUD de usuarios
- `/api/roles`: CRUD de roles
- `/api/permissions`: CRUD de permisos
- `/api/audit`: Logs y auditoría

## Configuración y uso
1. Copia `.env.example` a `.env` y configura las variables.
2. Instala dependencias: `npm install`
3. Ejecuta migraciones: `node src/migrate.js`
4. (Opcional) Seed inicial: `node src/seed.js`
5. Inicia el servidor: `node src/server.js`

## Dependencias principales
- express
- sequelize
- pg

Consulta los README de cada subcarpeta para detalles específicos.
