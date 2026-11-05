import { Title, Group, Badge, Text } from '@mantine/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import GlassCard from './GlassCard';

export default function ModuleAccessChart({ data, isDemo = false }) {
  return (
    <GlassCard mb="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title order={4}>Actividad por Módulo</Title>
        {isDemo && <Badge color="gray" variant="light">Demo</Badge>}
      </Group>
      {data.length === 0 ? <Text color="dimmed">No hay actividad registrada por módulo.</Text> : <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="module" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="access" fill="#26a69a" />
        </BarChart>
      </ResponsiveContainer>}
    </GlassCard>
  );
}
