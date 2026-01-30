
# 🗒️ Changelog de Documentación / Documentation Changelog

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: registra la evolución de la documentación y cambios funcionales relevantes reportados, aportando trazabilidad y evidencia de madurez del proyecto.

---

## 🎓 Contexto Académico y Destinatario / Academic Context & Audience
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este registro facilita la evaluación al mostrar el avance de documentación, despliegue, configuración y mejoras del sistema que impactan seguridad, auditoría y experiencia de usuario.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This log supports evaluation by documenting documentation/deployment/config evolution and system improvements affecting security, auditing, and UX.

---

## ✅ Lineamientos / Guidelines
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Registra cambios por fecha.
- Incluye cambios que afecten reproducibilidad (deploy/restore), seguridad, y documentación de API/DB.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Record changes by date.
- Include changes affecting reproducibility (deploy/restore), security, and API/DB documentation.

---

## 📌 Historial / History

### 2025-12-31
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Ampliado `docs/DEPLOY.md` con pasos detallados en DigitalOcean App Platform, Docker/Droplet y nueva sección para `docker-compose.prod.yml`.
- Actualizados README raíz, backend, frontend, IA, índice docs y creado `frontend/src/README.md`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Expanded `docs/DEPLOY.md` with detailed steps for DigitalOcean App Platform, Docker/Droplet, and a new section for `docker-compose.prod.yml`.
- Updated root/backend/frontend/AI READMEs, docs index, and created `frontend/src/README.md`.

### 2026-01-14
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Unificados y ampliados `.env.example` raíz y backend.
- Añadido `docs/RESTORE_BACKUP.md` (guía de restauración y actualización).
- Índice docs actualizado.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Unified and expanded root and backend `.env.example`.
- Added `docs/RESTORE_BACKUP.md` (restore and update guide).
- Updated docs index.

### 2026-01-27
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Roles: edición de roles y permisos sin salir de la vista.
- Permisos: edición con nombre/descripción y acciones en lista.
- Auditoría: filtros por usuario, acción y fecha; muestra `createdBy`.
- Usuarios: confirmación de eliminación y limpieza de filtros al alternar inactivos.
- IA: fallback visible cuando el modelo no está disponible.
- UX: loaders visibles en tablas principales y validaciones consistentes en login/usuarios.
- Limpieza: eliminados placeholders no usados en layouts/components.
- UI: tema Mantine y layout modernizados para una apariencia profesional.
- Estructura: docs movidos a docs/ y scripts a scripts/.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Roles: role and permissions editing without leaving the view.
- Permissions: edit name/description and list actions.
- Auditing: filters by user/action/date; shows `createdBy`.
- Users: delete confirmation and filter cleanup when toggling inactive.
- AI: visible fallback when the model is unavailable.
- UX: visible loaders on main tables and consistent validations in login/users.
- Cleanup: removed unused placeholders in layouts/components.
- UI: Mantine theme and layout modernized for a professional look.
- Structure: docs moved to `docs/` and scripts to `scripts/`.
