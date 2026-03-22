# Informe Tecnico Ultra-Detallado — UARP-IA

> **Trabajo de Grado – Facultad de Ingenieria**  
> **Universidad Santiago de Cali**  
> **Enfoque:** optimizacion de la seguridad en el registro de usuarios mediante capas predictivas de riesgo.  
> **Estado:** prueba de concepto desplegada en `iausers.me`.

---

## 1) Ficha Tecnica de la Infraestructura Actual

### 1.1 Stack Tecnologico completo
- **Lenguaje Backend:** JavaScript (Node.js). Ver [backend/package.json](../backend/package.json).
- **Framework Backend:** Express. Ver [backend/src/server.js](../backend/src/server.js).
- **ORM:** Sequelize. Ver [backend/package.json](../backend/package.json).
- **Base de Datos:** PostgreSQL. Ver [docs/db.md](db.md) y [backend/src/db.js](../backend/src/db.js).
- **Frontend:** React + Vite + Mantine/MUI. Ver [frontend/package.json](../frontend/package.json).
- **Microservicio IA (PoC):** Flask + pandas + pickle. Ver [ia/ia_panel.py](../ia/ia_panel.py).
- **Microservicio IA (proyeccion):** FastAPI + scikit-learn + pandas + numpy + SQLAlchemy. Ver [docs/risk_scoring_microservice.md](risk_scoring_microservice.md).
- **Contenedores:** Docker Compose. Ver [docker-compose.yml](../docker-compose.yml) y [docker-compose.prod.yml](../docker-compose.prod.yml).
- **Seguridad y Operacion:** Helmet, CORS, rate limiting, audit logs. Ver [backend/src/server.js](../backend/src/server.js), [backend/src/middleware/rateLimit.js](../backend/src/middleware/rateLimit.js), [backend/src/middleware/logFailedAccess.js](../backend/src/middleware/logFailedAccess.js).

### 1.2 Jerarquia de carpetas
- **/backend:** API REST, ORM, middleware, rutas y controladores.
- **/frontend:** SPA React, vistas, componentes, auth client.
- **/ia:** microservicio IA PoC (Flask) y scripts.
- **/docs:** documentacion tecnica del anteproyecto.

### 1.3 Patron de diseno
- **Backend:** estilo MVC/Layered (Routes -> Controllers -> Models) con middlewares transversales.
  - Rutas: [backend/src/routes](../backend/src/routes)
  - Controladores: [backend/src/controllers](../backend/src/controllers)
  - Modelos: [backend/src/models](../backend/src/models)
  - Middlewares: [backend/src/middleware](../backend/src/middleware)

---

## 2) Logica de Negocio (RBAC)

### 2.1 Gestion de Roles y Permisos
- **Persistencia RBAC:**
  - **Users**, **Roles**, **Permissions**, **UserRoles**, **RolePermissions**. Ver [docs/db.md](db.md).
  - Asociaciones N:M configuradas en Sequelize. Ver [backend/src/models/index.js](../backend/src/models/index.js).
- **Rutas clave:**
  - Roles: [backend/src/routes/roleRoutes.js](../backend/src/routes/roleRoutes.js)
  - Permisos: [backend/src/routes/permissionRoutes.js](../backend/src/routes/permissionRoutes.js)
  - Asignacion usuario-roles: [backend/src/routes/userRoleRoutes.js](../backend/src/routes/userRoleRoutes.js)

### 2.2 Validacion de scopes
- **Middleware `permission`:** carga roles y permisos desde DB, aplica cache TTL y valida permiso requerido. Ver [backend/src/middleware/permission.js](../backend/src/middleware/permission.js).
- **Matriz base:** `create_user`, `read_user`, `update_user`, `delete_user`, `manage_roles`, `view_audit`. Ver [backend/src/constants/permissionMatrix.js](../backend/src/constants/permissionMatrix.js).

### 2.3 Auditoria RBAC
- **AuditLog por acciones exitosas:** middleware `audit` registra `action` y `details`. Ver [backend/src/middleware/audit.js](../backend/src/middleware/audit.js).
- **Accesos fallidos (401/403):** middleware `logFailedAccess`. Ver [backend/src/middleware/logFailedAccess.js](../backend/src/middleware/logFailedAccess.js).

---

## 3) Flujo de autenticacion (JWT) e integridad en iausers.me

### 3.1 Login y tokens
- **Login:** valida credenciales, estado activo y genera access/refresh. Ver [backend/src/controllers/authController.js](../backend/src/controllers/authController.js).
- **Access token:** JWT con `id`, `email`, `roles` y expiracion. Ver [backend/src/controllers/authController.js](../backend/src/controllers/authController.js).
- **Refresh token:** hash SHA-256 persistido y rotado. Ver [backend/src/models/RefreshToken.js](../backend/src/models/RefreshToken.js).

### 3.2 Integridad de datos de usuario
- **Password hasheado:** bcrypt, nunca se expone por default scope. Ver [backend/src/models/User.js](../backend/src/models/User.js).
- **Validaciones:** nombre, email, documento, password fuerte. Ver [backend/src/controllers/userController.js](../backend/src/controllers/userController.js).
- **Protecciones:** usuario demo y principal no editables/eliminables. Ver [backend/src/controllers/userController.js](../backend/src/controllers/userController.js).

