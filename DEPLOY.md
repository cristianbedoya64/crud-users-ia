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

### Pasos (App Platform recomendado)
1) **Base de datos**: crea Managed PostgreSQL. Copia host, port, db, user, password. No expongas público.
2) **Nueva App desde GitHub**: selecciona el repo y rama.
3) **Servicios**:
   - Backend: tipo *Web Service*, fuente Dockerfile (`backend/Dockerfile`), puerto interno 3000. Setea env anteriores. Health check HTTP `GET /`.
   - IA: tipo *Web Service*, Dockerfile (`ia/Dockerfile`), puerto interno 5001. Env `PORT=5001`. Health check TCP 5001.
   - Frontend: tipo *Static Site*, comando build `npm install && npm run build`, publish dir `dist`, working dir `frontend/`. Env `VITE_API_URL` apuntando al backend público (HTTPS).
4) **Variables de entorno**: agrégalas en App Platform (no en el repo). Usa los valores de la DB de DO. Define `JWT_SECRET` fuerte. Desactiva `SKIP_AUTH` (no usar en prod).
5) **Health checks**: backend `GET /` (200), IA TCP 5001, frontend servido estático.
6) **Deploy**: crea la app. Espera build. Verifica logs de backend/ia. Prueba `GET https://<backend>/` y login desde frontend.
7) **Migraciones/Seed** (una sola vez): abre consola del servicio backend en App Platform y ejecuta `node src/migrate.js`; opcional `node src/seed.js` solo en entornos de prueba.
8) **Dominio y HTTPS**: agrega dominio custom y habilita certificados automáticos. Ajusta `CORS_ORIGINS` y `VITE_API_URL` al dominio final.

### Pasos (Droplet + Docker Compose, alternativa)
1) Crear Droplet (Ubuntu) con firewall. Instalar Docker y docker-compose.
2) Clonar repo. Crear `.env` en backend/frontend/ia con variables de arriba.
3) Ejecutar `./start.sh` o `docker-compose up -d` desde la raíz.
4) Opcional: exponer frontend con Nginx reverso y HTTPS (Let’s Encrypt). No exponer Postgres salvo a red privada o túnel.

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
