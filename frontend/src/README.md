
# 🧩 Frontend `src/` — Estructura / Frontend `src/` — Structure

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: resume la organización interna del frontend para facilitar revisión y trazabilidad.

---

## 🧭 Entrypoint / Entrypoint
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `index.jsx`: app principal con Mantine layout y navegación por estado (sin router formal).
- `index.js`: placeholder inicial (no se usa en el build real).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `index.jsx`: main app with Mantine layout and state-driven navigation (no formal router).
- `index.js`: initial placeholder (not used in the real build).

---

## 🧱 Layouts y Vistas / Layouts & Views
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `layouts/`: MantineLayout (principal), DashboardLayout (MUI), Auth/Main placeholders.
- `views/`: Dashboard, Users, Roles, Permissions, Audit, Login.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `layouts/`: MantineLayout (main), DashboardLayout (MUI), Auth/Main placeholders.
- `views/`: Dashboard, Users, Roles, Permissions, Audit, Login.

---

## 🔌 API Client / API Client
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `apiConfig.js`: reescribe host en Codespaces para evitar mixed content.
- `apiClient.js`: `authFetch` añade Authorization y maneja refresh (401 → `/api/auth/refresh`).
- `auth.js`: manejo de tokens en almacenamiento local.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `apiConfig.js`: host rewrite in Codespaces to avoid mixed content.
- `apiClient.js`: `authFetch` adds Authorization and handles refresh (401 → `/api/auth/refresh`).
- `auth.js`: token storage helpers.

---

## 🧱 Componentes / Components
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Gráficas y tablas (Recharts, Mantine, MUI), panel IA y componentes de permisos/usuarios.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Charts and tables (Recharts, Mantine, MUI), AI panel, and permissions/users components.

---

<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Implementar routing en `routes/AppRoutes.jsx` y añadir tests/linting (si aplica).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Implement routing in `routes/AppRoutes.jsx` and add tests/linting (if applicable).

## 📋 Política de Documentación y Trazabilidad / Documentation & Traceability Policy
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
Cada cambio funcional, técnico o de seguridad realizado en el frontend/src será documentado en el changelog ([../../docs/CHANGELOG.md](../../docs/CHANGELOG.md)) y en los archivos relevantes. Esto garantiza trazabilidad y evidencia para la evaluación académica y profesional.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
Every functional, technical, or security change made to the frontend/src will be documented in the changelog ([../../docs/CHANGELOG.md](../../docs/CHANGELOG.md)) and in the relevant files. This ensures traceability and evidence for academic and professional evaluation.
