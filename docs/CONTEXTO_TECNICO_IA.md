# UARP-IA — contexto técnico para agentes de IA

> **Auditoría del repositorio:** 5 de noviembre de 2026  
> **Alcance:** estado observable en el código de `crud-users-ia`. Este documento no sustituye los archivos ejecutables ni convierte el roadmap en funcionalidad.

## 1. Propósito y estado

UARP-IA es una aplicación web para gestión de usuarios con autenticación JWT, RBAC (roles y permisos), auditoría y un panel IA experimental. El stack implementado es:

- **Backend:** Node.js + Express + Sequelize + PostgreSQL.
- **Frontend:** React 18 + Vite + React Router 6, con componentes Mantine/MUI/Bootstrap.
- **IA:** servicio Flask independiente que carga un modelo `scikit-learn` serializado.
- **Operación:** Docker Compose o ejecución local en Windows/Linux.

### Distinción obligatoria

**Implementado en este repositorio**

- CRUD de usuarios y estado `active`/`inactive`.
- Login, refresh token rotatorio y logout.
- RBAC mediante relaciones usuario–rol–permiso.
- Auditoría de operaciones exitosas y registro de accesos fallidos.
- Dashboard, vistas de usuarios/roles/permisos/auditoría y panel IA proxy.
- PostgreSQL, migraciones/compatibilidad de sincronización y seeds demo.
- Health/readiness del backend y pruebas unitarias/smoke.

**Planificado o documentado como propuesta, pero no implementado**

- El microservicio FastAPI `/risk-score`, Random Forest con features de identidad/KYC y sus métricas.
- Permisos `view_risk_score`/`manage_risk_models`, explicabilidad, versionado formal y gobierno del modelo.
- Decisiones antifraude automáticas, validación de identidades sintéticas y persistencia de telemetría IA.

El código real de IA expone Flask `POST /ia-panel` con tres variables (`num_roles`, `is_admin`, `activity_score`) y un modelo de anomalías. Ver [risk_scoring_microservice.md](risk_scoring_microservice.md) para el diseño futuro, no para el contrato actual.

## 2. Arquitectura y estructura

```text
backend/                 API Express, ORM, middleware, migraciones y tests
frontend/                SPA React/Vite
ia/                      Flask PoC y ia_model.pkl
docs/                    documentación funcional, técnica y de despliegue
migrations/              notas adicionales de base de datos
docker-compose*.yml      topologías Docker
scripts/                 lanzadores locales/Docker/IA
```

Puntos de entrada: [`backend/src/server.js`](../backend/src/server.js), [`frontend/src/index.jsx`](../frontend/src/index.jsx), [`frontend/src/routes/AppRoutes.jsx`](../frontend/src/routes/AppRoutes.jsx) y [`ia/ia_panel.py`](../ia/ia_panel.py). El backend llama al servicio IA por HTTP interno (`IA_PANEL_URL`); el navegador no debería llamar al contenedor interno directamente.

## 3. Backend, autenticación, RBAC y auditoría

### Rutas montadas

Todas las rutas siguientes llevan el prefijo indicado en `server.js`. Salvo autenticación, health y raíz, requieren JWT; cada ruta protegida aplica además el permiso que corresponda.

| Prefijo | Operaciones implementadas |
|---|---|
| `/api/auth` | `POST /login`, `/refresh`, `/logout` |
| `/api/users` | `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`, `POST /:id/restore` |
| `/api/user-roles` | `GET /:userId/roles`, `POST /:userId/roles`, `DELETE /:userId/roles/:roleId` |
| `/api/roles` | CRUD de roles y `/:roleId/permissions` |
| `/api/permissions` | CRUD de permisos |
| `/api/dashboard` | `GET /summary` (métricas reales PostgreSQL), `GET /top-permissions` |
| `/api/demo` | `security-alerts`, `change-history`, `system-status`, `user-growth`, `module-access` |
| `/api/ia-panel` | `POST /` (proxy al Flask IA) |
| `/api/audit` | `POST /`, `GET /` |
| raíz/operación | `GET /`, `GET /health`, `GET /ready` |

