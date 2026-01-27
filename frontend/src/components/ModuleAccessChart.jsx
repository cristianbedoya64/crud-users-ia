import { Card, Title, Group, Badge } from '@mantine/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ModuleAccessChart({ data, isDemo = false }) {
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title order={4}>Accesos por Módulo</Title>
        {isDemo && <Badge color="gray" variant="light">Demo</Badge>}
      </Group>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <XAxis dataKey="module" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="access" fill="#26a69a" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
