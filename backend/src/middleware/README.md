# 🧩 Middleware (Backend) / Middleware (Backend)

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: describe el conjunto de middlewares del backend usados para seguridad, control de acceso, auditoría y protección operacional.

---

## 🎓 Contexto Académico y Propósito / Academic Context & Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Los middlewares evidencian prácticas clave: autenticación, autorización por permisos (RBAC), auditoría y mitigación de abuso (rate limiting).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Middlewares demonstrate key practices: authentication, permission-based authorization (RBAC), auditing, and abuse mitigation (rate limiting).

---

## 🧱 Archivos / Files
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `auth.js`: verificación de autenticación (JWT) y/o protección de rutas.
- `permission.js`: validación de permisos requeridos por endpoint (RBAC).
- `audit.js`: registro de acciones relevantes (auditoría).
- `logFailedAccess.js`: registro de accesos fallidos/no autorizados.
- `rateLimit.js`: limitación de solicitudes para protección básica.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `auth.js`: authentication checks (JWT) and/or route protection.
- `permission.js`: required permission enforcement (RBAC).
- `audit.js`: action logging (audit trail).
- `logFailedAccess.js`: failed/unauthorized access logging.
- `rateLimit.js`: request limiting for basic protection.

---

## ✅ Recomendaciones / Recommendations
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Mantén el orden de ejecución consistente (auth → permisos → auditoría) y documenta los requisitos de permisos en `docs/api.md`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Keep execution order consistent (auth → permissions → audit) and document permission requirements in `docs/api.md`.
