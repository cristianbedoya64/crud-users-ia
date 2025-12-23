
# UARP-AI

Plataforma web empresarial para gestión de usuarios, roles y permisos, con módulos de Inteligencia Artificial y Data Science.

## Estructura del Proyecto
- **frontend/**: Aplicación React + Vite + TailwindCSS
- **backend/**: API Node.js + Express + Sequelize (PostgreSQL)
- **ia/**: Scripts Python para IA y análisis de datos
- **docs/**: Documentación técnica y diagramas
- **config/**: Configuración global
- **migrations/**: Migraciones de base de datos

## Instalación y Uso
1. Revisa los README de cada módulo para instrucciones específicas de instalación y ejecución.
2. Configura las variables de entorno según los archivos `.env.example`.
3. Utiliza Docker para despliegue si lo prefieres (`docker-compose.yml`).

## Arranque rápido (Docker)
- Una sola orden: `./start.sh` (levanta frontend, backend, IA y PostgreSQL en segundo plano). En Codespaces expone puertos 3000/5173/5001 como públicos para evitar problemas de CORS.
- Alternativa Makefile:
	- `make up` levanta los servicios.
	- `make down` detiene y elimina contenedores.
	- `make logs` sigue logs de backend y frontend.
	- `make ps` lista contenedores.

### Seguridad Postgres
- Por defecto, el puerto de Postgres **no está expuesto** fuera de los contenedores (ver `docker-compose.yml`).
- Si necesitas conectarte desde tu máquina local para desarrollo, descomenta la línea `ports: - "5432:5432"` en el servicio `postgres`.
- **En producción** (DigitalOcean App Platform o Droplet), nunca expongas el puerto 5432 a internet. Usa Managed PostgreSQL o firewall para restringir acceso solo a los servicios autorizados.

## Módulos
- **Gestión de usuarios, roles y permisos**
- **Panel de IA y Data Science**
- **Auditoría y logs de seguridad**

## Documentación
Consulta la carpeta `docs/` para diagramas de arquitectura y detalles técnicos.

## Despliegue en DigitalOcean / DigitalOcean Deployment
Consulta la guía completa en [DEPLOY.md](DEPLOY.md) para instrucciones bilingües y mejores prácticas de despliegue cloud.
