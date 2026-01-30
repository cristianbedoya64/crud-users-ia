
# 🪟 Views / Views

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: describe las pantallas principales del frontend usadas para evidenciar casos de uso (CRUD, auditoría, dashboard).

---

## 📌 Propósito / Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este directorio contiene vistas (pantallas) del sistema. Ejemplos típicos:
- Users: gestión de usuarios (listar/crear/editar/eliminar)
- Roles/Permissions: administración de roles y permisos
- Audit: visualización de logs y auditoría
- Dashboard: métricas/resumen
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This folder contains the app’s screens. Typical examples:
- Users: user management (list/create/edit/delete)
- Roles/Permissions: RBAC administration
- Audit: audit log viewing
- Dashboard: metrics/summary

---

## 🧪 Ejemplo / Example
```jsx
// UsersView.jsx
export default function UsersView() {
	return <div>{/* UI + API consumption */}</div>;
}
```

---

## ✅ Recomendaciones / Recommendations
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Separa UI de utilidades compartidas (authFetch/config). Evita duplicar lógica entre vistas.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Separate UI from shared utilities (authFetch/config). Avoid duplicating logic across views.
