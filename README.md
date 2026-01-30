


# UARP-AI 🚀

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

<p align="center">
  <b>Proyecto integrador de grado - Ingeniería de Sistemas</b> 🎓<br>
  <i>Full-stack web platform for user, role, and permission management with AI modules.</i>
</p>

---

## 📝 Descripción General / General Description
<span>🇪🇸</span> es - Plataforma web empresarial para gestión de usuarios, roles y permisos, con módulos de Inteligencia Artificial y Data Science. API full-stack para gestión de usuarios, roles, permisos y panel de IA. Incluye autenticación JWT, RBAC, logs de auditoría y dashboard interactivo. Pensado para despliegue seguro y escalable.<br>
<span>🇬🇧</span> en - Full-stack web platform for user, role, and permission management with AI and Data Science modules. Includes JWT authentication, RBAC, audit logs, and interactive dashboard. Designed for secure and scalable deployment.

---

## 🗂️ Tabla de Contenidos / Table of Contents
<span>🇪🇸</span> es -
  - Descripción General
  - Estructura del Proyecto
  - Instalación y Configuración
  - Seguridad
  - Módulos Principales
  - Autenticación y Permisos
  - Documentación Técnica
  - Despliegue
  - Pruebas
  - Lighthouse
  - Backup y Restauración
  - Changelog
<br><span>🇬🇧</span> en -
  - General Description
  - Project Structure
  - Installation & Setup
  - Security
  - Main Modules
  - Auth & Permissions
  - Technical Documentation
  - Deployment
  - Tests
  - Lighthouse
  - Backup & Restore
  - Changelog

---

## 🏗️ Estructura del Proyecto / Project Structure
<span>🇪🇸</span> es -
```shell
/backend   # API Node.js/Express/Sequelize
/frontend  # SPA React/Vite/Tailwind
/ia        # Microservicio IA Python/Flask
/docs      # Documentación técnica
```
<br><span>🇬🇧</span> en -
```shell
/backend   # Node.js/Express/Sequelize API
/frontend  # React/Vite/Tailwind SPA
/ia        # Python/Flask IA microservice
/docs      # Technical documentation
```

---

## ⚙️ Instalación y Configuración / Installation & Setup
<span>🇪🇸</span> es -
1. Clona el repo y revisa los README de cada módulo.
2. Configura variables en `.env` y `backend/.env` (ver ejemplos).
3. Usa Docker Compose o instala dependencias manualmente.
4. Ejecuta migraciones y seed si es necesario.
<br><span>🇬🇧</span> en -
1. Clone the repo and review each module's README.
2. Set variables in `.env` and `backend/.env` (see examples).
3. Use Docker Compose or install dependencies manually.
4. Run migrations and seed if needed.

---

## 🔒 Seguridad / Security
<span>🇪🇸</span> es -
- JWT fuerte y CORS restringido en prod
- Seeds demo solo en desarrollo
- Logs de auditoría y rate limit
<br><span>🇬🇧</span> en -
- Strong JWT and restricted CORS in production
- Demo seeds only in development
- Audit logs and rate limiting

---

## 🧩 Módulos Principales / Main Modules
<span>🇪🇸</span> es -
- Backend: API RESTful, RBAC, auditoría
- Frontend: SPA, dashboard, panel IA
- IA: Flask, análisis y predicción
<br><span>🇬🇧</span> en -
- Backend: RESTful API, RBAC, audit
- Frontend: SPA, dashboard, IA panel
- IA: Flask, analysis and prediction

---

## 🛡️ Autenticación y Permisos / Auth & Permissions
<span>🇪🇸</span> es -
- JWT + refresh tokens
- RBAC por roles y permisos
- Logs de acceso y acciones
<br><span>🇬🇧</span> en -
- JWT + refresh tokens
- RBAC by roles and permissions
- Access and action logs

---

## 📚 Documentación Técnica / Technical Documentation
<span>🇪🇸</span> es -
- [API](docs/api.md)
- [Base de datos](docs/db.md)
- [Seguridad](docs/security.md)
- [Despliegue](docs/DEPLOY.md)
- [Backup/Restore](docs/RESTORE_BACKUP.md)
- [Changelog](docs/CHANGELOG.md)
<br><span>🇬🇧</span> en -
- [API](docs/api.md)
- [Database](docs/db.md)
- [Security](docs/security.md)
- [Deployment](docs/DEPLOY.md)
- [Backup/Restore](docs/RESTORE_BACKUP.md)
- [Changelog](docs/CHANGELOG.md)

---

## 🚀 Despliegue / Deployment
<span>🇪🇸</span> es -
- DigitalOcean App Platform (recomendado)
- Docker Compose (local/prod)
<br><span>🇬🇧</span> en -
- DigitalOcean App Platform (recommended)
- Docker Compose (local/prod)

---

## 🧪 Pruebas / Tests
<span>🇪🇸</span> es -
- Backend (API/Node):
  - `npm test` dentro de la carpeta backend.
- Frontend (React):
  - `npm test` dentro de la carpeta frontend.
<br><span>🇬🇧</span> en -
- Backend (API/Node):
  - `npm test` inside backend folder.
- Frontend (React):
  - `npm test` inside frontend folder.

---

## 💡 Lighthouse
<span>🇪🇸</span> es -
- Ejecutar auditorías (mobile + desktop):
  - `npm run lighthouse` dentro de la carpeta frontend.
- Ver guía detallada: [docs/lighthouse.md](docs/lighthouse.md)
<br><span>🇬🇧</span> en -
- Run audits (mobile + desktop):
  - `npm run lighthouse` inside frontend folder.
- See detailed guide: [docs/lighthouse.md](docs/lighthouse.md)

---

## 💾 Backup y Restauración / Backup & Restore
<span>🇪🇸</span> es - Ver [docs/RESTORE_BACKUP.md](docs/RESTORE_BACKUP.md)
<br><span>🇬🇧</span> en - See [docs/RESTORE_BACKUP.md](docs/RESTORE_BACKUP.md)

---

## 📝 Changelog
<span>🇪🇸</span> es - Ver [docs/CHANGELOG.md](docs/CHANGELOG.md)
<br><span>🇬🇧</span> en - See [docs/CHANGELOG.md](docs/CHANGELOG.md)
