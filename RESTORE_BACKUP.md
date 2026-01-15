# Restaurar backup y actualizar despliegue

## Restaurar backup de Postgres
1. Copia tu archivo de backup (ej: `backup.sql`) al servidor.
2. Detén servicios que escriban en la base de datos:
   ```bash
   docker compose -f docker-compose.prod.yml stop backend ia-panel
   ```
3. Restaura el backup:
   ```bash
   docker compose -f docker-compose.prod.yml exec -T postgres psql -U $DB_USER -d $DB_NAME < backup.sql
   ```
   Ajusta `$DB_USER` y `$DB_NAME` según tu .env.
4. Reinicia los servicios:
   ```bash
   docker compose -f docker-compose.prod.yml start backend ia-panel
   ```

## Actualizar el proyecto (pull + rebuild)
1. Haz pull de la última versión:
   ```bash
   git pull origin main
   ```
2. Reconstruye y reinicia los servicios:
   ```bash
   docker compose -f docker-compose.prod.yml build
   docker compose -f docker-compose.prod.yml up -d
   ```
3. (Opcional) Ejecuta migraciones si hay cambios en modelos:
   ```bash
   docker compose -f docker-compose.prod.yml exec backend node src/migrate.js
   ```

## Rotar JWT_SECRET
1. Cambia el valor en `.env` y reinicia backend.
2. Todos los tokens previos quedarán inválidos. Considera limpiar la tabla `RefreshTokens` si es necesario.

## Notas
- Nunca subas backups ni .env al repo.
- Haz backup antes de actualizar o migrar.
