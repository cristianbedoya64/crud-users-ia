
# Components

Este directorio contiene los componentes reutilizables del frontend, organizados en subcarpetas:

- **forms/**: Componentes de formularios para entrada y edición de datos.
- **tables/**: Tablas para mostrar y gestionar listas de entidades.
- **modals/**: Modales para confirmaciones, edición y visualización adicional.

## Ejemplo
```jsx
// UserTable.jsx
export default function UserTable({ users }) {
	return <table>{/* ... */}</table>;
}
```

## Recomendaciones
Mantén los componentes desacoplados y reutilizables. Documenta las props principales.