Implementación de rutas: [`backend/src/routes`](../backend/src/routes). `GET /health` siempre devuelve un JSON de estado, aunque DB o IA fallen; `/ready` devuelve 503 si alguno no está disponible.

`GET /api/dashboard/summary` requiere JWT y el permiso existente `view_audit`, porque incluye
información de auditoría. Su contrato único consulta PostgreSQL mediante Sequelize y devuelve
`users { total, active, inactive, recent }`, `roles`, `audit { recent, byAction,
failedAccess }`, `moduleActivity`, `lastLogins`, `userActivity`, `activity` y `services`. `moduleActivity` agrupa
acciones reales de `AuditLogs` por módulo; no representa navegación de pantalla ni visitas
anónimas. `recent` contiene usuarios creados en los últimos
30 días (máximo 10), `audit.recent` los últimos 20 registros, `byAction` los conteos agrupados
y `lastLogins` los cinco inicios de sesión exitosos más recientes. `userActivity` contiene altas
diarias de usuarios de los últimos 30 días. `activity` contiene los conteos diarios
de auditoría de los últimos 30 días. `services` informa el
estado de API, base de datos e IA; `generatedAt` documenta cuándo se generó el resumen. Las
listas se limitan para evitar cargas excesivas y las altas recientes nunca incluyen `password`.
### Migración de endpoints demo

El frontend actual ya no consume los siguientes endpoints demo para construir el dashboard:

- `/api/demo/security-alerts`
- `/api/demo/change-history`
- `/api/demo/system-status`
- `/api/demo/user-growth`
- `/api/demo/module-access`

Esos endpoints permanecen disponibles temporalmente para compatibilidad con consumidores
anteriores, pero sus respuestas siguen siendo datos estáticos/de demostración y no deben
presentarse como métricas reales. El reemplazo funcional es:

- `/api/dashboard/summary`: usuarios, roles, auditoría, actividad diaria y servicios reales.
- `/api/audit`: auditoría real paginada y filtrable.
- `/api/dashboard/top-permissions`: asignaciones de permisos por rol; no representa uso
  efectivo de permisos y se conserva por compatibilidad.

`GET /api/audit` admite los filtros existentes `userId`, `action`, `from` y `to`, además de
`page` y `limit` (máximo 100). Devuelve `{ total, page, limit, pages, logs }`; los registros
incluyen acción, usuario ejecutor sin contraseña, recurso, resultado, fecha y detalles
sanitizados. IPs, tokens, contraseñas y otros secretos nunca se entregan al frontend.
En el dashboard, “Historial de Cambios” solo muestra acciones mutantes de usuarios, roles,
permisos y asignaciones; `failed_access` se muestra exclusivamente en “Alertas de Seguridad”.
Las acciones técnicas de auditoría se conservan internamente para filtros y métricas, pero el
frontend las presenta con etiquetas orientadas a usuarios finales, por ejemplo `create_user`
como “Usuario creado” y `failed_access` como “Acceso rechazado”.
El frontend consume este resumen con `authFetch`, muestra estados de carga, error y vacío, y
no solicita recursos CRUD ni `/api/demo/*` para construir el panel. La llamada opcional a IA
usa el mismo cliente autenticado. Después de la carga inicial, el resumen se actualiza mediante
polling automático cada 30 segundos, incluyendo permisos asignados, últimos accesos y auditoría;
la interfaz muestra una cuenta regresiva hasta el siguiente refresco y conserva los datos válidos
si una actualización falla.
La visualización de actividad por módulo usa actualmente la gráfica 2D existente. Se eliminó el
modo 3D porque algunos controladores locales anunciaban WebGL, pero no podían crear el renderer
de Three.js, provocando errores en el panel. No se usa `echarts-gl` porque el proyecto mantiene
ECharts 6.
Las tarjetas de alertas, actividad, accesos e historial comparten un timeline visual con fechas
relativas; el estado de API, IA y base de datos usa indicadores semánticos con tooltip y pulso
visual para servicios disponibles.
El encabezado del dashboard usa actualmente un hero 2D estático con la identidad visual SOC. El
hero 3D, `Chart3DWrapper`, `ModuleActivity3D` y la configuración `dashboardFeatures.js` fueron
eliminados; tampoco se mantienen las dependencias `three`, `@react-three/fiber` ni
`@react-three/drei`.
El sistema visual central vive en `frontend/src/theme/dashboardTokens.js` y se refleja en variables
CSS globales: fondo azul noche con malla y ambiente animado, superficies glassmorphism, tipografía
tabular para métricas, glows semánticos y reducción global de movimiento mediante
`prefers-reduced-motion`.
El fondo interactivo del dashboard está implementado en
[`InteractiveBackground.jsx`](../frontend/src/components/InteractiveBackground.jsx) con Canvas 2D
nativo. Acepta las variantes `grid` y `constellation`, usa `requestAnimationFrame`, limita el
`devicePixelRatio` a 2, observa cambios de tamaño, escucha el puntero sin bloquear clics,
respeta `prefers-reduced-motion`, pausa con `document.hidden` y limpia listeners/frames al
desmontar. Si `getContext('2d')` no existe, como ocurre en `jsdom` sin soporte Canvas, abandona
la inicialización sin romper el dashboard.
El polling está controlado cada 30 segundos; también existe un botón de actualización manual. Las
solicitudes se serializan para evitar que un intervalo lento genere peticiones superpuestas.
Si una actualización posterior falla, se conserva la última respuesta válida y se muestra el
error explícitamente.

