
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
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**


### 2026-02-03
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Endurecimiento de serialización de usuario: la contraseña nunca se expone en respuestas ni logs.
- Exclusión de campo `password` en modelo y controladores de usuario.
- Control de exposición del microservicio IA: solo accesible vía backend, sin puerto público por defecto.
- Documentación de amenaza y mitigación para IA en `docs/security.md`.
- Endpoints `/health` y `/ready` agregados al backend para monitoreo y confiabilidad.
- El backend siempre responde HTTP, incluso si la DB falla; errores de DB se loguean claramente.
- Compatibilidad con Codespaces y despliegue seguro en Docker Compose.
- Actualización de README y documentación técnica para reflejar cambios de seguridad y arquitectura.
- Se establece política: todo cambio futuro será documentado en este changelog y en los archivos relevantes.
- Auditoría: rutas dummy limitadas a `/api/demo/*` y `/api/audit` queda inequívoco.
- Auditoría: registro de 401/403 incluso sin `req.user` (userId=0 como anónimo/indeterminado).
- Auditoría: filtros y permisos `view_audit` se mantienen en `/api/audit` (auditLogRoutes).
- Documentado el uso de IA (GitHub Copilot) y el proceso de validación en `docs/ai_assistance.md`.
- Creada carpeta de trazabilidad de prompts IA en `docs/ai_traceability/`.
- Seed: `documentId` demo alineado con validaciones (solo numérico 6-12 dígitos).
- Seed: separación demo/prod vía `SEED_MODE` y contraseña demo actualizada.
- Migraciones: `migrate.js` evita `sync` en producción y documenta uso de migraciones.
- RBAC: cache TTL para permisos (`PERMISSION_CACHE_TTL_MS`) y menor carga por request.
- RBAC: `GET /api/permissions` ahora requiere `manage_roles` (consistencia con docs).
- Frontend: tabla de referencia de permisos alineada con matriz real.
- Documentación IA: enlace a trazabilidad de prompts en `docs/ai_assistance.md`.
- UX: menú por capacidades (oculta módulos sin permisos) y acciones restringidas por rol.
- UX: formulario de asignación de permisos unificado con Mantine.
- UX: estados vacíos y mensajes consistentes.
- Pruebas: suite mínima (password no expuesto, RBAC 403, refresh tokens).
- Docs: sección de cobertura mínima de tests en backend README.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Hardened user serialization: password is never exposed in responses or logs.
- Exclusion of `password` field in user model and controllers.
- IA microservice exposure controlled: only accessible via backend, no public port by default.
- Threat and mitigation for IA documented in `docs/security.md`.
- `/health` and `/ready` endpoints added to backend for monitoring and reliability.
- Backend always responds HTTP, even if DB fails; DB errors are logged clearly.
- Codespaces compatibility and secure deployment in Docker Compose.
- README and technical documentation updated to reflect security and architecture changes.
- Policy established: all future changes will be documented in this changelog and relevant files.
- Audit: dummy routes limited to `/api/demo/*` and `/api/audit` is unambiguous.
- Audit: 401/403 logging even without `req.user` (userId=0 as anonymous/unknown).
- Audit: filters and `view_audit` permission remain enforced on `/api/audit` (auditLogRoutes).
- Documented AI usage (GitHub Copilot) and validation process in `docs/ai_assistance.md`.
- Created AI prompt traceability folder in `docs/ai_traceability/`.
- Seed: demo `documentId` aligned with validations (numeric 6-12 digits only).
- Seed: demo/prod separation via `SEED_MODE` and demo password updated.
- Migrations: `migrate.js` avoids `sync` in production and documents migrations usage.
- RBAC: TTL cache for permissions (`PERMISSION_CACHE_TTL_MS`) and reduced per-request load.
- RBAC: `GET /api/permissions` now requires `manage_roles` (docs consistency).
- Frontend: permissions reference table aligned with real matrix.
- AI docs: prompt traceability link added in `docs/ai_assistance.md`.
- UX: capability-based menu (hides modules without permissions) and role-restricted actions.
- UX: permissions assignment form unified with Mantine.
- UX: consistent empty states and messages.
- Tests: minimal suite (no password exposure, RBAC 403, refresh tokens).
- Docs: minimum test coverage section in backend README.
- QA: reproducible Lighthouse guide and improvement explanation.
- DevOps: start.sh robusto (health DB, migración/seed con reintentos, modos por env).
- Docs: DEPLOY/RESTORE actualizados para reproducibilidad.
- Docs: Lighthouse command reference added to frontend README.
- UX: credenciales demo por defecto actualizadas en login (Password1!).
- UX: header móvil evita desborde del bloque de usuario.
