
# 🖥️ Frontend (React/Vite) — UARP-AI / Frontend (React/Vite) — UARP-AI

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: presenta la SPA usada para evidenciar UX, visualización de datos y consumo seguro de la API (auth + refresh + RBAC).

---

## 🎓 Contexto Académico y Propósito / Academic Context & Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este módulo representa la interfaz evaluable del sistema: navegación, dashboard, CRUDs y evidencias visuales de auditoría/seguridad.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This module is the evaluable interface of the system: navigation, dashboard, CRUD screens, and visual evidence of auditing/security.

---

## 🧭 Visión General / Overview
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** SPA moderna para gestión de usuarios, roles, permisos, auditoría y dashboard de IA. Construida con Vite, React y TailwindCSS.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Modern SPA for users/roles/permissions/audit management and an AI dashboard. Built with Vite, React, and TailwindCSS.

---

## ✨ Características / Features
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Dashboard con métricas y panel IA
- Pantalla de bienvenida (narrativa del producto)
- CRUD de usuarios, roles y permisos
- Gráficas/tablas interactivas
- Notificaciones y validaciones
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Dashboard with metrics and AI panel
- Welcome screen (product narrative)
- Users/roles/permissions CRUD
- Interactive charts/tables
- Notifications and validations

---

## 🛠️ Configuración (Local) / Setup (Local)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
1. Instala dependencias: `npm install`.
2. Copia `.env.example` a `.env` y define `VITE_API_URL` (ej: `http://localhost:3000`).
3. Dev: `npm run dev`.
4. Build: `npm run build` y previsualiza con `npm run preview`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
1. Install dependencies: `npm install`.
2. Copy `.env.example` to `.env` and set `VITE_API_URL` (e.g., `http://localhost:3000`).
3. Dev: `npm run dev`.
4. Build: `npm run build` and preview with `npm run preview`.

---

## 🐳 Docker / App Platform
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Compose: se construye desde `frontend/Dockerfile`, puerto 5173.
- App Platform (Static Site): build `npm install && npm run build`, publish dir `dist`, env `VITE_API_URL=https://<backend>`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Compose: builds from `frontend/Dockerfile`, port 5173.
- App Platform (Static Site): build `npm install && npm run build`, publish dir `dist`, env `VITE_API_URL=https://<backend>`.

---

## 🔧 Variables de Entorno / Env Vars
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `VITE_API_URL` (URL del backend; en Codespaces puede reescribirse para HTTPS).
- `NODE_ENV`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `VITE_API_URL` (backend URL; in Codespaces it may be rewritten for HTTPS).
- `NODE_ENV`.

---

## ▶️ Scripts Principales / Main Scripts
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** `npm run dev`, `npm run build`, `npm run preview`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** `npm run dev`, `npm run build`, `npm run preview`.

---

## 🧱 Estructura / Structure
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `src/index.jsx`: entrypoint real (layout + navegación)
- `src/components/`: UI reutilizable (charts, tablas, panel IA)
- `src/views/`: vistas (Dashboard/Users/Roles/Permissions/Audit/Login/Welcome)
- `src/layouts/`: layouts Mantine/MUI
- `src/routes/`: rutas (si se activa router)
- `public/`: estáticos
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `src/index.jsx`: real entrypoint (layout + navigation)
- `src/components/`: reusable UI (charts, tables, AI panel)
- `src/views/`: views (Dashboard/Users/Roles/Permissions/Audit/Login/Welcome)
- `src/layouts/`: Mantine/MUI layouts
- `src/routes/`: routes (if router is enabled)
- `public/`: static files

---

## 📝 Notas / Notes
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Si el router principal no está implementado, la navegación puede manejarse por estado en `src/index.jsx`. `authFetch` maneja refresh token automáticamente.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** If the main router is not implemented, navigation may be state-driven in `src/index.jsx`. `authFetch` handles refresh tokens automatically.

---

## 🔗 Referencias / References
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** API: [../docs/api.md](../docs/api.md) · Seguridad/env: [../docs/security.md](../docs/security.md)
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** API: [../docs/api.md](../docs/api.md) · Security/env: [../docs/security.md](../docs/security.md)

---

## 🔐 Seguridad / Security
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Sanitización de inputs y consumo de API bajo CORS configurado en backend.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Input sanitization and API consumption under backend-configured CORS.

---

## 🧪 Testing y Troubleshooting / Testing & Troubleshooting
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Si existen pruebas, ejecutar `npm test`. Ante errores, verifica `VITE_API_URL` y revisa consola del navegador.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** If tests exist, run `npm test`. For issues, verify `VITE_API_URL` and review the browser console.