import { Group, Text, Box, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconUsers, IconShield, IconKey, IconHistory } from '@tabler/icons-react';
import GlassCard from './GlassCard';
import AnimatedCounter from './AnimatedCounter';
import Sparkline from './Sparkline';

export default function DashboardSummary({ totals }) {
  const cards = [
    { key: 'users', label: 'Usuarios', icon: IconUsers, color: 'var(--dashboard-electric)', values: totals.userSparkline },
    { key: 'roles', label: 'Roles', icon: IconShield, color: 'var(--dashboard-cyan)', values: totals.roleSparkline },
    { key: 'permissions', label: 'Permisos', icon: IconKey, color: 'var(--dashboard-violet)', values: totals.permissionSparkline },
    { key: 'logs', label: 'Auditoría', icon: IconHistory, color: 'var(--dashboard-warning)', values: totals.auditSparkline }
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg" mb="xl">
      {cards.map(({ key, label, icon: Icon, color, values }) => (
        <GlassCard key={key} className="dashboard-kpi-card">
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Group gap="sm" wrap="nowrap">
              <ThemeIcon className="dashboard-kpi-icon" style={{ '--dashboard-kpi-color': color }} size={42} radius="md">
                <Icon size={24} />
              </ThemeIcon>
              <Box>
                <Text className="dashboard-kpi-value" size="xl" fw={800}>
                  <AnimatedCounter value={totals[key]} />
                </Text>
                <Text size="sm" c="dimmed">{label}</Text>
              </Box>
            </Group>
            <Sparkline values={values} color={color} />
          </Group>
        </GlassCard>
      ))}
    </SimpleGrid>
  );
}
