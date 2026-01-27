
# Layouts

Este directorio contiene el layout principal del sistema:

- **MantineLayout.jsx**: Layout activo con navegación y header (Mantine).

## Ejemplo
```jsx
// MantineLayout.jsx
export default function MantineLayout({ children }) {
	return (
		<div>{children}</div>
	);
}
```

## Recomendaciones
Utiliza layouts para mantener la consistencia visual y estructural. Evita lógica de negocio en los layouts.
