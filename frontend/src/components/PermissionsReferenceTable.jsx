import { Card, Table, Title, Text } from '@mantine/core';

// Tabla de referencia de permisos y endpoints protegidos
const PERMISSIONS_REFERENCE = [
  {
    name: 'create_user',
    description: 'Permite crear usuarios',
    endpoints: ['POST /api/users']
  },
  {
    name: 'delete_user',
    description: 'Permite eliminar (desactivar) usuarios',
    endpoints: ['DELETE /api/users/:id']
  },
  {
    name: 'create_role',
    description: 'Permite crear roles',
    endpoints: ['POST /api/roles']
  },
  {
    name: 'assign_permission',
    description: 'Permite asignar permisos a roles',
    endpoints: ['POST /api/role-permissions/:roleId/permissions']
  },
  // Agrega aquí más permisos según tu lógica
];

export default function PermissionsReferenceTable() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
      <Title order={4} mb="md">Referencia de Permisos y Endpoints Protegidos</Title>
      <Table highlightOnHover withColumnBorders striped>
        <thead>
          <tr>
            <th>Permiso</th>
            <th>Descripción</th>
            <th>Endpoints Protegidos</th>
          </tr>
        </thead>
        <tbody>
          {PERMISSIONS_REFERENCE.map(perm => (
            <tr key={perm.name}>
              <td><b>{perm.name}</b></td>
              <td>{perm.description}</td>
              <td>
                {perm.endpoints.map(ep => (
                  <Text key={ep} size="sm">{ep}</Text>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
