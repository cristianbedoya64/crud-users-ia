
# 🧭 Trazabilidad de Prompts (IA) / AI Prompt Traceability

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: registra prompts clave que influyen en arquitectura, seguridad y escalabilidad del proyecto.

---

## 🎓 Contexto Académico y Propósito / Academic Context & Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
Este registro aporta transparencia sobre el uso de IA en decisiones arquitectónicas. Se documentan prompts relevantes y su impacto (sin exponer información sensible).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
This log provides transparency about AI usage in architectural decisions. It documents relevant prompts and their impact (without exposing sensitive information).

---

## ✅ Lineamientos / Guidelines
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Registrar solo prompts que afecten arquitectura, seguridad o escalabilidad.
- Desde ahora, todo cambio documentado debe incluir también su registro en esta trazabilidad cuando haya prompts relevantes.
- No incluir datos sensibles, credenciales, tokens o información personal.
- Cada entrada debe incluir fecha, contexto, decisión y resultado.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Record only prompts that affect architecture, security, or scalability.
- From now on, every documented change must also include its prompt traceability entry when relevant prompts exist.
- Do not include sensitive data, credentials, tokens, or personal information.
- Each entry must include date, context, decision, and outcome.

---

## 🧾 Plantilla de Registro / Log Template
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Fecha:** AAAA-MM-DD
- **Contexto:** Qué problema se resolvía.
- **Prompt (resumen):** Descripción breve del prompt.
- **Decisión:** Qué se decidió a partir de la respuesta.
- **Resultado:** Cambios aplicados y archivos afectados.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Date:** YYYY-MM-DD
- **Context:** What problem was being solved.
- **Prompt (summary):** Short description of the prompt.
- **Decision:** What was decided from the response.
- **Outcome:** Applied changes and affected files.

---

## 📌 Historial / History

> **Nota:** Este historial incluye únicamente información confirmada en este repositorio y en la conversación actual.

### 2026-02-03 (Datos/BD)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Contexto:** Coherencia entre seed, validaciones y datos demo; separación demo/prod; migraciones.
- **Prompt (resumen):** Solicitud de alinear `documentId` demo con validaciones y definir estrategia de migración/seed.
- **Decisión:** `SEED_MODE` para demo/prod, `documentId` demo numérico, evitar `sync` en producción.
- **Resultado:** Cambios en `backend/src/seed.js`, `backend/src/migrate.js` y `docs/db.md`.
- **Copilot hizo:** Ajustes de seed/migración y documentación técnica.
- **Yo hice:** Definición de reglas de dominio y validación de criterios.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Context:** Seed/validation consistency, demo/prod split, migrations strategy.
- **Prompt (summary):** Request to align demo `documentId` with validation and define migration/seed strategy.
- **Decision:** `SEED_MODE` for demo/prod, numeric demo `documentId`, avoid `sync` in production.
- **Outcome:** Changes in `backend/src/seed.js`, `backend/src/migrate.js`, and `docs/db.md`.
- **Copilot did:** Seed/migration adjustments and technical documentation.
- **I did:** Domain rules definition and criteria validation.

### 2026-02-03 (RBAC/Performance)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Contexto:** Consistencia de permisos y respuesta técnica de escalabilidad.
- **Prompt (resumen):** Solicitud de alinear permisos frontend/back y optimizar verificación.
- **Decisión:** Cache TTL de permisos y documentación de endpoints protegidos.
- **Resultado:** Cambios en `backend/src/middleware/permission.js`, `backend/src/routes/permissionRoutes.js`, `docs/api.md` y `frontend/src/components/PermissionsReferenceTable.jsx`.
- **Copilot hizo:** Ajustes de middleware, documentación y tabla de referencia.
- **Yo hice:** Validación de reglas RBAC y criterios de seguridad.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Context:** Permission consistency and scalability answer.
- **Prompt (summary):** Request to align frontend/back permissions and optimize checks.
- **Decision:** Permission TTL cache and documented protected endpoints.
- **Outcome:** Changes in `backend/src/middleware/permission.js`, `backend/src/routes/permissionRoutes.js`, `docs/api.md`, and `frontend/src/components/PermissionsReferenceTable.jsx`.
- **Copilot did:** Middleware, documentation, and reference table updates.
- **I did:** RBAC rules validation and security criteria.

### 2026-02-03 (UX/Usabilidad)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Contexto:** Evitar navegación a 403, homogeneizar UI y mejorar accesibilidad básica.
- **Prompt (resumen):** Solicitud de ocultar módulos por permisos y unificar el formulario de asignación.
- **Decisión:** Menú por capacidades, acciones restringidas y formulario Mantine.
- **Resultado:** Cambios en `MantineLayout.jsx`, `AssignPermissionsForm.jsx`, `PermissionsView.jsx`, `RolesView.jsx`, `UsersView.jsx`.
- **Copilot hizo:** Ajustes de UI y control de permisos en vistas.
- **Yo hice:** Validación de criterios UX y consistencia de mensajes.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Context:** Avoid 403 navigation, unify UI, and improve basic accessibility.
- **Prompt (summary):** Request to hide modules by permissions and unify assignment form.
- **Decision:** Capability-based menu, restricted actions, Mantine-based form.
- **Outcome:** Changes in `MantineLayout.jsx`, `AssignPermissionsForm.jsx`, `PermissionsView.jsx`, `RolesView.jsx`, `UsersView.jsx`.
- **Copilot did:** UI adjustments and permission controls in views.
- **I did:** UX criteria validation and message consistency.

