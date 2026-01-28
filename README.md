
# UARP-AI

Plataforma web empresarial para gestión de usuarios, roles y permisos, con módulos de Inteligencia Artificial y Data Science.

## Estructura del Proyecto
- **frontend/**: Aplicación React + Vite + TailwindCSS
- **backend/**: API Node.js + Express + Sequelize (PostgreSQL)
- **ia/**: Scripts Python para IA y análisis de datos
- **docs/**: Documentación técnica y diagramas
- **config/**: Configuración global
- **migrations/**: Migraciones de base de datos

## Instalación y Uso (local)
1. Backend: `cd backend && npm install`
2. Frontend: `cd frontend && npm install`
3. IA: (opcional) instalar `pip install -r requirements.txt` si aplica
4. Configura variables de entorno copiando cada `.env.example`
5. Ejecuta backend: `npm start` (desde `backend/`)
6. Ejecuta frontend: `npm run dev` (desde `frontend/`)

### Con Docker Compose
- `./scripts/start.sh` levanta frontend, backend, IA y PostgreSQL en segundo plano (puertos 3000/5173/5001) y ejecuta el seed automático para credenciales demo. En Codespaces expone 3000/5173/5001.
- Alternativa Makefile: `make up | make down | make logs | make ps`

## Estructura
- `frontend/`: React + Vite + TailwindCSS (UI Mantine/MUI)
- `backend/`: Node.js + Express + Sequelize (PostgreSQL)
- `ia/`: Flask + IsolationForest demo
- `docs/`: Documentación técnica
- `config/`: Configuración Sequelize CLI
- `migrations/`: Migraciones legacy (usar las de `backend/migrations/`)

### Seguridad Postgres
- Por defecto, el puerto de Postgres **no está expuesto** fuera de los contenedores (ver `docker-compose.yml`).
- Si necesitas conectarte desde tu máquina local para desarrollo, descomenta la línea `ports: - "5432:5432"` en el servicio `postgres`.
- **En producción** (DigitalOcean App Platform o Droplet), nunca expongas el puerto 5432 a internet. Usa Managed PostgreSQL o firewall para restringir acceso solo a los servicios autorizados.

## Módulos
- **Gestión de usuarios, roles y permisos**
- **Panel de IA y Data Science**
- **Auditoría y logs de seguridad**

## Autenticación (JWT + Refresh)
- Endpoints: `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`
- Header: `Authorization: Bearer <token>` (frontend usa `authFetch`)
- Config: `JWT_SECRET` obligatorio en prod; TTL: `ACCESS_TOKEN_TTL=15m`, `REFRESH_TOKEN_TTL=7d`
- Seed demo crea `admin@demo.com` con contraseña `password` (solo pruebas)

## Documentación
- API: [docs/api.md](docs/api.md)
- Base de datos: [docs/db.md](docs/db.md)
- Seguridad: [docs/security.md](docs/security.md)
- Despliegue DO: [docs/DEPLOY.md](docs/DEPLOY.md)
- Índice docs: [docs/README.md](docs/README.md)
- Changelog docs: [docs/CHANGELOG.md](docs/CHANGELOG.md)

## Despliegue
- DigitalOcean App Platform: ver [docs/DEPLOY.md](docs/DEPLOY.md)
- Docker Compose local: `./scripts/start.sh` o `docker-compose up -d`