Validación realizada el 5 de noviembre de 2026:

- Backend: 4 suites y 9 pruebas exitosas.
- Frontend: 3 archivos de prueba y 4 pruebas exitosas.
- Build de producción Vite exitoso.
- Servicios locales: backend, frontend e IA escuchando; `/health` y `/ready` devolvieron
  estado correcto con PostgreSQL e IA disponibles.
- Prueba real con `admin@demo.com`: login y `GET /api/dashboard/summary` exitosos; se
  observaron usuarios activos/inactivos, roles, auditoría y servicios.
- Prueba real con usuario de rol `user`: `GET /api/dashboard/summary` rechazado con HTTP 403.
- `GET /api/audit?page=1&limit=5` respondió con eventos reales de auditoría y accesos
  fallidos. Los escenarios de base de datos caída se cubren por aislamiento/pruebas, sin
  detener el PostgreSQL local compartido.
- Se corrigió el conteo de `/api/users` con `distinct: true`, porque la inclusión de varios
  roles podía contar la misma persona más de una vez; el total real quedó consistente con el
  resumen del dashboard.
- Frontend: `npm test -- --run` terminó con 3 archivos y 4 pruebas exitosas.
- Frontend: `npm run build` terminó correctamente con Vite 7. El build aún informa advertencias no
  bloqueantes de Browserslist y de chunks grandes.
- Se añadió en [`frontend/src/setupTests.js`](../frontend/src/setupTests.js) un fallback de
  `HTMLCanvasElement.getContext` exclusivo para pruebas, evitando el ruido de `jsdom` sin instalar
  el paquete `canvas`.
- Se comprobó el dashboard autenticado en `http://localhost:5173/dashboard` con el usuario demo:
  el resumen, las gráficas 2D, el Canvas interactivo y el estado de servicios cargaron sin errores
  de consola después de retirar Three.js.

### Autenticación

[`authController.js`](../backend/src/controllers/authController.js) verifica bcrypt, estado activo y emite JWT de acceso (por defecto 15 minutos) más refresh token aleatorio almacenado únicamente como SHA-256 (por defecto 7 días). El refresh se rota y revoca el anterior. [`auth.js`](../backend/src/middleware/auth.js) exige `Authorization: Bearer <JWT>` y devuelve 401/403. En desarrollo, si falta `JWT_SECRET`, existe el fallback `supersecret`; en producción la variable es obligatoria.

### RBAC y auditoría

[`permission.js`](../backend/src/middleware/permission.js) obtiene permisos a través de `User -> Roles -> Permissions` y mantiene una caché en memoria (TTL por defecto 60 s). `SKIP_AUTH=true` solo se acepta fuera de producción. La matriz inicial está en [`permissionMatrix.js`](../backend/src/constants/permissionMatrix.js) y el seed crea `admin`, `user`, `auditor` con `create_user`, `read_user`, `update_user`, `delete_user`, `manage_roles`, `view_audit`.

