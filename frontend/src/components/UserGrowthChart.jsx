import { Card, Title } from '@mantine/core';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function UserGrowthChart({ data }) {
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Title order={4} mb="md">Tendencia de Usuarios</Title>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#1976d2" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
