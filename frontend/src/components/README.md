
# Components

Este directorio contiene los componentes reutilizables del frontend, organizados en subcarpetas:

- **forms/**: Componentes de formularios para entrada y edición de datos.
- **tables/**: Tablas para mostrar y gestionar listas de entidades.
- **modals/**: Modales para confirmaciones, edición y visualización adicional.

## Ejemplo
```jsx
// DashboardSummary.jsx
export default function DashboardSummary({ totals }) {
	return <div>{/* ... */}</div>;
}
```

## Recomendaciones
Mantén los componentes desacoplados y reutilizables. Documenta las props principales.
