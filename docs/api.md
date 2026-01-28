
# API UARP-AI
# API UARP-AI

---

Guía rápida de endpoints. Todas las rutas (salvo login/refresh/logout) requieren `Authorization: Bearer <accessToken>` emitido por `/api/auth/login`. Permisos según RBAC.
Quick endpoint guide. All routes (except login/refresh/logout) require `Authorization: Bearer <accessToken>` issued by `/api/auth/login`. Permissions follow RBAC.

---

## Autenticación
## Authentication
- POST `/api/auth/login` – Body `{ email, password }` → `{ accessToken, refreshToken, expiresIn, user, refreshExpiresAt }`
	POST `/api/auth/login` – Body `{ email, password }` → `{ accessToken, refreshToken, expiresIn, user, refreshExpiresAt }`
- POST `/api/auth/refresh` – Body `{ refreshToken }` → tokens rotados
	POST `/api/auth/refresh` – Body `{ refreshToken }` → rotated tokens
- POST `/api/auth/logout` – Body `{ refreshToken }` (opcional) → 204, revoca refresh
	POST `/api/auth/logout` – Body `{ refreshToken }` (optional) → 204, revokes refresh

---

## Usuarios
## Users
- GET `/api/users` – Permiso `read_user` – Query `page, limit, search, status` → `{ total, page, limit, users[] }`
	GET `/api/users` – Permission `read_user` – Query `page, limit, search, status` → `{ total, page, limit, users[] }`
- GET `/api/users/:id` – Permiso `read_user`
	GET `/api/users/:id` – Permission `read_user`
- POST `/api/users` – Permiso `create_user` – Body `{ documentId, name, email, password, roles:[roleId] }`
	POST `/api/users` – Permission `create_user` – Body `{ documentId, name, email, password, roles:[roleId] }`
- PUT `/api/users/:id` – Permiso `update_user` – Body `{ documentId, name, email, password?, roles:[roleId] }`
	PUT `/api/users/:id` – Permission `update_user` – Body `{ documentId, name, email, password?, roles:[roleId] }`
- DELETE `/api/users/:id` – Permiso `delete_user` – Soft delete (status=inactive)
	DELETE `/api/users/:id` – Permission `delete_user` – Soft delete (status=inactive)
- POST `/api/users/:id/restore` – Permiso `update_user` – Reactiva usuario
	POST `/api/users/:id/restore` – Permission `update_user` – Reactivates user

---

## Roles
## Roles
- GET `/api/roles` – Permiso `manage_roles`
	GET `/api/roles` – Permission `manage_roles`
- POST `/api/roles` – Permiso `manage_roles` – Body `{ name, description? }`
	POST `/api/roles` – Permission `manage_roles` – Body `{ name, description? }`
- PUT `/api/roles/:id` – Permiso `manage_roles` – Body `{ name, description? }`
	PUT `/api/roles/:id` – Permission `manage_roles` – Body `{ name, description? }`
- DELETE `/api/roles/:id` – Permiso `manage_roles`
	DELETE `/api/roles/:id` – Permission `manage_roles`

---

## Permisos
## Permissions
- GET `/api/permissions` – Permiso `manage_roles` recomendado (actualmente abierto tras auth)
	GET `/api/permissions` – Permission `manage_roles` recommended (currently open after auth)
- POST `/api/permissions` – Permiso `manage_roles` – Body `{ name, description? }`
	POST `/api/permissions` – Permission `manage_roles` – Body `{ name, description? }`
- PUT `/api/permissions/:id` – Permiso `manage_roles` – Body `{ name, description? }`
	PUT `/api/permissions/:id` – Permission `manage_roles` – Body `{ name, description? }`
- DELETE `/api/permissions/:id` – Permiso `manage_roles`
	DELETE `/api/permissions/:id` – Permission `manage_roles`

---

## Roles ↔ Permisos
## Roles ↔ Permissions
- GET `/api/roles/:roleId/permissions` – Permiso `manage_roles`
	GET `/api/roles/:roleId/permissions` – Permission `manage_roles`
- POST `/api/roles/:roleId/permissions` – Permiso `manage_roles` – Body `{ permissionIds:[id] }` (reemplaza set)
	POST `/api/roles/:roleId/permissions` – Permission `manage_roles` – Body `{ permissionIds:[id] }` (replaces set)
- DELETE `/api/roles/:roleId/permissions/:permissionId` – Permiso `manage_roles`
	DELETE `/api/roles/:roleId/permissions/:permissionId` – Permission `manage_roles`

---

## Usuarios ↔ Roles
## Users ↔ Roles
- GET `/api/user-roles/:userId/roles` – Permiso `manage_roles`
	GET `/api/user-roles/:userId/roles` – Permission `manage_roles`
- POST `/api/user-roles/:userId/roles` – Permiso `manage_roles` – Body `{ roleIds:[id] }` (reemplaza set)
	POST `/api/user-roles/:userId/roles` – Permission `manage_roles` – Body `{ roleIds:[id] }` (replaces set)
- DELETE `/api/user-roles/:userId/roles/:roleId` – Permiso `manage_roles`
	DELETE `/api/user-roles/:userId/roles/:roleId` – Permission `manage_roles`

---

## Auditoría
## Audit
- POST `/api/audit` – Auth – Body `{ userId, action, details? }` → 201 (registre evento)
	POST `/api/audit` – Auth – Body `{ userId, action, details? }` → 201 (registers event)
- GET `/api/audit` – Permiso `view_audit` – Query `userId?, action?, from?, to?` → lista logs
	GET `/api/audit` – Permission `view_audit` – Query `userId?, action?, from?, to?` → logs list

---

## Panel IA
## IA Panel
- POST `/api/ia-panel` – Auth – Body libre `{ num_roles?, is_admin?, activity_score? }` → proxy a Flask `/ia-panel` y retorna `{ suggestions, anomalies, predictions }`
	POST `/api/ia-panel` – Auth – Free body `{ num_roles?, is_admin?, activity_score? }` → proxies to Flask `/ia-panel` and returns `{ suggestions, anomalies, predictions }`

---

## Dashboard (demo/backoffice)
## Dashboard (demo/backoffice)
- GET `/api/audit` – Ver arriba (usado por dashboard)
	GET `/api/audit` – See above (used by dashboard)
- GET `/api/demo/security-alerts` – Demo (auth)
	GET `/api/demo/security-alerts` – Demo (auth)
- GET `/api/demo/change-history` – Demo
	GET `/api/demo/change-history` – Demo
- GET `/api/demo/system-status` – Demo
	GET `/api/demo/system-status` – Demo
- GET `/api/demo/user-growth` – Demo
	GET `/api/demo/user-growth` – Demo
- GET `/api/demo/module-access` – Demo
	GET `/api/demo/module-access` – Demo

---

## Dashboard (real)
## Dashboard (real)
- GET `/api/dashboard/top-permissions` – Aggregación real de permisos más usados
	GET `/api/dashboard/top-permissions` – Real aggregation of most used permissions

---

## Matriz de permisos (base)
## Base Permission Matrix
- `create_user`, `read_user`, `update_user`, `delete_user`
- `manage_roles` (roles, permisos, asignaciones)  
	(roles, permissions, assignments)
- `view_audit`
