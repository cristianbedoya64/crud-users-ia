

# Frontend (React/Vite) - UARP-AI

## Overview / Visión General
SPA moderna para gestión de usuarios, roles, permisos y dashboard de IA. Usa Vite, React y TailwindCSS.

## Features / Características
- Dashboard con métricas y panel IA
- CRUD de usuarios, roles, permisos
- Gráficas y tablas interactivas
- Notificaciones y validaciones

## Setup / Configuración
1. Instala dependencias: `npm install`
2. Configura `.env` (`VITE_API_URL`)
3. Inicia: `npm run dev` (desarrollo) o `npm run build` + `npm run preview` (producción)

## Env Vars / Variables de Entorno
- `VITE_API_URL` (URL del backend)
- `NODE_ENV` (production/development)

## Main Scripts / Scripts principales
- `npm run dev`: Start dev server
- `npm run build`: Build for production
- `npm run preview`: Preview build

## Structure / Estructura
- **src/components/**: Reusable/business components
- **src/views/**: Main views (Dashboard, Users, Roles, Permissions, Audit)
- **src/layouts/**: General layouts (Dashboard, Auth)
- **src/routes/**: Route definitions
- **public/**: Static files

## Dependencies / Dependencias
- react
- vite
- tailwindcss

## Security / Seguridad
- Sanitización de inputs / Input sanitization
- CORS configurado en backend / CORS set in backend

## Testing
- `npm test` (si hay tests / if available)

## Troubleshooting
- Verifica conexión API / Check API connection
- Revisa consola del navegador / Review browser console