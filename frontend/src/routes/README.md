
# 🧭 Routes (Frontend) / Routes (Frontend)

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: describe el enrutamiento del frontend (si se usa React Router) y su relación con vistas.

---

## 📌 Propósito / Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Define rutas cuando el proyecto adopta navegación declarativa. Si no se usa router, la navegación puede estar basada en estado.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Defines routes when the project adopts declarative navigation. If no router is used, navigation may be state-driven.

---

## 🧪 Ejemplo / Example
```jsx
// AppRoutes.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardView from '../views/DashboardView';

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/dashboard" element={<DashboardView />} />
				{/* ...other routes */}
			</Routes>
		</BrowserRouter>
	);
}
```

---

## ✅ Recomendaciones / Recommendations
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Mantén rutas organizadas y documenta rutas principales y requisitos de autenticación/permisos.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Keep routes organized and document main routes and auth/permission requirements.