### 3.3 Cliente
- **Refresh automatico:** reintento en 401 con refresh token. Ver [frontend/src/apiClient.js](../frontend/src/apiClient.js).
- **Storage:** tokens en localStorage. Ver [frontend/src/auth.js](../frontend/src/auth.js).

---

## 4) Proyeccion del Modulo de IA (Scoring de Riesgo)

### 4.1 Features candidatas (modelos actuales)
- **Identidad:** `documentId`, `email` (dominio), `name` (entropia), `status`.
  - Modelo: [backend/src/models/User.js](../backend/src/models/User.js)
- **Actividad:** `createdAt`, `updatedAt` para frecuencia de actualizacion.
- **Roles:** cantidad de roles por usuario (UserRoles).
  - Asociaciones: [backend/src/models/index.js](../backend/src/models/index.js)
- **Auditoria:** conteo de `failed_access`, `update_user`, `create_user`.
  - Logs: [backend/src/middleware/logFailedAccess.js](../backend/src/middleware/logFailedAccess.js)

### 4.2 Features recomendadas (proyeccion)
- Reputacion de dominio, riesgo IP, confianza de dispositivo, velocidad de registros, flags KYC.
- Ver esquema propuesto en [docs/risk_scoring_microservice.md](risk_scoring_microservice.md).

### 4.3 Ubicacion del hook/middleware
- **Ruta actual de alta:** `POST /api/users` (requiere permiso). Ver [backend/src/routes/userRoutes.js](../backend/src/routes/userRoutes.js).
- **Hook sugerido:** middleware previo al controlador de `create` para consultar scoring y registrar auditoria.
  - Controlador: [backend/src/controllers/userController.js](../backend/src/controllers/userController.js).
- **Futuro /register publico:** dentro de `authRoutes` o `userRoutes`, con proxy a FastAPI antes de persistir.

---

## 5) Recursos Tecnicos para el Informe de Grado

### 5.1 Hardware (estimado)
- **PoC y demo:** 1-2 vCPU, 2-4 GB RAM, 20+ GB SSD.
- **Entrenamiento RF (offline):** 2-4 vCPU, 8-16 GB RAM (segun dataset).

### 5.2 Software (critico)
- **Backend:** express, sequelize, pg, jsonwebtoken, bcryptjs. Ver [backend/package.json](../backend/package.json).
- **Frontend:** react, vite, mantine, mui. Ver [frontend/package.json](../frontend/package.json).
- **IA PoC:** Flask, pandas, pickle. Ver [ia/ia_panel.py](../ia/ia_panel.py).
- **IA grado:** fastapi, scikit-learn, pandas, numpy, sqlalchemy (propuesto). Ver [docs/risk_scoring_microservice.md](risk_scoring_microservice.md).

---

## 6) Estado de Desarrollo (Inventario de Avance)

### 6.1 Produccion/Live (iausers.me)
- Backend API con JWT, RBAC, auditoria y health/ready.
  - [backend/src/server.js](../backend/src/server.js)
  - [backend/src/controllers/authController.js](../backend/src/controllers/authController.js)
- Frontend SPA con login y consumo de API.
  - [frontend/src/views/LoginView.jsx](../frontend/src/views/LoginView.jsx)
- DB PostgreSQL con RBAC y auditoria.
  - [docs/db.md](db.md)
- IA PoC (Flask) consumida por backend.
  - [backend/src/routes/iaPanelRoutes.js](../backend/src/routes/iaPanelRoutes.js)
  - [ia/ia_panel.py](../ia/ia_panel.py)

### 6.2 Prototipado/Idea
- Microservicio FastAPI de scoring RF con permisos `view_risk_score` y `manage_risk_models`.
  - [docs/risk_scoring_microservice.md](risk_scoring_microservice.md)
- Integracion directa de scoring en flujo de registro (hook/middleware propuesto).

---

## 7) Flujo de Datos (POST /register -> rol)

**Nota:** no existe `POST /register` publico. El flujo actual equivalente es `POST /api/users`.

1) **Request** `POST /api/users` con JWT Bearer.
2) **Auth**: valida JWT y carga `req.user`. Ver [backend/src/middleware/auth.js](../backend/src/middleware/auth.js).
3) **RBAC**: valida `create_user`. Ver [backend/src/middleware/permission.js](../backend/src/middleware/permission.js).
4) **Validaciones**: documento, email, nombre, password fuerte y unicidad. Ver [backend/src/controllers/userController.js](../backend/src/controllers/userController.js).
5) **Persistencia**: crea `User` con password hasheado. Ver [backend/src/controllers/userController.js](../backend/src/controllers/userController.js).
6) **Asignacion de roles**: `user.addRoles(foundRoles)`. Ver [backend/src/controllers/userController.js](../backend/src/controllers/userController.js).
7) **Auditoria**: `AuditLog` por creacion y registro de accesos fallidos si aplica. Ver [backend/src/middleware/audit.js](../backend/src/middleware/audit.js) y [backend/src/middleware/logFailedAccess.js](../backend/src/middleware/logFailedAccess.js).
8) **Respuesta**: usuario sin password, con roles. Ver [backend/src/models/User.js](../backend/src/models/User.js).

---

## 8) Declaracion de asistencia con IA
Este proyecto utiliza asistencia de IA (GitHub Copilot) para apoyo en documentacion y desarrollo, con validacion humana y trazabilidad documentada. Ver [docs/ai_assistance.md](ai_assistance.md).
