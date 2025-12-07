import { Card, Title, List, Text } from '@mantine/core';
import dayjs from 'dayjs';

export default function ChangeHistory({ changes }) {
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Title order={4} mb="md">Historial de Cambios</Title>
      <List spacing="xs" size="sm">
        {changes.length === 0 ? (
          <Text color="dimmed">No hay cambios recientes.</Text>
        ) : (
          changes.slice(0, 5).map((change, idx) => (
            <List.Item key={idx}>{change.action} <Text span color="dimmed">({dayjs(change.date).format('DD/MM/YYYY HH:mm')})</Text></List.Item>
          ))
        )}
      </List>
    </Card>
  );
}
