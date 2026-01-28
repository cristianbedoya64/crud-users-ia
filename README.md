
# UARP-AI

Plataforma web empresarial para gestión de usuarios, roles y permisos, con módulos de Inteligencia Artificial y Data Science.


# UARP-AI
# UARP-AI

API RESTful + SPA + Panel IA para gestión de usuarios, roles, permisos y auditoría. Stack: Node.js, React, PostgreSQL, Flask IA. Despliegue en DigitalOcean App Platform o Docker Compose.
RESTful API + SPA + IA Panel for user, role, permission, and audit management. Stack: Node.js, React, PostgreSQL, Flask IA. Deployable on DigitalOcean App Platform or Docker Compose.

---

## Tabla de Contenidos
## Table of Contents
- [Descripción General](#descripción-general)  
	General Description
- [Estructura del Proyecto](#estructura-del-proyecto)  
	Project Structure
- [Instalación y Configuración](#instalación-y-configuración)  
	Installation & Setup
- [Seguridad](#seguridad)  
	Security
- [Módulos Principales](#módulos-principales)  
	Main Modules
- [Autenticación y Permisos](#autenticación-y-permisos)  
	Auth & Permissions
- [Documentación Técnica](#documentación-técnica)  
	Technical Documentation
- [Despliegue](#despliegue)  
	Deployment
- [Backup y Restauración](#backup-y-restauración)  
	Backup & Restore
- [Changelog](#changelog)

---

## Descripción General
## General Description
API full-stack para gestión de usuarios, roles, permisos y panel de IA. Incluye autenticación JWT, RBAC, logs de auditoría y dashboard interactivo. Pensado para despliegue seguro y escalable.
Full-stack API for user, role, and permission management with IA panel. Includes JWT authentication, RBAC, audit logs, and interactive dashboard. Designed for secure and scalable deployment.

---

## Estructura del Proyecto
## Project Structure
```
/backend   # API Node.js/Express/Sequelize
/frontend  # SPA React/Vite/Tailwind
/ia        # Microservicio IA Python/Flask
/docs      # Documentación técnica
```
```
/backend   # Node.js/Express/Sequelize API
/frontend  # React/Vite/Tailwind SPA
/ia        # Python/Flask IA microservice
/docs      # Technical documentation
```

---

## Instalación y Configuración
## Installation & Setup
1. Clona el repo y revisa los README de cada módulo.  
	 Clone the repo and review each module's README.
2. Configura variables en `.env` y `backend/.env` (ver ejemplos).  
	 Set variables in `.env` and `backend/.env` (see examples).
3. Usa Docker Compose o instala dependencias manualmente.  
	 Use Docker Compose or install dependencies manually.
4. Ejecuta migraciones y seed si es necesario.  
	 Run migrations and seed if needed.

---

## Seguridad
## Security
- JWT fuerte y CORS restringido en prod  
	Strong JWT and restricted CORS in production
- Seeds demo solo en desarrollo  
	Demo seeds only in development
- Logs de auditoría y rate limit  
	Audit logs and rate limiting

---

## Módulos Principales
## Main Modules
- Backend: API RESTful, RBAC, auditoría  
	Backend: RESTful API, RBAC, audit
- Frontend: SPA, dashboard, panel IA  
	Frontend: SPA, dashboard, IA panel
- IA: Flask, análisis y predicción  
	IA: Flask, analysis and prediction

---

## Autenticación y Permisos
## Auth & Permissions
- JWT + refresh tokens  
	JWT + refresh tokens
- RBAC por roles y permisos  
	RBAC by roles and permissions
- Logs de acceso y acciones  
	Access and action logs

---

## Documentación Técnica
## Technical Documentation
- [API](docs/api.md)  
	API
- [Base de datos](docs/db.md)  
	Database
- [Seguridad](docs/security.md)  
	Security
- [Despliegue](docs/DEPLOY.md)  
	Deployment
- [Backup/Restore](docs/RESTORE_BACKUP.md)  
	Backup/Restore
- [Changelog](docs/CHANGELOG.md)  
	Changelog

---

## Despliegue
## Deployment
- DigitalOcean App Platform (recomendado)  
	DigitalOcean App Platform (recommended)
- Docker Compose (local/prod)  
	Docker Compose (local/prod)

---

## Backup y Restauración
## Backup & Restore
- Ver [docs/RESTORE_BACKUP.md](docs/RESTORE_BACKUP.md)  
	See [docs/RESTORE_BACKUP.md](docs/RESTORE_BACKUP.md)

---

## Changelog
## Changelog
- Ver [docs/CHANGELOG.md](docs/CHANGELOG.md)  
	See [docs/CHANGELOG.md](docs/CHANGELOG.md)
