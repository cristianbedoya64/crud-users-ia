# API UARP-AI

Guía rápida de endpoints. Todas las rutas (salvo login/refresh/logout) requieren `Authorization: Bearer <accessToken>` emitido por `/api/auth/login`. Permisos según RBAC.

## Autenticación
- POST `/api/auth/login` – Body `{ email, password }` → `{ accessToken, refreshToken, expiresIn, user, refreshExpiresAt }`
- POST `/api/auth/refresh` – Body `{ refreshToken }` → tokens rotados
- POST `/api/auth/logout` – Body `{ refreshToken }` (opcional) → 204, revoca refresh

## Usuarios
- GET `/api/users` – Permiso `read_user` – Query `page, limit, search, status` → `{ total, page, limit, users[] }`
- GET `/api/users/:id` – Permiso `read_user`
- POST `/api/users` – Permiso `create_user` – Body `{ documentId, name, email, password, roles:[roleId] }`
- PUT `/api/users/:id` – Permiso `update_user` – Body `{ documentId, name, email, password?, roles:[roleId] }`
- DELETE `/api/users/:id` – Permiso `delete_user` – Soft delete (status=inactive)
- POST `/api/users/:id/restore` – Permiso `update_user` – Reactiva usuario

## Roles
- GET `/api/roles` – Permiso `manage_roles`
- POST `/api/roles` – Permiso `manage_roles` – Body `{ name, description? }`
- PUT `/api/roles/:id` – Permiso `manage_roles` – Body `{ name, description? }`
- DELETE `/api/roles/:id` – Permiso `manage_roles`

## Permisos
- GET `/api/permissions` – Permiso `manage_roles` recomendado (actualmente abierto tras auth)
- POST `/api/permissions` – Permiso `manage_roles` – Body `{ name, description? }`
- PUT `/api/permissions/:id` – Permiso `manage_roles` – Body `{ name, description? }`
- DELETE `/api/permissions/:id` – Permiso `manage_roles`

## Roles ↔ Permisos
- GET `/api/roles/:roleId/permissions` – Permiso `manage_roles`
- POST `/api/roles/:roleId/permissions` – Permiso `manage_roles` – Body `{ permissionIds:[id] }` (reemplaza set)
- DELETE `/api/roles/:roleId/permissions/:permissionId` – Permiso `manage_roles`

## Usuarios ↔ Roles
- GET `/api/user-roles/:userId/roles` – Permiso `manage_roles`
- POST `/api/user-roles/:userId/roles` – Permiso `manage_roles` – Body `{ roleIds:[id] }` (reemplaza set)
- DELETE `/api/user-roles/:userId/roles/:roleId` – Permiso `manage_roles`

## Auditoría
- POST `/api/audit` – Auth – Body `{ userId, action, details? }` → 201 (registre evento)
- GET `/api/audit` – Permiso `view_audit` – Query `userId?, action?, from?, to?` → lista logs

## Panel IA
- POST `/api/ia-panel` – Auth – Body libre `{ num_roles?, is_admin?, activity_score? }` → proxy a Flask `/ia-panel` y retorna `{ suggestions, anomalies, predictions }`

## Dashboard (dummy/backoffice)
- GET `/api/audit` – Ver arriba (usado por dashboard)
- GET `/api/security-alerts` – Dummy (no protegido por permiso específico; sí auth)
- GET `/api/change-history` – Dummy
- GET `/api/system-status` – Dummy
- GET `/api/user-growth` – Dummy
- GET `/api/module-access` – Dummy

## Matriz de permisos (base)
- `create_user`, `read_user`, `update_user`, `delete_user`
- `manage_roles` (roles, permisos, asignaciones)
- `view_audit`
