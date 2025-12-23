# Despliegue en DigitalOcean / DigitalOcean Deployment Guide

## Español

### Requisitos previos
- Cuenta en DigitalOcean
- Acceso a Managed PostgreSQL (recomendado) o Droplet
- Repo en GitHub

### Variables de entorno necesarias
- Backend: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `PORT`, `NODE_ENV`
- Frontend: `VITE_API_URL`, `NODE_ENV`
- IA: `PORT`

### Pasos (App Platform recomendado)
1. Crea una base de datos Managed PostgreSQL (plan más pequeño)
2. En App Platform, crea una nueva app desde GitHub
3. Añade servicios:
   - Backend: Dockerfile, puerto 3000, variables de entorno
   - Frontend: Static Site, build y publish dir, `VITE_API_URL` apuntando al backend
   - IA: Dockerfile, puerto 5001
4. Configura variables de entorno en App Platform (no en el repo)
5. Configura health checks
6. Deploy y prueba
7. (Opcional) Mapea dominio custom y activa HTTPS
8. Ejecuta seeds/migraciones desde consola backend si es necesario

### Seguridad
- CORS solo para tu dominio
- No exponer Postgres a internet
- No subir secretos al repo

---

## English

### Prerequisites
- DigitalOcean account
- Access to Managed PostgreSQL (recommended) or Droplet
- GitHub repo

### Required environment variables
- Backend: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `PORT`, `NODE_ENV`
- Frontend: `VITE_API_URL`, `NODE_ENV`
- IA: `PORT`

### Steps (App Platform recommended)
1. Create a Managed PostgreSQL database (smallest plan)
2. In App Platform, create a new app from GitHub
3. Add services:
   - Backend: Dockerfile, port 3000, env vars
   - Frontend: Static Site, build & publish dir, `VITE_API_URL` pointing to backend
   - IA: Dockerfile, port 5001
4. Set environment variables in App Platform (not in repo)
5. Configure health checks
6. Deploy and test
7. (Optional) Map custom domain and enable HTTPS
8. Run seeds/migrations from backend console if needed

### Security
- CORS only for your domain
- Do not expose Postgres to the internet
- Do not commit secrets to repo
