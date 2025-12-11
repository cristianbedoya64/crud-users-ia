
# Routes

Aquí se definen las rutas principales del frontend.

## Ejemplo
```jsx
// AppRoutes.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardView from '../views/DashboardView';

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/dashboard" element={<DashboardView />} />
				{/* ...otras rutas */}
			</Routes>
		</BrowserRouter>
	);
}
```

## Recomendaciones
Mantén las rutas organizadas y documenta las rutas principales y sus props.
