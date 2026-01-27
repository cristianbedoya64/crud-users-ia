import { Card, Title, List, Text, Group, Badge } from '@mantine/core';
import dayjs from 'dayjs';

export default function ChangeHistory({ changes, isDemo = false }) {
  const safeChanges = Array.isArray(changes) ? changes : [];
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title order={4}>Historial de Cambios</Title>
        {isDemo && <Badge color="gray" variant="light">Demo</Badge>}
      </Group>
      <List spacing="xs" size="sm">
        {safeChanges.length === 0 ? (
          <Text color="dimmed">No hay cambios recientes.</Text>
        ) : (
          safeChanges.slice(0, 5).map((change, idx) => (
            <List.Item key={idx}>{change.action} <Text span color="dimmed">({change.date ? dayjs(change.date).format('DD/MM/YYYY HH:mm') : 'Sin fecha'})</Text></List.Item>
          ))
        )}
      </List>
    </Card>
  );
}
