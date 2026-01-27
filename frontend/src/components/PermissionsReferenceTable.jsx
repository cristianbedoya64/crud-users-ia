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
