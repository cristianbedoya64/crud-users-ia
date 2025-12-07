import { Card, Title, List, Text, ThemeIcon } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

export default function SecurityAlerts({ alerts }) {
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Title order={4} mb="md">Alertas de Seguridad</Title>
      <List spacing="xs" size="sm">
        {alerts.length === 0 ? (
          <Text color="dimmed">No hay alertas recientes.</Text>
        ) : (
          alerts.slice(0, 5).map((alert, idx) => (
            <List.Item key={idx} icon={<ThemeIcon color="red" radius="xl"><IconAlertTriangle size={18} /></ThemeIcon>}>
              {alert.message} <Text span color="dimmed">({alert.date})</Text>
            </List.Item>
          ))
        )}
      </List>
    </Card>
  );
}
