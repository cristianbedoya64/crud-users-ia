import { Title } from '@mantine/core';
import { getAuditActionLabel } from '../utils/auditLabels';
import { IconActivity } from '@tabler/icons-react';
import GlassCard from './GlassCard';
import AuditTimeline from './AuditTimeline';

export default function RecentActivity({ logs }) {
  return (
    <GlassCard mb="xl">
      <Title order={4} mb="md">Actividad Reciente</Title>
      <AuditTimeline
        items={logs}
        emptyMessage="No hay actividad reciente."
        renderIcon={() => <IconActivity size={16} />}
        renderTitle={(log) => getAuditActionLabel(log.action)}
        renderDescription={(log) => log.details || 'Actividad registrada'}
      />
    </GlassCard>
  );
}
