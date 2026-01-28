

# Frontend (React/Vite) - UARP-AI
# Frontend (React/Vite) - UARP-AI

---

## Visión General
## Overview
SPA moderna para gestión de usuarios, roles, permisos y dashboard de IA. Usa Vite, React y TailwindCSS.
Modern SPA for user, role, permission management and IA dashboard. Uses Vite, React, and TailwindCSS.

---

## Características
## Features
- Dashboard con métricas y panel IA  
	Dashboard with metrics and IA panel
- Pantalla de bienvenida interactiva con narrativa del producto  
	Interactive welcome screen with product narrative
- CRUD de usuarios, roles, permisos  
	User, role, and permission CRUD
- Gráficas y tablas interactivas  
	Interactive charts and tables
- Notificaciones y validaciones  
	Notifications and validations

---

## Configuración (local)
## Setup (local)
1. Instala dependencias: `npm install`  
	 Install dependencies: `npm install`
2. Copia `.env.example` a `.env` y define `VITE_API_URL` (ej: `http://localhost:3000`)  
	 Copy `.env.example` to `.env` and set `VITE_API_URL` (e.g. `http://localhost:3000`)
3. Dev: `npm run dev`  
	 Dev: `npm run dev`
4. Build: `npm run build` y previsualiza con `npm run preview`  
	 Build: `npm run build` and preview with `npm run preview`

### Con Docker / App Platform
### With Docker / App Platform
- Compose: se construye desde `frontend/Dockerfile`, puerto 5173  
	Compose: builds from `frontend/Dockerfile`, port 5173
- App Platform (Static Site): build `npm install && npm run build`, publish dir `dist`, env `VITE_API_URL=https://<backend>`  
	App Platform (Static Site): build `npm install && npm run build`, publish dir `dist`, env `VITE_API_URL=https://<backend>`

---

## Variables de Entorno
## Env Vars
- `VITE_API_URL` (URL backend; en Codespaces se reescribe host automáticamente para HTTPS)  
	(Backend URL; in Codespaces, host is auto-rewritten for HTTPS)
- `NODE_ENV`

---

## Scripts principales
## Main Scripts
- `npm run dev`
- `npm run build`
- `npm run preview`

---

## Estructura
## Structure
- `src/index.jsx`: entrypoint real de la app (usa Mantine layout); `src/index.js` es placeholder inicial  
	`src/index.jsx`: real app entrypoint (uses Mantine layout); `src/index.js` is initial placeholder
- `src/components/`: componentes UI (charts, tablas, IA panel)  
	`src/components/`: UI components (charts, tables, IA panel)
- `src/views/`: vistas Dashboard, Users, Roles, Permissions, Audit, Login, Welcome  
	`src/views/`: views (Dashboard, Users, Roles, Permissions, Audit, Login, Welcome)
- `src/layouts/`: layouts Mantine/MUI  
	`src/layouts/`: Mantine/MUI layouts
- `src/routes/`: AppRoutes placeholder (router pendiente)  
	`src/routes/`: AppRoutes placeholder (router pending)
- `public/`: estáticos  
	`public/`: static files

---

## Dependencias
## Dependencies
- react, vite, tailwindcss
- mantine, @mui/material, recharts, dayjs, dompurify

---

## Notas
## Notes
- Router principal aún no implementado en `src/routes/AppRoutes.jsx`; navegación actual se maneja por estado en `index.jsx`.  
	Main router not yet implemented in `src/routes/AppRoutes.jsx`; navigation currently handled by state in `index.jsx`.
- authFetch maneja refresh token automáticamente.  
	authFetch handles refresh token automatically.

---

## Referencias
## References
- API: ../docs/api.md
- Seguridad/env: ../docs/security.md  
	Security/env: ../docs/security.md

---

## Seguridad
## Security
- Sanitización de inputs  
	Input sanitization
- CORS configurado en backend  
	CORS set in backend

---

## Testing
- `npm test` (si hay tests / if available)  
	(if available)

---

## Troubleshooting
- Verifica conexión API / Check API connection
- Revisa consola del navegador / Review browser console