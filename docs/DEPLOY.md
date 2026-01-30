
# 🚀 Despliegue (DigitalOcean) / Deployment (DigitalOcean)

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: explica opciones de despliegue y variables de entorno para validar la capacidad de operación del sistema en escenarios reales.

---

## 🎓 Contexto Académico y Destinatario / Academic Context & Audience
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este documento sirve como evidencia del componente de despliegue del proyecto integrador profesional, permitiendo a los jueces verificar reproducibilidad y buenas prácticas (seguridad, variables, persistencia, observabilidad).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This document is evidence of the deployment component of the integrative project, allowing judges to validate reproducibility and best practices (security, env vars, persistence, observability).

---

## ✅ Requisitos Previos / Prerequisites
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Cuenta en DigitalOcean con App Platform habilitado.
- Base de datos Managed PostgreSQL (recomendado) o acceso a Droplet/VM (alternativa).
- Repositorio en GitHub con rama `main` lista para desplegar.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- DigitalOcean account with App Platform enabled.
- Managed PostgreSQL database (recommended) or Droplet/VM access (alternative).
- GitHub repo with `main` branch ready to deploy.

---

## 🔧 Variables de Entorno (mínimas) / Minimal Environment Variables
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Backend:** `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `PORT` (3000), `NODE_ENV=production`, `JWT_SECRET`, `ACCESS_TOKEN_TTL`, `REFRESH_TOKEN_TTL`, `CORS_ALLOW_ALL=false`, `CORS_ORIGINS`, `IA_PANEL_URL`.
- **Frontend:** `VITE_API_URL` (ej. `https://<backend-url>`), `NODE_ENV=production`.
- **IA:** `PORT` (5001).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Backend:** `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `PORT` (3000), `NODE_ENV=production`, `JWT_SECRET`, `ACCESS_TOKEN_TTL`, `REFRESH_TOKEN_TTL`, `CORS_ALLOW_ALL=false`, `CORS_ORIGINS`, `IA_PANEL_URL`.
- **Frontend:** `VITE_API_URL` (e.g. `https://<backend-url>`), `NODE_ENV=production`.
- **IA:** `PORT` (5001).

---

## 🐳 Opción A: Docker Compose (producción) / Option A: Docker Compose (production)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
1) Clona el repo en tu Droplet/VM.
2) Crea `backend/.env` (y si aplica, `.env` raíz para build de frontend). Ejemplo:
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
3) Levanta servicios:
```bash
docker compose -f docker-compose.prod.yml up -d
```
4) Primera vez (migración/seed):
```bash
docker compose -f docker-compose.prod.yml exec backend node src/migrate.js
docker compose -f docker-compose.prod.yml exec backend node src/seed.js  # solo pruebas
```
5) Verifica logs:
```bash
docker compose -f docker-compose.prod.yml logs -f backend frontend ia-panel postgres
```
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
1) Clone the repo in your Droplet/VM.
2) Create `backend/.env` (and optionally root `.env` for frontend build). Example:
```env
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASS=change_me
DB_NAME=uarp_ai
JWT_SECRET=<strong-value>
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d
CORS_ALLOW_ALL=false
CORS_ORIGINS=https://<your-domain>
IA_PANEL_URL=http://ia-panel:5001/ia-panel
```
3) Start services:
```bash
docker compose -f docker-compose.prod.yml up -d
```
4) First time (migrate/seed):
```bash
docker compose -f docker-compose.prod.yml exec backend node src/migrate.js
docker compose -f docker-compose.prod.yml exec backend node src/seed.js  # tests only
```
5) Check logs:
```bash
docker compose -f docker-compose.prod.yml logs -f backend frontend ia-panel postgres
```

---

## 💸 Opción B: Droplet único (ahorro) / Option B: Single Droplet (cost-saving)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
1) Droplet Ubuntu 24.04 (1 vCPU, 1 GB RAM) + firewall (22/80/443; 5001 solo si expones IA).
2) Instala Docker, clona repo, configura `backend/.env`.
3) Ejecuta `docker compose -f docker-compose.prod.yml up -d --build`.
4) DNS/HTTPS opcional (nginx + certbot).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
1) Ubuntu 24.04 Droplet (1 vCPU, 1 GB RAM) + firewall (22/80/443; 5001 only if exposing IA).
2) Install Docker, clone repo, configure `backend/.env`.
3) Run `docker compose -f docker-compose.prod.yml up -d --build`.
4) Optional DNS/HTTPS (nginx + certbot).

---

## 🔒 Recomendaciones de Seguridad / Security Recommendations
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- CORS solo para tu dominio (`CORS_ALLOW_ALL=false`).
- No exponer Postgres a internet (Managed DB privada o firewall/red interna).
- No subir secretos al repo (usar variables en App Platform).
- Cambiar credenciales demo/seed en producción o no ejecutar seed.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Restrict CORS to your domain (`CORS_ALLOW_ALL=false`).
- Do not expose Postgres to the internet (private Managed DB or firewall/internal network).
- Never commit secrets (use App Platform variables).
- Change demo/seed credentials in production or avoid running seeds.
