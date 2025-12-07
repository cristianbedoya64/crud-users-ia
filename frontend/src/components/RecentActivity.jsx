import { Card, Title, List, Text } from '@mantine/core';

export default function RecentActivity({ logs }) {
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Title order={4} mb="md">Actividad Reciente</Title>
      <List spacing="xs" size="sm">
        {logs.length === 0 ? (
          <Text color="dimmed">No hay actividad reciente.</Text>
        ) : (
          logs.slice(0, 5).map((log, idx) => (
            <List.Item key={idx}>{log.details} <Text span color="dimmed">({log.action})</Text></List.Item>
          ))
        )}
      </List>
    </Card>
  );
}
