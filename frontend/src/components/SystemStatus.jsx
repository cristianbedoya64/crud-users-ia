import { Title, Group, Badge, Tooltip, Text } from '@mantine/core';
import { IconServer, IconDatabase, IconRobot } from '@tabler/icons-react';
import GlassCard from './GlassCard';
import StatusDot from './StatusDot';

export default function SystemStatus({ status, isDemo = false }) {
  return (
    <GlassCard mb="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title order={4}>Estado del Sistema</Title>
        {isDemo && <Badge color="gray" variant="light">Demo</Badge>}
      </Group>
      <Group wrap="wrap" gap="xl">
        <Tooltip label={`Estado de la API: ${status.api}`} withArrow>
          <Group gap="xs"><IconServer size={20} /><StatusDot status={status.api} label={`API · ${status.api}`} /></Group>
        </Tooltip>
        <Tooltip label={`Estado de la IA: ${status.ia}`} withArrow>
          <Group gap="xs"><IconRobot size={20} /><StatusDot status={status.ia} label={`IA · ${status.ia}`} /></Group>
        </Tooltip>
        <Tooltip label={`Estado de la base de datos: ${status.database}`} withArrow>
          <Group gap="xs"><IconDatabase size={20} /><StatusDot status={status.database} label={`Base de datos · ${status.database}`} /></Group>
        </Tooltip>
      </Group>
      {Object.values(status).some(value => value === 'no disponible') && (
        <Text size="xs" c="dimmed" mt="md">No disponible en el resumen actual.</Text>
      )}
    </GlassCard>
  );
}
