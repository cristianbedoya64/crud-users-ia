import { Card, Title, Group, ThemeIcon, Text, Badge } from '@mantine/core';
import { IconServer, IconCloud, IconRobot } from '@tabler/icons-react';

export default function SystemStatus({ status, isDemo = false }) {
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title order={4}>Estado del Sistema</Title>
        {isDemo && <Badge color="gray" variant="light">Demo</Badge>}
      </Group>
      <Group wrap="wrap">
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
