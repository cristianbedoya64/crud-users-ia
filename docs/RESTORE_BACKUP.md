
# 💾 Backup y Restauración / Backup & Restore

> **Trabajo de Grado – Facultad de Ingeniería**<br>
> **Universidad Santiago de Cali**<br>
> **Enfoque:** propuesta de investigación aplicada con IA para scoring de riesgo.<br>
>
> Documento técnico orientado a evaluación académica: define procedimientos reproducibles de restauración y actualización del sistema, evidenciando prácticas de operación segura.

---

## 🎓 Contexto Académico / Academic Context
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Esta guía apoya la evaluación académica del prototipo, permitiendo validar continuidad operativa (backup/restore), mantenimiento y control de cambios.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This guide supports academic evaluation by documenting operational continuity (backup/restore), maintenance, and change control.

---

## 🐘 Restaurar Backup de Postgres / Restore a Postgres Backup
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
1. Copia el archivo de backup (ej: `backup.sql`) al servidor.
2. Detén servicios que escriban en la base de datos:
```bash
docker compose -f docker-compose.prod.yml stop backend ia-panel
```
3. Restaura el backup:
```bash
docker compose -f docker-compose.prod.yml exec -T postgres psql -U $DB_USER -d $DB_NAME < backup.sql
```
4. Reinicia los servicios:
```bash
docker compose -f docker-compose.prod.yml start backend ia-panel
```
Nota: ajusta `$DB_USER` y `$DB_NAME` según tu `.env`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
1. Copy the backup file (e.g., `backup.sql`) to the server.
2. Stop services that write to the database:
```bash
docker compose -f docker-compose.prod.yml stop backend ia-panel
```
3. Restore the backup:
```bash
docker compose -f docker-compose.prod.yml exec -T postgres psql -U $DB_USER -d $DB_NAME < backup.sql
```
4. Start the services again:
```bash
docker compose -f docker-compose.prod.yml start backend ia-panel
```
Note: adjust `$DB_USER` and `$DB_NAME` according to your `.env`.

---

## 🔄 Actualizar el Proyecto (pull + rebuild) / Update the Project (pull + rebuild)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
1. Haz pull de la última versión:
```bash
git pull origin main
```
2. Reconstruye y reinicia servicios:
```bash
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```
3. (Opcional) Ejecuta migraciones si hay cambios:
```bash
docker compose -f docker-compose.prod.yml exec backend node src/migrate.js
```
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
1. Pull the latest version:
```bash
git pull origin main
```
2. Rebuild and restart services:
```bash
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```
3. (Optional) Run migrations if models changed:
```bash
docker compose -f docker-compose.prod.yml exec backend node src/migrate.js
```

---

## ✅ Coherencia (migraciones/seed) / Consistency (migrations/seed)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- En producción, evita `sync` y usa migraciones controladas.
- Si necesitas datos demo, ejecuta `SEED_MODE=demo node src/seed.js` solo en entornos no‑prod.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- In production, avoid `sync` and use controlled migrations.
- If you need demo data, run `SEED_MODE=demo node src/seed.js` only in non‑prod environments.

---

## 🔐 Rotar JWT_SECRET / Rotate JWT_SECRET
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
1. Cambia el valor en `.env` y reinicia backend.
2. Todos los tokens previos quedarán inválidos. Considera limpiar `RefreshTokens` si es necesario.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
1. Change the value in `.env` and restart the backend.
2. All previous tokens will become invalid. Consider clearing `RefreshTokens` if needed.

---

## 📝 Notas / Notes
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Nunca subas backups ni `.env` al repositorio.
- Realiza backup antes de actualizar o migrar.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Never commit backups or `.env` files.
- Backup before updating or migrating.
