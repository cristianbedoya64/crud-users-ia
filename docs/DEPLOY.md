
# Despliegue en DigitalOcean
# DigitalOcean Deployment Guide

---

## Español
## Spanish

### Requisitos previos
### Prerequisites
- Cuenta en DigitalOcean con App Platform habilitado  
  DigitalOcean account with App Platform enabled
- Base de datos Managed PostgreSQL (recomendado) o acceso a Droplet (alternativa)  
  Managed PostgreSQL database (recommended) or Droplet access (alternative)
- Repo en GitHub con rama principal lista para desplegar  
  GitHub repo with main branch ready to deploy

---

### Variables de entorno necesarias (App Platform)
### Required environment variables (App Platform)
- Backend: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `PORT` (3000), `NODE_ENV` (production), `JWT_SECRET` (obligatoria), `ACCESS_TOKEN_TTL` (15m), `REFRESH_TOKEN_TTL` (7d), `CORS_ALLOW_ALL=false`, `CORS_ORIGINS=https://<tu-dominio>`, `IA_PANEL_URL=http://ia-panel:5001/ia-panel`  
  Backend: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `PORT` (3000), `NODE_ENV` (production), `JWT_SECRET` (required), `ACCESS_TOKEN_TTL` (15m), `REFRESH_TOKEN_TTL` (7d), `CORS_ALLOW_ALL=false`, `CORS_ORIGINS=https://<your-domain>`, `IA_PANEL_URL=http://ia-panel:5001/ia-panel`
- Frontend: `VITE_API_URL` (ej. `https://<backend-url>`), `NODE_ENV` (production)  
  Frontend: `VITE_API_URL` (e.g. `https://<backend-url>`), `NODE_ENV` (production)
- IA: `PORT` (5001)

---

### Pasos (Docker Compose producción)
### Steps (Docker Compose production)
1) Clona el repo en tu Droplet o VM.  
   Clone the repo in your Droplet or VM.
2) Crea los archivos `.env` en `backend/` y en la raíz si usas variables globales. Ejemplo de backend/.env:  
   Create `.env` files in `backend/` and root if using global variables. Example backend/.env:
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
   In root you can define `VITE_API_URL` for frontend build:  
   ```env
   VITE_API_URL=https://<tu-dominio-backend>
   ```
3) Revisa y ajusta `docker-compose.prod.yml`:  
   Review and adjust `docker-compose.prod.yml`:
   - Backend y frontend usan `restart: unless-stopped` para resiliencia.  
     Backend and frontend use `restart: unless-stopped` for resilience.
   - Frontend expone puerto 80 (mapea a 5173 interno).  
     Frontend exposes port 80 (maps to 5173 internally).
   - IA panel expone 5001.  
     IA panel exposes 5001.
   - Postgres usa volumen persistente `pgdata`.  
     Postgres uses persistent volume `pgdata`.
   - Usa variables de entorno seguras y no expongas el puerto de Postgres fuera de la red local.  
     Use secure env variables and do not expose Postgres port outside local network.
4) Ejecuta `docker compose -f docker-compose.prod.yml up -d` para levantar todos los servicios.  
   Run `docker compose -f docker-compose.prod.yml up -d` to start all services.
5) Ejecuta migraciones y seed desde el contenedor backend si es primera vez:  
   Run migrations and seed from backend container if first time:
   ```bash
   docker compose exec backend node src/migrate.js
   docker compose exec backend node src/seed.js # solo en entornos de prueba / only in test envs
   ```
6) Configura DNS de tu dominio para apuntar a la IP del servidor.  
   Set DNS of your domain to point to server IP.
7) (Opcional) Usa Nginx como reverse proxy para frontend y backend, habilita HTTPS con Let's Encrypt.  
   (Optional) Use Nginx as reverse proxy for frontend/backend, enable HTTPS with Let's Encrypt.
8) Verifica logs con `docker compose logs -f backend frontend ia-panel postgres`.  
   Check logs with `docker compose logs -f backend frontend ia-panel postgres`.

---

### Consideraciones adicionales
### Additional considerations
- Mantén tus `.env` fuera del repo y nunca subas secretos.  
  Keep your `.env` out of repo and never upload secrets.
