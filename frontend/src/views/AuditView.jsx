
import { Card, Title, Text } from '@mantine/core';

export default function AuditView() {
  return (
    <Card shadow="md" padding="lg" radius="md" withBorder maw={600} mx="auto">
      <Title order={3} mb="md">Auditoría</Title>
      <Text color="dimmed">Aquí se mostrarán los logs y eventos de auditoría del sistema.</Text>
    </Card>
  );
}
