import { Title, Group, Badge } from '@mantine/core';
import { getAuditActionLabel } from '../utils/auditLabels';
import { IconEdit } from '@tabler/icons-react';
import GlassCard from './GlassCard';
import AuditTimeline from './AuditTimeline';

export default function ChangeHistory({ changes, isDemo = false }) {
  const safeChanges = Array.isArray(changes) ? changes : [];
  return (
    <GlassCard mb="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title order={4}>Historial de Cambios</Title>
        {isDemo && <Badge color="gray" variant="light">Demo</Badge>}
      </Group>
      <AuditTimeline
        items={safeChanges}
        emptyMessage="No hay cambios recientes."
        renderIcon={() => <IconEdit size={16} />}
        renderTitle={(change) => getAuditActionLabel(change.action)}
        renderDescription={(change) => change.details || 'Cambio registrado'}
      />
    </GlassCard>
  );
}
