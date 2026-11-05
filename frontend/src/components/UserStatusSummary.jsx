import { Group, Box, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconUserCheck, IconUserX, IconClock } from '@tabler/icons-react';
import GlassCard from './GlassCard';
import AnimatedCounter from './AnimatedCounter';
import Sparkline from './Sparkline';

export default function UserStatusSummary({ active, inactive, pending }) {
  const cards = [
    { key: 'active', value: active, label: 'Activos', icon: IconUserCheck, color: 'var(--dashboard-success)' },
    { key: 'inactive', value: inactive, label: 'Bloqueados', icon: IconUserX, color: 'var(--dashboard-danger)' },
    { key: 'pending', value: pending, label: 'Pendientes', icon: IconClock, color: 'var(--dashboard-warning)' }
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
      {cards.map(({ key, value, label, icon: Icon, color }) => (
        <GlassCard key={key} className="dashboard-kpi-card dashboard-status-card">
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Group gap="sm" wrap="nowrap">
              <ThemeIcon className="dashboard-kpi-icon" style={{ '--dashboard-kpi-color': color }} size={42} radius="md">
                <Icon size={24} />
              </ThemeIcon>
              <Box>
                <Text className="dashboard-kpi-value" size="xl" fw={800}><AnimatedCounter value={value} /></Text>
                <Text size="sm" c="dimmed">{label}</Text>
              </Box>
            </Group>
            <Sparkline values={[value, value, value]} color={color} />
          </Group>
        </GlassCard>
      ))}
    </SimpleGrid>
  );
}