[`audit.js`](../backend/src/middleware/audit.js) registra acciones exitosas 2xx en `AuditLogs` sin bloquear la respuesta si falla la escritura. [`logFailedAccess.js`](../backend/src/middleware/logFailedAccess.js) cubre accesos fallidos. No asumir que cada lectura o error queda auditado: el middleware de acción está aplicado selectivamente a operaciones mutantes.

## 4. Modelos y base de datos

La conexión Sequelize está en [`backend/src/db.js`](../backend/src/db.js), dialecto PostgreSQL. Los modelos y asociaciones están en [`backend/src/models`](../backend/src/models):

- `Users`: `id`, `documentId` único, nombre, email único, hash `password`, estado, timestamps y `createdBy`/`updatedBy`.
- `Roles` y `Permissions`: nombre único y descripción.
- `UserRoles` y `RolePermissions`: tablas puente.
- `AuditLogs`: usuario, acción, detalle, creador y fechas.
- `RefreshTokens`: hash único, usuario, expiración y `revokedAt`.

[`migrate.js`](../backend/src/migrate.js) usa `sync/alter` por defecto fuera de producción; producción debe usar migraciones. Las migraciones versionadas están en [`backend/migrations`](../backend/migrations). [`seed.js`](../backend/src/seed.js) crea roles/permisos y, en modo demo, usuarios de demostración; no ejecutar un seed demo contra datos reales.

## 5. Frontend y rutas

`AppRoutes.jsx` define `/`, `/welcome`, `/login`, `/dashboard`, `/users`, `/roles`, `/permissions` y `/audit`. `RequireAuth` redirige a `/welcome` si no hay sesión; las vistas autenticadas usan `MantineLayout`. Componentes y vistas están en [`frontend/src/components`](../frontend/src/components) y [`frontend/src/views`](../frontend/src/views).

[`auth.js`](../frontend/src/auth.js) guarda access/refresh token y usuario en `localStorage`. [`apiClient.js`](../frontend/src/apiClient.js) agrega el Bearer, intenta un refresh una vez ante 401 y notifica errores. [`apiConfig.js`](../frontend/src/apiConfig.js) usa `VITE_API_URL` en build y deriva el backend para localhost/Codespaces. La autorización visual no reemplaza el RBAC del backend.

### Estado actual del dashboard

[`DashboardView.jsx`](../frontend/src/views/DashboardView.jsx) consume el contrato único
`/api/dashboard/summary` mediante `authFetch` y realiza una llamada opcional separada al
panel IA. Ya no solicita `/api/demo/*` ni obtiene usuarios, roles, permisos o auditoría
mediante peticiones CRUD independientes. Las tarjetas sin datos en el contrato muestran un
estado vacío o `N/D`; no se rellenan con valores ficticios.

- **Datos reales:** totales y estados de usuarios, usuarios recientes, distribución por roles,
  actividad y auditoría reciente, acciones agrupadas, accesos fallidos y estado de servicios.
- La gráfica que consume `summary.activity` se presenta como **Actividad de Auditoría por
  Fecha**, porque sus valores son conteos diarios de registros de `AuditLogs`, no crecimiento
  acumulado de usuarios.
- **Sin fuente en el contrato actual:** total de permisos y últimos accesos de login. Sus
  componentes permanecen visualmente para no alterar el diseño, pero muestran que no hay
  datos disponibles.
- **Actividad por módulo:** se calcula desde las acciones de `AuditLogs` y se presenta con
  ese nombre para no confundirla con navegación o accesos de pantalla.
- **Estado pendiente:** no se muestra como dato real porque `User.status` solo admite
  `active` e `inactive`.

Limitaciones funcionales actuales:

1. Las métricas del dashboard requieren JWT y `view_audit`; los usuarios sin ese permiso reciben un error explícito y no se muestran datos parciales.
2. El endpoint agregado limita sus listas; no debe sustituirse por consultas CRUD completas desde React.

`/api/dashboard/top-permissions` sí consulta PostgreSQL, pero cuenta asignaciones en `RolePermissions`, no usos de permisos ni accesos efectivos. No debe describirse como “permisos más usados” sin cambiar la semántica o el título visual.