- Cambia la contraseña de Postgres (`DB_PASS`) y el `JWT_SECRET` antes de producción.  
  Change Postgres password (`DB_PASS`) and `JWT_SECRET` before production.
- Revisa los puertos expuestos y firewall de tu VM/Droplet.  
  Check exposed ports and firewall of your VM/Droplet.
- Actualiza la documentación y variables en caso de cambios en la infraestructura.  
  Update docs and variables if infra changes.

---

### Pasos (Droplet único + Docker Compose, opción ahorro créditos)
### Steps (Single Droplet + Docker Compose, credits saving option)
1) **Crear Droplet**: Plan Basic Regular CPU (1 vCPU, 1 GB RAM, 25–30 GB disco), Ubuntu 24.04. Habilita firewall DO (SSH 22, HTTP 80, HTTPS 443; 5001 solo si expones IA). Usa clave SSH.  
   **Create Droplet**: Basic Regular CPU (1 vCPU, 1 GB RAM, 25–30 GB disk), Ubuntu 24.04. Enable DO firewall (SSH 22, HTTP 80, HTTPS 443; 5001 only if exposing IA). Use SSH key.
2) **Bootstrap** (como root):  
   **Bootstrap** (as root):
   ```bash
   apt-get update && apt-get upgrade -y
   apt-get install -y ca-certificates curl git ufw
   curl -fsSL https://get.docker.com | sh
   useradd -m -s /bin/bash deployer && usermod -aG docker deployer
   su - deployer
   ```
3) **Clonar y preparar env**:  
   **Clone and prepare env**:
   ```bash
   git clone https://github.com/cristianbedoya64/crud-users-ia.git
   cd crud-users-ia && git checkout main
   cp backend/.env.example backend/.env
   # Edita backend/.env: DB_PASS fuerte, JWT_SECRET, CORS_ORIGINS con tu dominio/IP
   # Edit backend/.env: strong DB_PASS, JWT_SECRET, CORS_ORIGINS with your domain/IP
   export VITE_API_URL=https://tu-dominio.com  # o http://<ip> para pruebas / or http://<ip> for tests
   ```
4) **Levantar servicios**:  
   **Start services**:
   ```bash
   docker compose -f docker-compose.prod.yml --env-file backend/.env up -d --build
   ```
   Puertos: 80 (frontend), 3000 (backend), 5001 (ia-panel opcional).  
   Ports: 80 (frontend), 3000 (backend), 5001 (ia-panel optional).
5) **Firewall en el droplet**:  
   **Firewall in droplet**:
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   # opcional: sudo ufw allow 5001/tcp
   # optional: sudo ufw allow 5001/tcp
   sudo ufw enable
   ```
6) **HTTPS opcional**: instala nginx+certbot y configura reverse proxy a backend:3000 si necesitas TLS. Servir frontend estático con nginx es más eficiente que el preview de Vite; el compose actual expone el build en 80→5173 y funciona sin nginx si aceptas HTTP.  
   **Optional HTTPS**: install nginx+certbot and configure reverse proxy to backend:3000 if you need TLS. Serving frontend static with nginx is more efficient than Vite preview; current compose exposes build on 80→5173 and works without nginx if you accept HTTP.
7) **Migraciones/seed**: `docker compose exec backend node src/migrate.js`; `node src/seed.js` solo en entornos de prueba.  
   **Migrations/seed**: `docker compose exec backend node src/migrate.js`; `node src/seed.js` only in test envs.

---

### Seguridad
### Security
- CORS solo para tu dominio (`CORS_ALLOW_ALL=false` en prod)  
  CORS only for your domain (`CORS_ALLOW_ALL=false` in prod)
- No exponer Postgres a internet; usa Managed DB privada o firewall  
  Do not expose Postgres to internet; use private Managed DB or firewall
- No subir secretos al repo; usa variables en App Platform  
  Do not upload secrets to repo; use variables in App Platform
- Cambia credenciales de seeds (admin/password) en prod o evita ejecutar el seed  
  Change seed credentials (admin/password) in prod or avoid running seed
