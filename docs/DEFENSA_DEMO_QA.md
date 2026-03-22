# 🎤 Plan de validación técnica (Demo + Q&A)

**Objetivo:** validar el prototipo actual y el enfoque de investigación con evidencia en el repositorio.

---

## 1) Guion de demo cronometrado (10–12 min) + Plan B

### 0:00–1:00 | Introducción
- Contexto: gestión de usuarios con RBAC, auditoría y componente IA como prueba de concepto.
- Mostrar trazabilidad y documentación de investigación aplicada.

**Evidencia:** [docs/PAQUETE_JURADO.md](docs/PAQUETE_JURADO.md)

### 1:00–3:00 | Login y RBAC
- Entrar con usuario demo.
- Mostrar menú dinámico según permisos.
- Ir a Usuarios/Roles/Permisos y mostrar restricciones.

**Evidencia:**
- [frontend/src/utils/permissions.js](frontend/src/utils/permissions.js)
- [frontend/src/layouts/MantineLayout.jsx](frontend/src/layouts/MantineLayout.jsx)
- [frontend/src/views/UsersView.jsx](frontend/src/views/UsersView.jsx)
- [frontend/src/views/RolesView.jsx](frontend/src/views/RolesView.jsx)
- [frontend/src/views/PermissionsView.jsx](frontend/src/views/PermissionsView.jsx)

### 3:00–5:00 | Auditoría
- Abrir Auditoría y mostrar eventos.
- Mencionar log de accesos fallidos incluso sin `req.user`.

**Evidencia:**
- [backend/src/routes/auditLogRoutes.js](backend/src/routes/auditLogRoutes.js)
- [backend/src/middleware/logFailedAccess.js](backend/src/middleware/logFailedAccess.js)
- [docs/security.md](docs/security.md)

### 5:00–7:00 | IA Panel (con control)
- Ingresar a panel IA con permiso válido.
- Mostrar que IA está restringida por permisos.

**Evidencia:**
- [backend/src/routes/iaPanelRoutes.js](backend/src/routes/iaPanelRoutes.js)
- [docs/ai_assistance.md](docs/ai_assistance.md)

### 7:00–9:00 | Health/Readiness + operación
- Mostrar `/health` y `/ready`.
- Mencionar scripts de arranque reproducible.

**Evidencia:**
- [backend/src/server.js](backend/src/server.js)
- [docs/DEPLOY.md](docs/DEPLOY.md)
- [scripts/start.sh](scripts/start.sh)

### 9:00–10:30 | Seguridad y pruebas
- Mencionar pruebas de API y no exposición de passwords.
- Mostrar que hay documentación de seguridad.

**Evidencia:**
- [backend/tests/api.test.js](backend/tests/api.test.js)
- [docs/security.md](docs/security.md)
- [docs/CHANGELOG.md](docs/CHANGELOG.md)

### 10:30–12:00 | Cierre
- Resaltar trazabilidad y reproducibilidad.
- Abrir Q&A.

**Plan B (si IA falla):**
- Mostrar vista de IA con mensaje de fallback y registrar auditoría.
- En demo, desactivar llamadas a IA y resaltar controles de acceso y trazabilidad.
- Alternativa: navegar documentación de IA y límites.

**Evidencia:**
- [docs/ai_assistance.md](docs/ai_assistance.md)
- [docs/ai_traceability/README.md](docs/ai_traceability/README.md)

---

## 2) Checklist pre‑demo

### Infra/puertos
- Frontend accesible en `http://localhost:5173`.
- Backend accesible en `http://localhost:3000`.
- IA panel levantado (docker compose).

### Datos
- Seed ejecutado en modo demo.
- Usuarios y roles creados.

### Acceso
- Login demo: `admin@demo.com` / `Password1!`.
- Permisos de admin validados.

### Auditoría
- Acceso correcto y acceso fallido logueados.

### IA
- Acceso con permiso válido.
- Validar Plan B si servicio IA no responde.

**Evidencia:**
- [docs/DEPLOY.md](docs/DEPLOY.md)
- [docs/db.md](docs/db.md)
- [backend/src/seed.js](backend/src/seed.js)

---

## 3) Preguntas del comité académico + respuestas

### 3.1 ¿Por qué JWT + refresh con rotación?
**Respuesta:**
- El access token es de vida corta para reducir ventana de riesgo.
- El refresh token permite renovar sesión sin re‑login constante.
- La rotación revoca tokens antiguos y reduce replay.

**Evidencia:**
- [backend/src/controllers/authController.js](backend/src/controllers/authController.js)
- [backend/models/RefreshToken.js](backend/models/RefreshToken.js)
- [backend/tests/api.test.js](backend/tests/api.test.js)

### 3.2 ¿Qué pasa si DB cae?
**Respuesta:**
- Health puede seguir respondiendo si el proceso está vivo.
- Readiness indica estado real de DB; si DB falla, `/ready` responde no‑ready.
- Orquestación puede usar readiness para reiniciar o sacar de balanceo.

**Evidencia:**
- [backend/src/server.js](backend/src/server.js)
- [docs/DEPLOY.md](docs/DEPLOY.md)

### 3.3 ¿Cómo aseguras CORS/secretos/logs?
**Respuesta:**
- CORS limitado a orígenes controlados (configurable por env).
- Secrets se gestionan con variables de entorno.
- Logging evita exposición de contraseñas y registra accesos fallidos.

**Evidencia:**
- [backend/src/server.js](backend/src/server.js)
- [docs/security.md](docs/security.md)
- [backend/src/middleware/logFailedAccess.js](backend/src/middleware/logFailedAccess.js)

### 3.4 ¿Cómo escalas RBAC?
**Respuesta:**
- Reglas centralizadas en matriz de permisos.
- Caché TTL para evitar recomputar permisos en cada request.
- Claims en JWT para reducir consultas.

**Evidencia:**
- [backend/src/constants/permissionMatrix.js](backend/src/constants/permissionMatrix.js)
- [backend/src/middleware/permission.js](backend/src/middleware/permission.js)

### 3.5 IA: riesgos y ética
**Respuesta:**
- IA opera con permisos explícitos y auditabilidad.
- Se limita acceso y se registra uso.
- El sistema no expone datos sensibles y documenta límites.

**Evidencia:**
- [docs/ai_assistance.md](docs/ai_assistance.md)
- [docs/ai_traceability/README.md](docs/ai_traceability/README.md)

---

## 4) Evidencia rápida (mapa de archivos)
- Seguridad: [docs/security.md](docs/security.md)
- API: [docs/api.md](docs/api.md)
- DB y migraciones: [docs/db.md](docs/db.md)
- Deploy y backup: [docs/DEPLOY.md](docs/DEPLOY.md), [docs/RESTORE_BACKUP.md](docs/RESTORE_BACKUP.md)
- Changelog: [docs/CHANGELOG.md](docs/CHANGELOG.md)
- Paquete jurado: [docs/PAQUETE_JURADO.md](docs/PAQUETE_JURADO.md)
