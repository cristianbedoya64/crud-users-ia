import { Card, Title, Group, ThemeIcon, Text } from '@mantine/core';
import { IconServer, IconCloud, IconRobot } from '@tabler/icons-react';

export default function SystemStatus({ status }) {
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Title order={4} mb="md">Estado del Sistema</Title>
      <Group>
        <ThemeIcon color={status.api === 'online' ? 'green' : 'red'} radius="xl"><IconServer size={22} /></ThemeIcon>
        <Text>API: {status.api}</Text>
        <ThemeIcon color={status.ia === 'online' ? 'green' : 'red'} radius="xl"><IconRobot size={22} /></ThemeIcon>
        <Text>IA: {status.ia}</Text>
        <ThemeIcon color={status.cloud === 'online' ? 'green' : 'red'} radius="xl"><IconCloud size={22} /></ThemeIcon>
        <Text>Cloud: {status.cloud}</Text>
      </Group>
    </Card>
  );
}