### 2026-02-03 (Pruebas)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Contexto:** Evidencia mínima para jurado (seguridad y RBAC).
- **Prompt (resumen):** Solicitud de definir estrategia y agregar tests críticos.
- **Decisión:** Tests para no exponer password, RBAC 403 y refresh tokens.
- **Resultado:** Cambios en `backend/tests/api.test.js` y documentación en `backend/README.md`.
- **Copilot hizo:** Implementación de pruebas y documentación.
- **Yo hice:** Validación de criterios de cobertura.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Context:** Minimal evidence for evaluation (security and RBAC).
- **Prompt (summary):** Request to define strategy and add critical tests.
- **Decision:** Tests for no password exposure, RBAC 403, and refresh tokens.
- **Outcome:** Changes in `backend/tests/api.test.js` and documentation in `backend/README.md`.
- **Copilot did:** Test implementation and documentation.
- **I did:** Coverage criteria validation.

### 2026-02-03 (QA/Lighthouse)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Contexto:** Evidencia de calidad frontend con Lighthouse CI.
- **Prompt (resumen):** Solicitud de mantener Lighthouse CI y ejecución reproducible.
- **Decisión:** Documentar pasos reproducibles y cómo explicar mejoras.
- **Resultado:** Cambios en `docs/lighthouse.md` y `frontend/README.md`.
- **Copilot hizo:** Ajustes de documentación Lighthouse.
- **Yo hice:** Validación de criterios de QA.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Context:** Frontend quality evidence with Lighthouse CI.
- **Prompt (summary):** Request to keep Lighthouse CI and reproducible execution.
- **Decision:** Document reproducible steps and how to explain improvements.
- **Outcome:** Changes in `docs/lighthouse.md`.
- **Copilot did:** Lighthouse documentation updates.
- **I did:** QA criteria validation.

### 2026-02-03 (DevOps/Operación)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Contexto:** Reproducibilidad de arranque y evitar romper producción.
- **Prompt (resumen):** Solicitud de robustecer start.sh y separar modos local/codespaces/prod-demo.
- **Decisión:** Health de DB, migración/seed con reintentos y variables de modo.
- **Resultado:** Cambios en `scripts/start.sh`, `docs/DEPLOY.md`, `docs/RESTORE_BACKUP.md`.
- **Copilot hizo:** Implementación de start.sh y actualización de docs.
- **Yo hice:** Validación de criterios de operación segura.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Context:** Reproducible startup and avoid breaking production.
- **Prompt (summary):** Request to harden start.sh and separate local/codespaces/prod-demo modes.
- **Decision:** DB health wait, migrate/seed retries, and mode variables.
- **Outcome:** Changes in `scripts/start.sh`, `docs/DEPLOY.md`, `docs/RESTORE_BACKUP.md`.
- **Copilot did:** start.sh implementation and docs updates.
- **I did:** Safe ops criteria validation.

### 2026-02-03 (UX/Login demo)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Contexto:** Evitar 401 por credenciales demo desactualizadas.
- **Prompt (resumen):** Solicitud de configurar credenciales demo por defecto.
- **Decisión:** Actualizar valores por defecto a `Password1!`.
- **Resultado:** Cambios en `frontend/src/views/LoginView.jsx`.
- **Copilot hizo:** Ajuste de valores por defecto y mensaje UI.
- **Yo hice:** Validación de credenciales demo.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Context:** Avoid 401 due to outdated demo credentials.
- **Prompt (summary):** Request to set default demo credentials.
- **Decision:** Update defaults to `Password1!`.
- **Outcome:** Changes in `frontend/src/views/LoginView.jsx`.
- **Copilot did:** Default values and UI message update.
- **I did:** Demo credential validation.

### 2026-02-03 (UX/Header móvil)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Contexto:** Desborde del bloque de usuario en la barra superior móvil.
- **Prompt (resumen):** Ajustar layout para evitar overflow y ocultar contenido.
- **Decisión:** Permitir wrap y ajustar alineación en header.
- **Resultado:** Cambios en `frontend/src/layouts/MantineLayout.jsx`.
- **Copilot hizo:** Ajuste de layout y estilos.
- **Yo hice:** Validación visual en móvil.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Context:** User block overflow on mobile header.
- **Prompt (summary):** Adjust layout to avoid overflow and hidden content.
- **Decision:** Allow wrap and adjust header alignment.
- **Outcome:** Changes in `frontend/src/layouts/MantineLayout.jsx`.
- **Copilot did:** Layout and styling adjustments.
- **I did:** Mobile visual validation.

### 2026-02-03
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- **Contexto:** Endurecer seguridad, exposición IA y confiabilidad del backend.
- **Prompt (resumen):** Solicitud de controles de seguridad, endpoints de salud y postura de IA.
- **Decisión:** Aislar IA detrás del backend, agregar `/health` y `/ready`, reforzar logs y documentación.
- **Resultado:** Cambios en backend y documentación; ver `docs/CHANGELOG.md`.
- **Copilot hizo:** Implementaciones y ajustes en server, rutas, auditoría y documentación.
- **Yo hice:** Validación, pruebas y decisiones finales de despliegue.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- **Context:** Harden security, IA exposure, and backend reliability.
- **Prompt (summary):** Request for security controls, health endpoints, and IA posture.
- **Decision:** Isolate IA behind backend, add `/health` and `/ready`, strengthen logs and documentation.
- **Outcome:** Changes in backend and documentation; see `docs/CHANGELOG.md`.
- **Copilot did:** Implementations and updates in server, routes, auditing, and docs.
- **I did:** Validation, tests, and final deployment decisions.
