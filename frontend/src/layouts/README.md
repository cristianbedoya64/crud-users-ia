
# Layouts

Este directorio contiene los layouts principales del sistema:

- **DashboardLayout.jsx**: Estructura visual y funcional del dashboard corporativo (sidebar, header, contenido).
- **AuthLayout.jsx**: Layout para pantallas de autenticación (login, registro, recuperación).

## Ejemplo
```jsx
// DashboardLayout.jsx
export default function DashboardLayout({ children }) {
	return (
		<div className="dashboard">
			{/* sidebar, header, children */}
		</div>
	);
}
```

## Recomendaciones
Utiliza layouts para mantener la consistencia visual y estructural. Evita lógica de negocio en los layouts.
