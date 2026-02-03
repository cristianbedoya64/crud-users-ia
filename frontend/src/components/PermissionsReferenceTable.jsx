import { Card, Table, Title, Text, ScrollArea, Stack, Group, Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

// Tabla de referencia de permisos y endpoints protegidos
const PERMISSIONS_REFERENCE = [
  {
    name: 'create_user',
    description: 'Permite crear usuarios',
    endpoints: ['POST /api/users']
  },
  {
    name: 'read_user',
    description: 'Permite ver usuarios',
    endpoints: ['GET /api/users', 'GET /api/users/:id']
  },
  {
    name: 'update_user',
    description: 'Permite editar usuarios',
    endpoints: ['PUT /api/users/:id', 'POST /api/users/:id/restore']
  },
  {
    name: 'delete_user',
    description: 'Permite eliminar (desactivar) usuarios',
    endpoints: ['DELETE /api/users/:id']
  },
  {
    name: 'manage_roles',
    description: 'Permite gestionar roles, permisos y asignaciones',
    endpoints: [
      'GET /api/roles',
      'POST /api/roles',
      'PUT /api/roles/:id',
      'DELETE /api/roles/:id',
      'GET /api/permissions',
      'POST /api/permissions',
      'PUT /api/permissions/:id',
      'DELETE /api/permissions/:id',
      'GET /api/roles/:roleId/permissions',
      'POST /api/roles/:roleId/permissions',
      'DELETE /api/roles/:roleId/permissions/:permissionId',
      'GET /api/user-roles/:userId/roles',
      'POST /api/user-roles/:userId/roles',
      'DELETE /api/user-roles/:userId/roles/:roleId'
    ]
  },
  {
    name: 'view_audit',
    description: 'Permite ver auditoría',
    endpoints: ['GET /api/audit']
  },
  // Mantener sincronizado con backend/src/constants/permissionMatrix.js
];

export default function PermissionsReferenceTable() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
      <Title order={4} mb="md">Referencia de Permisos y Endpoints Protegidos</Title>
      {isMobile ? (
        <Stack gap="sm">
          {PERMISSIONS_REFERENCE.map(perm => (
            <Card key={perm.name} withBorder radius="md" p="sm">
              <Stack gap={6}>
                <Group justify="space-between" align="center">
                  <Text fw={600}>{perm.name}</Text>
                  <Badge size="sm" variant="light">Permiso</Badge>
                </Group>
                <Text size="sm" color="dimmed">{perm.description}</Text>
                <Stack gap={4}>
                  {perm.endpoints.map(ep => (
                    <Text key={ep} size="sm">{ep}</Text>
                  ))}
                </Stack>
              </Stack>
            </Card>
          ))}
        </Stack>
      ) : (
        <ScrollArea type="auto">
          <Table highlightOnHover withColumnBorders striped style={{ minWidth: 560 }}>
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
        </ScrollArea>
      )}
    </Card>
  );
}
