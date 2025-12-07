import { Card, Title } from '@mantine/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ModuleAccessChart({ data }) {
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Title order={4} mb="md">Accesos por Módulo</Title>
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
