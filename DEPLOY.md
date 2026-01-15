# Despliegue en DigitalOcean / DigitalOcean Deployment Guide

## Español

### Requisitos previos
- Cuenta en DigitalOcean con App Platform habilitado
- Base de datos Managed PostgreSQL (recomendado) o acceso a Droplet (alternativa)
- Repo en GitHub con rama principal lista para desplegar

### Variables de entorno necesarias (App Platform)
- Backend: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `PORT` (3000), `NODE_ENV` (production), `JWT_SECRET` (obligatoria), `ACCESS_TOKEN_TTL` (15m), `REFRESH_TOKEN_TTL` (7d), `CORS_ALLOW_ALL=false`, `CORS_ORIGINS=https://<tu-dominio>` , `IA_PANEL_URL=http://ia-panel:5001/ia-panel`
- Frontend: `VITE_API_URL` (ej. `https://<backend-url>`), `NODE_ENV` (production)
- IA: `PORT` (5001)


### Pasos (Docker Compose producción)
1) Clona el repo en tu Droplet o VM.
2) Crea los archivos `.env` en `backend/` y en la raíz si usas variables globales. Ejemplo de backend/.env:
   ```env
   DB_HOST=postgres
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=change_me
   DB_NAME=uarp_ai
   JWT_SECRET=<valor-fuerte>
   ACCESS_TOKEN_TTL=15m
   REFRESH_TOKEN_TTL=7d
   CORS_ALLOW_ALL=false
   CORS_ORIGINS=https://<tu-dominio>
   IA_PANEL_URL=http://ia-panel:5001/ia-panel
   ```
   En la raíz puedes definir `VITE_API_URL` para el build del frontend:
   ```env
   VITE_API_URL=https://<tu-dominio-backend>
   ```
3) Revisa y ajusta `docker-compose.prod.yml`:
   - Backend y frontend usan `restart: unless-stopped` para resiliencia.
   - Frontend expone puerto 80 (mapea a 5173 interno).
   - IA panel expone 5001.
   - Postgres usa volumen persistente `pgdata`.
   - Usa variables de entorno seguras y no expongas el puerto de Postgres fuera de la red local.
4) Ejecuta `docker compose -f docker-compose.prod.yml up -d` para levantar todos los servicios.
5) Ejecuta migraciones y seed desde el contenedor backend si es primera vez:
   ```bash
   docker compose exec backend node src/migrate.js
   docker compose exec backend node src/seed.js # solo en entornos de prueba
   ```
6) Configura DNS de tu dominio para apuntar a la IP del servidor.
7) (Opcional) Usa Nginx como reverse proxy para frontend y backend, habilita HTTPS con Let's Encrypt.
8) Verifica logs con `docker compose logs -f backend frontend ia-panel postgres`.

### Consideraciones adicionales
- Mantén tus `.env` fuera del repo y nunca subas secretos.
- Cambia la contraseña de Postgres (`DB_PASS`) y el `JWT_SECRET` antes de producción.
- Revisa los puertos expuestos y firewall de tu VM/Droplet.
- Actualiza la documentación y variables en caso de cambios en la infraestructura.

### Pasos (Droplet único + Docker Compose, opción ahorro créditos)
1) **Crear Droplet**: Plan Basic Regular CPU (1 vCPU, 1 GB RAM, 25–30 GB disco), Ubuntu 24.04. Habilita firewall DO (SSH 22, HTTP 80, HTTPS 443; 5001 solo si expones IA). Usa clave SSH.
2) **Bootstrap** (como root):
   ```bash
   apt-get update && apt-get upgrade -y
   apt-get install -y ca-certificates curl git ufw
   curl -fsSL https://get.docker.com | sh
   useradd -m -s /bin/bash deployer && usermod -aG docker deployer
   su - deployer
   ```
3) **Clonar y preparar env**:
   ```bash
   git clone https://github.com/cristianbedoya64/crud-users-ia.git
   cd crud-users-ia && git checkout main
   cp backend/.env.example backend/.env
   # Edita backend/.env: DB_PASS fuerte, JWT_SECRET, CORS_ORIGINS con tu dominio/IP
   export VITE_API_URL=https://tu-dominio.com  # o http://<ip> para pruebas
   ```
4) **Levantar servicios**:
   ```bash
   docker compose -f docker-compose.prod.yml --env-file backend/.env up -d --build
   ```
   Puertos: 80 (frontend), 3000 (backend), 5001 (ia-panel opcional).
5) **Firewall en el droplet**:
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   # opcional: sudo ufw allow 5001/tcp
   sudo ufw enable
   ```
6) **HTTPS opcional**: instala nginx+certbot y configura reverse proxy a backend:3000 si necesitas TLS. Servir frontend estático con nginx es más eficiente que el preview de Vite; el compose actual expone el build en 80→5173 y funciona sin nginx si aceptas HTTP.
7) **Migraciones/seed**: `docker compose exec backend node src/migrate.js`; `node src/seed.js` solo en entornos de prueba.

### Seguridad
- CORS solo para tu dominio (`CORS_ALLOW_ALL=false` en prod)
- No exponer Postgres a internet; usa Managed DB privada o firewall
- No subir secretos al repo; usa variables en App Platform
- Cambia credenciales de seeds (admin/password) en prod o evita ejecutar el seed

---

## English

### Prerequisites
- DigitalOcean account with App Platform
- Managed PostgreSQL (recommended) or Droplet alternative
- GitHub repo (main branch ready)

### Required environment variables
- Backend: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `PORT=3000`, `NODE_ENV=production`, `JWT_SECRET` (required), `ACCESS_TOKEN_TTL=15m`, `REFRESH_TOKEN_TTL=7d`, `CORS_ALLOW_ALL=false`, `CORS_ORIGINS=https://<your-domain>`, `IA_PANEL_URL=http://ia-panel:5001/ia-panel`
- Frontend: `VITE_API_URL` (e.g. `https://<backend-url>`), `NODE_ENV=production`
- IA: `PORT=5001`

### Steps (App Platform recommended)
1) **Database**: create Managed PostgreSQL. Keep host/port/db/user/password private.
2) **New App from GitHub**: select repo and branch.
3) **Services**:
   - Backend: Web Service, Dockerfile `backend/Dockerfile`, internal port 3000, env as above. Health check HTTP `GET /`.
   - IA: Web Service, Dockerfile `ia/Dockerfile`, internal port 5001, env `PORT=5001`. Health check TCP 5001.
   - Frontend: Static Site, working dir `frontend/`, build command `npm install && npm run build`, publish dir `dist`, env `VITE_API_URL=https://<backend-url>`.
4) **Environment variables**: set in App Platform, never in git. Use strong `JWT_SECRET`. Keep `CORS_ALLOW_ALL=false` and set `CORS_ORIGINS` to your domains. Do not enable `SKIP_AUTH`.
5) **Health checks**: backend `GET /`, IA TCP 5001. Frontend served by DO static hosting.
6) **Deploy**: trigger build/deploy. Check backend/IA logs. Test `GET https://<backend>/` and login from frontend.
7) **Migrations/Seed** (once): open backend console in App Platform, run `node src/migrate.js`; optionally `node src/seed.js` for demo data only in non-prod.
8) **Domain & HTTPS**: add custom domain, enable TLS. Update `CORS_ORIGINS` and `VITE_API_URL` to the final domain.

### Security
- CORS only for your domain (`CORS_ALLOW_ALL=false` in prod)
- Do not expose Postgres; use private networking/firewall
- Do not commit secrets; configure in App Platform
- Change seed credentials or skip seed in production
