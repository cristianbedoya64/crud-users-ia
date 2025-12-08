import { Card, Title, List, Text } from '@mantine/core';
import dayjs from 'dayjs';

export default function ChangeHistory({ changes }) {
  const safeChanges = Array.isArray(changes) ? changes : [];
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Title order={4} mb="md">Historial de Cambios</Title>
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
