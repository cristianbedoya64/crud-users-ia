
# 📡 API (Backend) / API (Backend)

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: describe los endpoints del backend, su seguridad (JWT/RBAC) y el alcance funcional expuesto a frontend y a la integración con IA.
---

## 🎓 Contexto Académico y Destinatario / Academic Context & Audience
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Esta especificación de API hace parte del proyecto de grado (Ingeniería de Sistemas, modalidad virtual, Universidad Santiago de Cali) y está dirigida a los jueces evaluadores para facilitar la verificación de funcionalidades, seguridad y trazabilidad del sistema.

---

## 🧭 Alcance, narrativa y rúbrica (problema → solución → valor)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
La gestión segura y eficiente de usuarios, roles y auditoría es un reto clave en sistemas empresariales modernos, donde la trazabilidad y el control de acceso son críticos para la confianza y el cumplimiento. Este proyecto integra autenticación robusta, control granular de permisos y un panel de IA para análisis, resolviendo limitaciones comunes de soluciones genéricas. La arquitectura modular, el registro de auditoría y la integración de IA aportan valor diferencial, facilitando la adaptabilidad, la transparencia y la defensa académica ante jueces evaluadores.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
Secure and efficient management of users, roles, and auditing is a key challenge in modern enterprise systems, where traceability and access control are critical for trust and compliance. This project integrates robust authentication, granular permission control, and an AI panel for analysis, addressing common limitations of generic solutions. Modular architecture, audit logging, and AI integration provide differential value, enabling adaptability, transparency, and strong academic defense before evaluators.

<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This API specification is part of the graduation project (Systems Engineering, virtual modality, Universidad Santiago de Cali) and is intended for academic judges to validate functionality, security, and traceability.

---

## 🧭 Alcance y Reglas Generales / Scope & General Rules
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Todas las rutas (salvo login/refresh/logout) requieren `Authorization: Bearer <accessToken>` emitido por `POST /api/auth/login`.
- El acceso se controla por permisos RBAC (roles ↔ permisos).
- Los endpoints se agrupan por módulos para facilitar la revisión por parte de los evaluadores.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- All routes (except login/refresh/logout) require `Authorization: Bearer <accessToken>` issued by `POST /api/auth/login`.
- Access is controlled by RBAC permissions (roles ↔ permissions).
- Endpoints are grouped by module for easier academic review.

---

## 🔐 Autenticación / Authentication
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- POST `/api/auth/login` – Body `{ email, password }` → `{ accessToken, refreshToken, expiresIn, user, refreshExpiresAt }`
- POST `/api/auth/refresh` – Body `{ refreshToken }` → tokens rotados
- POST `/api/auth/logout` – Body `{ refreshToken }` (opcional) → 204, revoca refresh
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- POST `/api/auth/login` – Body `{ email, password }` → `{ accessToken, refreshToken, expiresIn, user, refreshExpiresAt }`
- POST `/api/auth/refresh` – Body `{ refreshToken }` → rotated tokens
- POST `/api/auth/logout` – Body `{ refreshToken }` (optional) → 204, revokes refresh

---

## 👤 Usuarios / Users
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- GET `/api/users` – Permiso `read_user` – Query `page, limit, search, status` → `{ total, page, limit, users[] }`
- GET `/api/users/:id` – Permiso `read_user`
- POST `/api/users` – Permiso `create_user` – Body `{ documentId, name, email, password, roles:[roleId] }`
- PUT `/api/users/:id` – Permiso `update_user` – Body `{ documentId, name, email, password?, roles:[roleId] }`
- DELETE `/api/users/:id` – Permiso `delete_user` – Soft delete (status=inactive)
- POST `/api/users/:id/restore` – Permiso `update_user` – Reactiva usuario
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- GET `/api/users` – Permission `read_user` – Query `page, limit, search, status` → `{ total, page, limit, users[] }`
- GET `/api/users/:id` – Permission `read_user`
- POST `/api/users` – Permission `create_user` – Body `{ documentId, name, email, password, roles:[roleId] }`
- PUT `/api/users/:id` – Permission `update_user` – Body `{ documentId, name, email, password?, roles:[roleId] }`
- DELETE `/api/users/:id` – Permission `delete_user` – Soft delete (status=inactive)
- POST `/api/users/:id/restore` – Permission `update_user` – Reactivates user

---

## 🧩 Roles / Roles
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- GET `/api/roles` – Permiso `manage_roles`
- POST `/api/roles` – Permiso `manage_roles` – Body `{ name, description? }`
- PUT `/api/roles/:id` – Permiso `manage_roles` – Body `{ name, description? }`
- DELETE `/api/roles/:id` – Permiso `manage_roles`
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- GET `/api/roles` – Permission `manage_roles`
- POST `/api/roles` – Permission `manage_roles` – Body `{ name, description? }`
- PUT `/api/roles/:id` – Permission `manage_roles` – Body `{ name, description? }`
- DELETE `/api/roles/:id` – Permission `manage_roles`

