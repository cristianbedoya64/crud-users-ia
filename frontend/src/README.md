# Frontend src overview

## Entrypoint
- `index.jsx`: app principal con Mantine layout y navegación por estado (sin router formal).
- `index.js`: placeholder inicial (no se usa en build real).

## Layouts y vistas
- `layouts/`: MantineLayout (principal), DashboardLayout (MUI), Auth/Main placeholders.
- `views/`: Dashboard, Users, Roles, Permissions, Audit, Login.

## API client
- `apiConfig.js`: rescribe host en Codespaces para evitar mixed content.
- `apiClient.js`: `authFetch` añade Authorization y maneja refresh 401 → `/api/auth/refresh`.
- `auth.js`: manejo de tokens en localStorage.

## Componentes
- Gráficas y tablas (Recharts, Mantine, MUI), panel IA, tablas de permisos/usuarios.

## Pendientes
- Implementar routing en `routes/AppRoutes.jsx` para navegación declarativa.
- Añadir tests y linting (no configurados).