## 6. Servicio IA actual y futuro

La imagen [`ia/Dockerfile`](../ia/Dockerfile) instala Flask, pandas y scikit-learn, copia [`ia_model.pkl`](../ia/ia_model.pkl) y ejecuta [`ia_panel.py`](../ia/ia_panel.py) en puerto 5001. `POST /ia-panel` carga el pickle en cada solicitud y responde sugerencia/anomalía/predicción; si no puede cargar el modelo responde 500. No hay autenticación propia. El backend controla el acceso a `/api/ia-panel`, pero actualmente la ruta solo usa JWT y no un permiso específico.

El scoring de riesgo FastAPI descrito en [`docs/risk_scoring_microservice.md`](risk_scoring_microservice.md) es **roadmap** y no debe ser usado como contrato de integración hasta que exista código, pruebas y configuración que lo respalden.

## 7. Ejecución, Docker, variables y puertos

### Local

1. Requiere PostgreSQL (`uarp_ai`, usuario `postgres`) y Node/npm; para IA requiere Python y dependencias de Flask/pandas/scikit-learn.
2. `cd backend; npm ci` y `cd ..\frontend; npm ci`.
3. Ejecutar [`scripts/start-local.ps1`](../scripts/start-local.ps1), o iniciar manualmente backend (`npm start`), frontend (`npm run dev`) e IA (`python ia_panel.py`).
4. Migrar/sembrar manualmente cuando corresponda: `node src/migrate.js` y `node src/seed.js`.

Puertos por defecto: frontend `5173`, backend `3000`, IA `5001`, PostgreSQL `5432` (local; Compose base no lo publica).

### Docker

`docker-compose.yml` levanta `postgres`, `backend`, `frontend` y `ia-panel`. `docker-compose.override.yml` añade watch/dev mounts. `docker-compose.prod.yml` publica frontend en host `80:5173` y también expone IA en `5001`; revisar esta superficie antes de producción. Los Dockerfiles están en [`backend/Dockerfile`](../backend/Dockerfile), [`frontend/Dockerfile`](../frontend/Dockerfile) e [`ia/Dockerfile`](../ia/Dockerfile).

Variables principales: `NODE_ENV`, `PORT`, `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `JWT_SECRET`, `ACCESS_TOKEN_TTL`, `REFRESH_TOKEN_TTL`, `CORS_ALLOW_ALL`, `CORS_ORIGINS`, `IA_PANEL_URL`, `SKIP_AUTH`, `MIGRATE_MODE`, `MIGRATE_ALTER`, `SEED_MODE`, `SEED_RESET_DEMO`, `SEED_ALLOW_SYNC`, `PERMISSION_CACHE_TTL_MS`. Referencias: [`backend/.env.example`](../backend/.env.example), [`frontend/.env.example`](../frontend/.env.example). Nunca copiar secretos o el `frontend/.env.example` con IPs reales a un entorno compartido sin revisarlo.

## 8. Pruebas y validación

- Backend: `cd backend; npm test` (Jest/Supertest), incluyendo smoke de raíz, exclusión de contraseñas, permiso RBAC y rotación/revocación de refresh.
- Frontend: `cd frontend; npm test` (Vitest); existe prueba de `DashboardSummary`.
- Build frontend: `npm run build`.
- Lighthouse: `npm run lighthouse` requiere navegador/configuración LHCI.
- No existe suite automatizada equivalente para Flask/modelo IA; validar manualmente `GET /` y `POST /ia-panel` y disponibilidad de `ia_model.pkl`.

## 9. Estado para ejecutar el sistema completo

### Implementado y operativo

- Backend Express conectado a PostgreSQL y expuesto en el puerto `3000`.
- Frontend React/Vite servido en el puerto `5173`.
- Servicio Flask IA disponible en el puerto `5001`.
- Autenticación demo mediante `admin@demo.com` y la contraseña definida por el seed local.
- Dashboard autenticado con resumen agregado, auditoría real, actividad por módulo, últimos
  accesos, permisos asignados, estado de servicios, panel IA opcional y actualización automática.
- Visualización SOC con tokens centralizados, glassmorphism, tarjetas KPI, timelines, gráficas 2D
  y fondo Canvas interactivo.
- Fallback seguro para Canvas en pruebas y ausencia completa de renderizado/dependencias 3D.

### Pasos que todavía deben cumplirse en una instalación nueva

1. Instalar y arrancar PostgreSQL, creando la base `uarp_ai` y configurando las variables de
   `backend/.env`.
2. Ejecutar `npm ci` dentro de `backend` y `frontend`.
3. Ejecutar `node src/migrate.js` y `node src/seed.js` desde `backend` cuando la base esté vacía.
4. Instalar las dependencias Python de `ia/` y confirmar que existe `ia_model.pkl` si se quiere
   usar el panel IA.
5. Iniciar los tres servicios con [`scripts/start-local.ps1`](../scripts/start-local.ps1), o
   iniciarlos manualmente en los puertos documentados.
6. Abrir `http://localhost:5173`, iniciar sesión y comprobar que el usuario tenga `view_audit`;
   sin ese permiso el endpoint agregado responde `403` por diseño.
