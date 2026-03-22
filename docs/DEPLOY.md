
# 🚀 Despliegue (DigitalOcean) / Deployment (DigitalOcean)

> **Trabajo de Grado – Facultad de Ingeniería**<br>
> **Universidad Santiago de Cali**<br>
> **Enfoque:** propuesta de investigación aplicada con IA para scoring de riesgo.<br>
>
> Documento técnico orientado a evaluación académica: explica opciones de despliegue y variables de entorno para validar la capacidad de operación del prototipo y su futura ampliación.

---

## 🎓 Contexto Académico / Academic Context
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este documento sirve como evidencia del componente de despliegue del prototipo, permitiendo verificar reproducibilidad y buenas prácticas (seguridad, variables, persistencia, observabilidad).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This document provides evidence of deployment practices for the prototype, enabling reproducibility and best-practice validation.

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

## ▶️ Arranque rápido (local/Codespaces/prod‑demo) / Quick Start (local/Codespaces/prod‑demo)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Usa `scripts/start.sh` como camino feliz para levantar todo en un solo comando.
- Variables relevantes:
	- `RUN_MODE`: `local` | `codespaces` | `prod-demo`.
	- `MIGRATE_MODE`: `sync` (solo no‑prod) | `migrations`.
	- `SEED_MODE`: `demo` | `prod` | `skip`.
	- `SEED_ALLOW_SYNC=true`: permite `sequelize.sync()` solo en no‑prod.

Ejemplos:
```bash
RUN_MODE=local scripts/start.sh
RUN_MODE=codespaces scripts/start.sh
RUN_MODE=prod-demo SEED_MODE=prod MIGRATE_MODE=migrations scripts/start.sh
```
> En producción real, evita `sync` y usa migraciones con `docker-compose.prod.yml`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Use `scripts/start.sh` as the happy path to start everything with one command.
- Relevant vars:
	- `RUN_MODE`: `local` | `codespaces` | `prod-demo`.
	- `MIGRATE_MODE`: `sync` (non‑prod only) | `migrations`.
	- `SEED_MODE`: `demo` | `prod` | `skip`.
	- `SEED_ALLOW_SYNC=true`: allows `sequelize.sync()` only in non‑prod.

Examples:
```bash
RUN_MODE=local scripts/start.sh
RUN_MODE=codespaces scripts/start.sh
RUN_MODE=prod-demo SEED_MODE=prod MIGRATE_MODE=migrations scripts/start.sh
```
> In real production, avoid `sync` and use migrations with `docker-compose.prod.yml`.

---

## 🧪 Paso a paso para evaluación / Step‑by‑step for evaluation
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
1. Clonar el repositorio.
2. (Opcional) Crear `.env`/`backend/.env` con variables mínimas (ver sección anterior).
3. Ejecutar arranque feliz:
```bash
RUN_MODE=local scripts/start.sh
```
4. Abrir frontend (`http://localhost:5173`) y backend (`http://localhost:3000`).
5. Login demo: `admin@demo.com` / `Password1!`.
6. Verificar `/health` y `/ready` en backend.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
1. Clone the repo.
2. (Optional) Create `.env`/`backend/.env` with minimal vars (see above).
3. Run the happy‑path startup:
```bash
RUN_MODE=local scripts/start.sh
```
4. Open frontend (`http://localhost:5173`) and backend (`http://localhost:3000`).
5. Demo login: `admin@demo.com` / `Password1!`.
6. Check `/health` and `/ready` on backend.

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

## 🔁 Re-despliegue rápido (Droplet) / Quick Redeploy (Droplet)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
1) Conéctate al droplet y ve a la carpeta del repo.
2) Actualiza el código:
```bash
git pull origin main
```
3) Reconstruye y levanta:
```bash
docker compose -f docker-compose.prod.yml up -d --build
```
4) Ejecuta migraciones (solo si hay cambios de DB):
```bash
docker compose -f docker-compose.prod.yml exec backend node src/migrate.js
```
5) (Opcional) Verifica logs:
```bash
docker compose -f docker-compose.prod.yml logs -f backend frontend ia-panel postgres
```

<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
1) SSH into the droplet and go to the repo folder.
2) Pull latest code:
```bash
git pull origin main
```
3) Rebuild and start:
```bash
docker compose -f docker-compose.prod.yml up -d --build
```
4) Run migrations (only if DB changes):
```bash
docker compose -f docker-compose.prod.yml exec backend node src/migrate.js
```
5) (Optional) Check logs:
```bash
docker compose -f docker-compose.prod.yml logs -f backend frontend ia-panel postgres
```

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
