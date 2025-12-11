
# Views

Este directorio contiene las vistas principales del sistema, cada una representando una pantalla CRUD para una entidad:

- **UsersView.jsx**: Gestión de usuarios (listar, crear, editar, eliminar).
- **RolesView.jsx**: Gestión de roles y permisos.
- **PermissionsView.jsx**: Gestión de permisos.
- **AuditView.jsx**: Visualización de logs y auditoría.
- **DashboardView.jsx**: Vista principal del dashboard corporativo.

## Ejemplo
```jsx
// UsersView.jsx
import UserTable from '../components/UserTable';
export default function UsersView() {
	// lógica de presentación y consumo de API
	return <UserTable users={[]} />;
}
```

## Recomendaciones
Mantén la lógica de presentación separada de la lógica de negocio. Documenta las props y flujos principales.
