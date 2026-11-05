
# 🗒️ Changelog de Documentación / Documentation Changelog

> **Trabajo de Grado – Facultad de Ingeniería**<br>
> **Universidad Santiago de Cali**<br>
> **Enfoque:** propuesta de investigación y desarrollo tecnológico con IA para scoring de riesgo.<br>
>
> Documento técnico de trazabilidad: registra la evolución de la documentación y cambios funcionales relevantes para la evaluación académica.

---

## 🎓 Contexto Académico / Academic Context
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este registro facilita la evaluación al mostrar el avance de documentación, despliegue, configuración y mejoras del sistema que impactan seguridad, auditoría y el enfoque de investigación.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This log supports evaluation by documenting documentation/deployment/config evolution and system improvements affecting security, auditing, and the research focus.

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

### 2026-11-04
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Consolidado el contrato de `GET /api/dashboard/summary` (protegido con `view_audit`) en `users { total, active, inactive, recent }`, `roles`, `audit { recent, byAction, failedAccess }`, `activity` y `services`; `generatedAt` conserva la marca temporal de generación.
- Las consultas y listas del resumen tienen límites explícitos y no exponen contraseñas ni secretos. `/api/dashboard/top-permissions` y `/api/demo/*` conservan su contrato.
- El frontend del dashboard consume `GET /api/dashboard/summary` con `authFetch`, incluye estados de carga, error y vacío, y dejó de consultar endpoints CRUD/auditoría o datos demo para completar el panel.
- El dashboard actualiza el resumen automáticamente cada 30 segundos y ofrece actualización manual; evita solicitudes superpuestas, muestra la última actualización y conserva los últimos datos válidos si falla un refresco posterior.
- Validación integral: backend 4 suites/9 pruebas, frontend 3 archivos/4 pruebas, build Vite exitoso, health/readiness reales correctos, resumen real validado con administrador y acceso rechazado con 403 para usuario sin `view_audit`.
- Corregido el conteo paginado de usuarios con múltiples roles usando `distinct`, evitando que `/api/users` reporte duplicados frente al resumen del dashboard.
- Auditoría viva: `GET /api/audit` ahora usa consultas Sequelize paginadas (máximo 100), conserva sus filtros, resuelve el ejecutor mediante `User`, sanitiza detalles y entrega acción, recurso, resultado y fecha para la vista.
- `AuditView` consume el contrato paginado y muestra filtros, paginación y estados de carga, error y vacío.
- Documentación consolidada: se identifican explícitamente los endpoints `/api/demo/*` que el dashboard actual dejó de consumir y que permanecen solo por compatibilidad; se documentan sus reemplazos reales y la semántica de `top-permissions`.
- Corregido el título de la gráfica de actividad: ahora muestra `Actividad de Auditoría por Fecha`, alineado con los datos diarios reales de `AuditLogs`.
- Implementada `moduleActivity` en el resumen del dashboard, agrupando acciones reales de auditoría por módulo y reemplazando el estado vacío de la tarjeta.
- Los inicios de sesión exitosos ahora se registran en `AuditLogs`; el resumen expone los cinco eventos más recientes mediante `lastLogins` y el dashboard los muestra en “Últimos accesos”.
- Separado el “Historial de Cambios” de “Alertas de Seguridad”: los accesos rechazados ya no se presentan como cambios.
- Traducidas las acciones técnicas de auditoría en el dashboard y en la vista de auditoría mediante etiquetas comprensibles para usuarios finales.
- Reforzada la actualización automática del dashboard cada 30 segundos, incluyendo permisos, últimos accesos y auditoría, con cuenta regresiva visible hasta el siguiente refresco.
- Añadidas gráficas reales para nuevos usuarios, actividad de seguridad y actividad por módulo; se incorporó ECharts como tecnología de visualización y todas las métricas respetan el polling existente.
- Añadido hero 3D opcional con React Three Fiber, carga diferida, fallback 2D, soporte para movimiento reducido, pausa por pestaña oculta y una única bandera de configuración.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Consolidated the `GET /api/dashboard/summary` contract (protected by `view_audit`) as `users { total, active, inactive, recent }`, `roles`, `audit { recent, byAction, failedAccess }`, `activity`, and `services`; `generatedAt` remains the generation timestamp.
- Summary queries and lists have explicit limits and never expose passwords or secrets. `/api/dashboard/top-permissions` and `/api/demo/*` keep their contract.
- The frontend dashboard now consumes `GET /api/dashboard/summary` through `authFetch`, with loading, error, and empty states, without CRUD/audit or demo requests.
- The dashboard refreshes the summary every 30 seconds and provides manual refresh, prevents overlapping requests, displays the last update, and preserves the last valid data when a later refresh fails.
- Full validation completed: 4 backend suites/9 tests, 3 frontend files/4 tests, successful Vite build, real health/readiness checks, admin summary validated, and a 403 confirmed for a user without `view_audit`.
- Documentation consolidated: the `/api/demo/*` endpoints no longer consumed by the current dashboard are explicitly marked as compatibility-only, with their real replacements and the `top-permissions` semantics documented.
- Corrected the activity chart title to `Actividad de Auditoría por Fecha`, matching the real daily `AuditLogs` data.
- Added `moduleActivity` to the dashboard summary, grouping real audit actions by module and replacing the card's empty state.
- Successful logins are now recorded in `AuditLogs`; the summary exposes the five most recent events through `lastLogins`, and the dashboard displays them in “Últimos accesos”.
- Separated “Historial de Cambios” from “Alertas de Seguridad”: rejected accesses are no longer presented as changes.
- Translated technical audit actions in the dashboard and audit view using user-facing labels.
- Reinforced automatic dashboard refresh every 30 seconds, including permissions, recent logins, and audit data, with a visible countdown to the next refresh.
- Added real charts for new users, security activity, and module activity; ECharts was introduced as the visualization technology and all metrics use the existing polling.
- Added an optional lazy-loaded React Three Fiber hero with a 2D fallback, reduced-motion support, visibility pause, and a single feature flag.

### 2026-03-22
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Reescritura de documentación para enfoque de propuesta de investigación y desarrollo tecnológico.
- README y docs alineados con microservicio de scoring de riesgo con IA (Random Forest) y RBAC.
- Anteproyecto (borrador) agregado para planteamiento del problema y justificación.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Documentation rewritten to align with the research and technological development proposal.
- README and docs aligned with the AI risk-scoring microservice (Random Forest) and RBAC.
- Draft anteproyecto added for problem statement and justification.

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
