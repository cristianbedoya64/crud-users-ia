import { Card, Title, Text, List, ThemeIcon, Group, Badge } from '@mantine/core';
import { IconBulb, IconAlertTriangle, IconTrendingUp } from '@tabler/icons-react';

export default function AIPanel({ data, status = 'available', message = '', isDemo = false }) {
  const suggestions = data?.suggestions;
  const anomalies = data?.anomalies;
  const predictions = data?.predictions;
  const isUnavailable = status !== 'available';
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title order={4}>Panel IA</Title>
        {isDemo && <Badge color="gray" variant="light">Demo</Badge>}
      </Group>
      {isUnavailable ? (
        <Text color="dimmed">
          {message || 'IA no disponible por el momento.'}
        </Text>
      ) : (
        <List spacing="xs" size="sm">
          <List.Item icon={<ThemeIcon color="yellow" radius="xl"><IconBulb size={18} /></ThemeIcon>}>
            <Text fw={500}>Sugerencia:</Text> {suggestions || 'No hay sugerencias automáticas.'}
          </List.Item>
          <List.Item icon={<ThemeIcon color="red" radius="xl"><IconAlertTriangle size={18} /></ThemeIcon>}>
            <Text fw={500}>Anomalía:</Text> {anomalies || 'No se detectaron anomalías.'}
          </List.Item>
          <List.Item icon={<ThemeIcon color="green" radius="xl"><IconTrendingUp size={18} /></ThemeIcon>}>
            <Text fw={500}>Predicción:</Text> {predictions || 'Sin predicciones relevantes.'}
          </List.Item>
        </List>
      )}
    </Card>
  );
}