7. Si se cambia el host o puerto del backend, actualizar `VITE_API_URL`, `IA_PANEL_URL`,
   `CORS_ORIGINS` y cualquier configuración equivalente antes de iniciar.

### Pendientes técnicos conocidos

- No existe una suite automatizada para el servicio Flask y el modelo IA; falta cubrir sus
  contratos, errores de carga y disponibilidad con pruebas.
- El build frontend mantiene advertencias de Browserslist desactualizado y chunks grandes; debe
  optimizarse solo después de medir el impacto real.
- Los endpoints `/api/demo/*` siguen disponibles por compatibilidad, aunque el dashboard ya no los
  consume; pueden retirarse cuando no existan consumidores externos.
- El scoring FastAPI/Random Forest continúa siendo roadmap; no debe configurarse como si fuera el
  servicio IA actual.
- Deben sustituirse las credenciales y secretos de ejemplo antes de cualquier despliegue no local.
- La validación visual en móvil/tablet y Lighthouse debe repetirse en el entorno objetivo.

## 10. Discrepancias y riesgos observados

1. La documentación raíz presenta el scoring FastAPI/Random Forest como objetivo o “vigente”, pero el código actual es Flask + modelo de anomalías de tres features.
2. `docs/api.md`, `docs/db.md` y otros documentos pueden describir contratos más amplios que las rutas/modelos actuales; ante conflicto, prevalecen `server.js`, rutas, controladores y pruebas.
3. El `Dockerfile` del frontend copia `.env` y `.env.production` y hornea `VITE_*`; revisar que existan y que no contengan secretos.
4. `docker-compose.yml` contiene credenciales PostgreSQL de ejemplo (`NoHayMas`) y `backend/db.js` tiene defaults equivalentes: deben sobrescribirse en despliegues reales.
5. El servicio IA carga pickle con `pickle.load`; solo debe usarse con artefactos confiables y la imagen IA no debería publicarse directamente.
6. La caché RBAC es por proceso y puede conservar permisos hasta el TTL después de cambios; no es una caché distribuida.
7. El backend confía en proxy (`trust proxy=1`); ajustar la topología antes de exponerlo a Internet.
8. El seed demo incluye credenciales conocidas (`Password1!`) y usuarios con rol admin; limitarlo a desarrollo/demostración.
9. No confundir las rutas `/api/demo/*` con datos de negocio: son respuestas de dashboard demostrativas.

## 11. Reglas de mantenimiento para futuros modelos

1. Antes de afirmar que una capacidad existe, verificar código, configuración y prueba; marcarla **Implementado**, **Parcial** o **Planificado**.
2. Al cambiar una ruta, variable, puerto, modelo, asociación, migración o comando, actualizar esta página y los documentos especializados enlazados.
3. Mantener enlaces relativos y comprobar que el archivo destino existe.
4. Registrar cambios funcionales/de seguridad en [`docs/CHANGELOG.md`](CHANGELOG.md) y trazabilidad relevante en [`docs/ai_traceability/README.md`](ai_traceability/README.md).
5. No documentar secretos, tokens, contraseñas reales, datos personales ni IPs de producción como valores operativos.
6. Para una integración IA nueva, actualizar simultáneamente contrato request/response, autenticación/RBAC, health/readiness, Docker, pruebas, auditoría y versión del modelo.
7. Después de cambios, ejecutar las pruebas mínimas del área afectada y anotar limitaciones o fallos conocidos aquí.

