

# Frontend (React/Vite) - UARP-AI

## Overview / Visión General
SPA moderna para gestión de usuarios, roles, permisos y dashboard de IA. Usa Vite, React y TailwindCSS.

## Features / Características
- Dashboard con métricas y panel IA
- CRUD de usuarios, roles, permisos
- Gráficas y tablas interactivas
- Notificaciones y validaciones

## Setup / Configuración (local)
1. Instala dependencias: `npm install`
2. Copia `.env.example` a `.env` y define `VITE_API_URL` (ej: `http://localhost:3000`)
3. Dev: `npm run dev`
4. Build: `npm run build` y previsualiza con `npm run preview`

### Con Docker / App Platform
- Compose: se construye desde `frontend/Dockerfile`, puerto 5173
- App Platform (Static Site): build `npm install && npm run build`, publish dir `dist`, env `VITE_API_URL=https://<backend>`

## Env Vars / Variables de Entorno
- `VITE_API_URL` (URL backend; en Codespaces se reescribe host automáticamente para HTTPS)
- `NODE_ENV`

## Main Scripts / Scripts principales
- `npm run dev`
- `npm run build`
- `npm run preview`

## Structure / Estructura
- `src/index.jsx`: entrypoint real de la app (usa Mantine layout); `src/index.js` es placeholder inicial
- `src/components/`: componentes UI (charts, tablas, IA panel)
- `src/views/`: vistas Dashboard, Users, Roles, Permissions, Audit, Login
- `src/layouts/`: layouts Mantine/MUI
- `src/routes/`: AppRoutes placeholder (router pendiente)
- `public/`: estáticos

## Dependencies / Dependencias
- react, vite, tailwindcss
- mantine, @mui/material, recharts, dayjs, dompurify

## Notas
- Router principal aún no implementado en `src/routes/AppRoutes.jsx`; navegación actual se maneja por estado en `index.jsx`.
- authFetch maneja refresh token automáticamente.

## Referencias
- API: ../docs/api.md
- Seguridad/env: ../docs/security.md

## Security / Seguridad
- Sanitización de inputs / Input sanitization
- CORS configurado en backend / CORS set in backend

## Testing
- `npm test` (si hay tests / if available)

## Troubleshooting
- Verifica conexión API / Check API connection
- Revisa consola del navegador / Review browser console