# UARP-AI 🚀

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
> 
> Este documento está orientado a la revisión, calificación y aprobación por parte del jurado académico, presentando el contexto, alcance, objetivos y valor profesional del sistema desarrollado.

---

## 🧭 Alcance, narrativa y rúbrica (problema → solución → valor)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
La gestión segura y eficiente de usuarios, roles y auditoría es un reto clave en sistemas empresariales modernos, donde la trazabilidad y el control de acceso son críticos para la confianza y el cumplimiento. Este proyecto integra autenticación robusta, control granular de permisos y un panel de IA para análisis, resolviendo limitaciones comunes de soluciones genéricas. La arquitectura modular, el registro de auditoría y la integración de IA aportan valor diferencial, facilitando la adaptabilidad, la transparencia y la defensa académica ante jueces evaluadores.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
Secure and efficient management of users, roles, and auditing is a key challenge in modern enterprise systems, where traceability and access control are critical for trust and compliance. This project integrates robust authentication, granular permission control, and an AI panel for analysis, addressing common limitations of generic solutions. Modular architecture, audit logging, and AI integration provide differential value, enabling adaptability, transparency, and strong academic defense before evaluators.

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

## 🎓 Contexto Académico y Propósito / Academic Context & Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**<br>
Este sistema corresponde al proyecto de grado para optar al título de Ingeniero de Sistemas (modalidad virtual) en la Universidad Santiago de Cali. Su desarrollo responde a los lineamientos de la asignatura “proyecto integrador profesional” y está dirigido a los jueces encargados de su evaluación y aprobación. El objetivo es demostrar competencias en análisis, diseño, desarrollo e integración de soluciones empresariales modernas, aplicando buenas prácticas de ingeniería de software, seguridad, despliegue y tecnologías de Inteligencia Artificial.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**<br>
This system is the graduation project for the Systems Engineering degree (virtual modality) at Universidad Santiago de Cali. It fulfills the requirements of the “professional integrative project” course and is addressed to the academic judges responsible for its evaluation and approval. The goal is to demonstrate proficiency in analysis, design, development, and integration of modern enterprise solutions, applying best practices in software engineering, security, deployment, and Artificial Intelligence technologies.

---

## 📝 Descripción General / General Description
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Plataforma web empresarial para gestión de usuarios, roles y permisos, con módulos de Inteligencia Artificial y Data Science. API full-stack para gestión de usuarios, roles, permisos y panel de IA. Incluye autenticación JWT, RBAC, logs de auditoría y dashboard interactivo. Pensado para despliegue seguro y escalable.<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Full-stack web platform for user, role, and permission management with AI and Data Science modules. Includes JWT authentication, RBAC, audit logs, and interactive dashboard. Designed for secure and scalable deployment.

---

## 🗂️ Tabla de Contenidos / Table of Contents
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**

- [Resumen Ejecutivo](docs/Resumen_Ejecutivo.md)
- [Alcance y Límites](docs/Alcance_y_Limites.md)
  - Changelog<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
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
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
```shell
/backend   # API Node.js/Express/Sequelize
/frontend  # SPA React/Vite/Tailwind
/ia        # Microservicio IA Python/Flask
/docs      # Documentación técnica
```
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
```shell
/backend   # Node.js/Express/Sequelize API
/frontend  # React/Vite/Tailwind SPA
/ia        # Python/Flask IA microservice
/docs      # Technical documentation
```

---

## ⚙️ Instalación y Configuración / Installation & Setup
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
1. Clona el repo y revisa los README de cada módulo.
2. Configura variables en `.env` y `backend/.env` (ver ejemplos).
3. Usa Docker Compose o instala dependencias manualmente.
4. Ejecuta migraciones y seed si es necesario.<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
1. Clone the repo and review each module's README.
2. Set variables in `.env` and `backend/.env` (see examples).
3. Use Docker Compose or install dependencies manually.
4. Run migrations and seed if needed.

---

## 🔒 Seguridad / Security
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- JWT fuerte y CORS restringido en prod
- Seeds demo solo en desarrollo
- Logs de auditoría y rate limit<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Strong JWT and restricted CORS in production
- Demo seeds only in development
- Audit logs and rate limiting

---

## 🧩 Módulos Principales / Main Modules
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Backend: API RESTful, RBAC, auditoría
- Frontend: SPA, dashboard, panel IA
- IA: Flask, análisis y predicción<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Backend: RESTful API, RBAC, audit
- Frontend: SPA, dashboard, IA panel
- IA: Flask, analysis and prediction

---

## 🛡️ Autenticación y Permisos / Auth & Permissions
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- JWT + refresh tokens
- RBAC por roles y permisos
- Logs de acceso y acciones<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- JWT + refresh tokens
- RBAC by roles and permissions
- Access and action logs

---

## 📚 Documentación Técnica / Technical Documentation
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- [API](docs/api.md)
- [Base de datos](docs/db.md)
- [Seguridad](docs/security.md)
- [Despliegue](docs/DEPLOY.md)
- [Backup/Restore](docs/RESTORE_BACKUP.md)
- [Changelog](docs/CHANGELOG.md)<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- [API](docs/api.md)
- [Database](docs/db.md)
- [Security](docs/security.md)
- [Deployment](docs/DEPLOY.md)
- [Backup/Restore](docs/RESTORE_BACKUP.md)
- [Changelog](docs/CHANGELOG.md)

---

## 🚀 Despliegue / Deployment
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- DigitalOcean App Platform (recomendado)
- Docker Compose (local/prod)<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- DigitalOcean App Platform (recommended)
- Docker Compose (local/prod)

---

## 🧪 Pruebas / Tests
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Backend (API/Node):
  - `npm test` dentro de la carpeta backend.
- Frontend (React):
  - `npm test` dentro de la carpeta frontend.<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Backend (API/Node):
  - `npm test` inside backend folder.
- Frontend (React):
  - `npm test` inside frontend folder.

---

## 💡 Lighthouse
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Ejecutar auditorías (mobile + desktop):
  - `npm run lighthouse` dentro de la carpeta frontend.
- Ver guía detallada: [docs/lighthouse.md](docs/lighthouse.md)<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Run audits (mobile + desktop):
  - `npm run lighthouse` inside frontend folder.
- See detailed guide: [docs/lighthouse.md](docs/lighthouse.md)

---

## 💾 Backup y Restauración / Backup & Restore
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Ver [docs/RESTORE_BACKUP.md](docs/RESTORE_BACKUP.md)<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** See [docs/RESTORE_BACKUP.md](docs/RESTORE_BACKUP.md)

---


## 📋 Política de Documentación y Trazabilidad / Documentation & Traceability Policy
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
Cada cambio funcional, técnico o de seguridad realizado en el sistema será documentado en el changelog ([docs/CHANGELOG.md](docs/CHANGELOG.md)) y en los archivos relevantes. Esto garantiza trazabilidad, transparencia y evidencia para la evaluación académica y profesional.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
Every functional, technical, or security change made to the system will be documented in the changelog ([docs/CHANGELOG.md](docs/CHANGELOG.md)) and in the relevant files. This ensures traceability, transparency, and evidence for academic and professional evaluation.

## 📝 Changelog
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Ver [docs/CHANGELOG.md](docs/CHANGELOG.md)<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** See [docs/CHANGELOG.md](docs/CHANGELOG.md)
