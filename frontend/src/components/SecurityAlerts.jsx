import { Title, Group, Badge } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import GlassCard from './GlassCard';
import AuditTimeline from './AuditTimeline';

export default function SecurityAlerts({ alerts, isDemo = false }) {
  return (
    <GlassCard mb="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title order={4}>Alertas de Seguridad</Title>
        {isDemo && <Badge color="gray" variant="light">Demo</Badge>}
      </Group>
      <AuditTimeline
        items={alerts}
        emptyMessage="No hay alertas recientes."
        renderIcon={() => <IconAlertTriangle size={16} />}
        renderTitle={(alert) => alert.message || 'Acceso rechazado'}
      />
    </GlassCard>
  );
}
