import { Card, Title, List, Text } from '@mantine/core';

export default function TopPermissions({ permissions }) {
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Title order={4} mb="md">Permisos más usados</Title>
      <List spacing="xs" size="sm">
        {permissions.length === 0 ? (
          <Text color="dimmed">No hay datos de uso de permisos.</Text>
        ) : (
          permissions.slice(0, 5).map((perm, idx) => (
            <List.Item key={idx}>{perm.name} <Text span color="dimmed">({perm.count} usos)</Text></List.Item>
          ))
        )}
      </List>
    </Card>
  );
}
