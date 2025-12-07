import { Card, Title, Text, List, ThemeIcon } from '@mantine/core';
import { IconBulb, IconAlertTriangle, IconTrendingUp } from '@tabler/icons-react';

export default function AIPanel({ suggestions, anomalies, predictions }) {
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Title order={4} mb="md">Panel IA</Title>
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
    </Card>
  );
}