## 12. Instrucciones de traspaso para Claude Code: fondo interactivo del dashboard

### Pretensión final

El dashboard debe conservar un fondo visual tipo SOC, futurista y discreto, basado únicamente en
Canvas 2D nativo. El fondo es una capa ambiental detrás del contenido: debe aportar profundidad,
movimiento y reacción al puntero sin competir con las métricas, tablas, botones ni gráficas.
Debe sentirse como una malla de vigilancia/constelación tecnológica, no como una animación
decorativa invasiva.

La implementación objetivo está en
[`InteractiveBackground.jsx`](../frontend/src/components/InteractiveBackground.jsx) y se monta
desde [`DashboardView.jsx`](../frontend/src/views/DashboardView.jsx). Actualmente se usa la
variante `constellation`; la variante `grid` debe seguir disponible para reutilización.

### Trabajo que Claude Code debe auditar y terminar

1. Leer `InteractiveBackground.jsx`, `DashboardView.jsx`, `index.css`, `dashboardTokens.js`,
   `useReducedMotion.js` y `setupTests.js` antes de cambiar código.
2. Confirmar que el Canvas:
   - está detrás del contenido, con `pointer-events: none` y z-index inferior;
   - no altera clics, teclado, scroll, formularios, tablas ni gráficos;
   - usa el color del tema Mantine y se adapta a tema claro/oscuro;
   - soporta `grid` y `constellation`, `density`, `interactionRadius`, `color`, `className`
     y `style`;
   - limita el `devicePixelRatio` a 2 y recalcula correctamente al cambiar tamaño;
   - limpia `ResizeObserver`, listeners y `requestAnimationFrame` al desmontar;
   - pausa con `document.hidden`;
   - muestra una malla estática y no procesa interacción con `prefers-reduced-motion`;
   - no provoca errores si `getContext('2d')` devuelve `null` en `jsdom`.
3. Revisar rendimiento: evitar `setState` por frame, limitar partículas, evitar cálculos
   cuadráticos innecesarios y comprobar que el fondo no cause repaints excesivos.
4. Auditar visualmente escritorio, tablet y móvil. Mantener suficiente contraste y legibilidad
   en todas las tarjetas.
5. Ejecutar y corregir únicamente lo necesario para que pasen:
   - `cd frontend; npm test -- --run`
   - `cd frontend; npm run build`
6. Comprobar manualmente `http://localhost:5173/dashboard` con una sesión válida y verificar:
   carga inicial, refresh automático, botón `Actualizar`, cambio de tamaño, navegación, pestaña
   oculta, movimiento reducido y ausencia de errores en consola.
7. Actualizar este documento si se modifica el contrato del componente, su integración o algún
   requisito operativo.

### Restricciones no negociables

- No reinstalar ni reintroducir `three`, `@react-three/fiber`, `@react-three/drei`,
  `echarts-gl`, tsParticles ni otra dependencia solo para este fondo.
- No crear objetos 3D ni reactivar el hero 3D o la gráfica 3D; fueron eliminados deliberadamente.
- No cambiar API, autenticación, permisos, rutas, modelos, polling de 30 segundos ni contratos
  del backend.
- No reemplazar Canvas 2D por CSS pesado o una librería de partículas.
- No usar Tailwind.
- No ocultar errores con catches amplios ni introducir valores ficticios.
- Mantener los datos y componentes actuales del dashboard.

### Resultado esperado

Claude Code debe entregar una auditoría breve de hallazgos, cambios mínimos aplicados y comandos
ejecutados. La implementación se considera terminada cuando el fondo funciona como capa ambiental
interactiva, es accesible y degradable, no bloquea la interfaz, no genera errores de consola,
los tests pasan y el build de producción finaliza correctamente.