---

## 🔑 Permisos / Permissions
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- GET `/api/permissions` – Recomendado `manage_roles` (actualmente abierto tras auth)
- POST `/api/permissions` – Permiso `manage_roles` – Body `{ name, description? }`
- PUT `/api/permissions/:id` – Permiso `manage_roles` – Body `{ name, description? }`
- DELETE `/api/permissions/:id` – Permiso `manage_roles`
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- GET `/api/permissions` – `manage_roles` recommended (currently open after auth)
- POST `/api/permissions` – Permission `manage_roles` – Body `{ name, description? }`
- PUT `/api/permissions/:id` – Permission `manage_roles` – Body `{ name, description? }`
- DELETE `/api/permissions/:id` – Permission `manage_roles`

---

## 🔁 Roles ↔ Permisos / Roles ↔ Permissions
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- GET `/api/roles/:roleId/permissions` – Permiso `manage_roles`
- POST `/api/roles/:roleId/permissions` – Permiso `manage_roles` – Body `{ permissionIds:[id] }` (reemplaza set)
- DELETE `/api/roles/:roleId/permissions/:permissionId` – Permiso `manage_roles`
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- GET `/api/roles/:roleId/permissions` – Permission `manage_roles`
- POST `/api/roles/:roleId/permissions` – Permission `manage_roles` – Body `{ permissionIds:[id] }` (replaces set)
- DELETE `/api/roles/:roleId/permissions/:permissionId` – Permission `manage_roles`

---

## 🔁 Usuarios ↔ Roles / Users ↔ Roles
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- GET `/api/user-roles/:userId/roles` – Permiso `manage_roles`
- POST `/api/user-roles/:userId/roles` – Permiso `manage_roles` – Body `{ roleIds:[id] }` (reemplaza set)
- DELETE `/api/user-roles/:userId/roles/:roleId` – Permiso `manage_roles`
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- GET `/api/user-roles/:userId/roles` – Permission `manage_roles`
- POST `/api/user-roles/:userId/roles` – Permission `manage_roles` – Body `{ roleIds:[id] }` (replaces set)
- DELETE `/api/user-roles/:userId/roles/:roleId` – Permission `manage_roles`

---

## 🧾 Auditoría / Audit
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- POST `/api/audit` – Auth – Body `{ userId, action, details? }` → 201 (registra evento)
- GET `/api/audit` – Permiso `view_audit` – Query `userId?, action?, from?, to?` → lista logs
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- POST `/api/audit` – Auth – Body `{ userId, action, details? }` → 201 (registers event)
- GET `/api/audit` – Permission `view_audit` – Query `userId?, action?, from?, to?` → logs list

---

## 🤖 Panel IA / IA Panel
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- POST `/api/ia-panel` – Auth – Body libre `{ num_roles?, is_admin?, activity_score? }` → proxy a Flask `/ia-panel` y retorna `{ suggestions, anomalies, predictions }`
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- POST `/api/ia-panel` – Auth – Free body `{ num_roles?, is_admin?, activity_score? }` → proxies to Flask `/ia-panel` and returns `{ suggestions, anomalies, predictions }`

---

## 📊 Dashboard (demo / backoffice)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- GET `/api/audit` – Ver sección Auditoría (usado por dashboard)
- GET `/api/demo/security-alerts` – Demo (auth)
- GET `/api/demo/change-history` – Demo
- GET `/api/demo/system-status` – Demo
- GET `/api/demo/user-growth` – Demo
- GET `/api/demo/module-access` – Demo
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- GET `/api/audit` – See Audit section (used by dashboard)
- GET `/api/demo/security-alerts` – Demo (auth)
- GET `/api/demo/change-history` – Demo
- GET `/api/demo/system-status` – Demo
- GET `/api/demo/user-growth` – Demo
- GET `/api/demo/module-access` – Demo

---

## 📈 Dashboard (real)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- GET `/api/dashboard/top-permissions` – Agregación real de permisos más usados
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- GET `/api/dashboard/top-permissions` – Real aggregation of most used permissions

---

## 🧷 Matriz de permisos (base) / Base Permission Matrix
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `create_user`, `read_user`, `update_user`, `delete_user`
- `manage_roles` (roles, permisos, asignaciones)
- `view_audit`
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `create_user`, `read_user`, `update_user`, `delete_user`
- `manage_roles` (roles, permissions, assignments)
- `view_audit`
