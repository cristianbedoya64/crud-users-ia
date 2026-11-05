import { Title, Text } from '@mantine/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import GlassCard from './GlassCard';
import dashboardTokens from '../theme/dashboardTokens';

export default function TopPermissions({ permissions, error }) {
  const safePermissions = Array.isArray(permissions) ? permissions : [];
  return (
    <GlassCard mb="xl">
      <Title order={4} mb="md">Permisos más asignados</Title>
      {error ? (
          <Text c="red" size="sm">{error}</Text>
        ) : safePermissions.length === 0 ? (
          <Text color="dimmed">No hay asignaciones de permisos.</Text>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={safePermissions.slice(0, 5)} layout="vertical" margin={{ left: 12, right: 12 }}>
              <XAxis type="number" allowDecimals={false} hide />
              <YAxis type="category" dataKey="name" width={120} tick={{ fill: dashboardTokens.colors.muted, fontSize: 11 }} />
              <Tooltip contentStyle={{ background: dashboardTokens.colors.surfaceRaised, border: `1px solid ${dashboardTokens.colors.violet}`, borderRadius: 10 }} formatter={(value) => [`${value} asignaciones`, 'Total']} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {safePermissions.slice(0, 5).map((permission, index) => (
                  <Cell key={permission.name || index} fill={index === 0 ? dashboardTokens.colors.violet : dashboardTokens.colors.electric} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
    </GlassCard>
  );
}
