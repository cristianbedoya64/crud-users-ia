import { Title } from '@mantine/core';
import { IconLogin } from '@tabler/icons-react';
import GlassCard from './GlassCard';
import AuditTimeline from './AuditTimeline';

export default function LastLogins({ logins }) {
  return (
    <GlassCard mb="xl">
      <Title order={4} mb="md">Últimos accesos</Title>
      <AuditTimeline
        items={logins}
        emptyMessage="No hay accesos recientes."
        renderIcon={() => <IconLogin size={16} />}
        renderTitle={(login) => login.user || 'Usuario no disponible'}
        renderDescription={() => 'Inicio de sesión exitoso'}
      />
    </GlassCard>
  );
}
