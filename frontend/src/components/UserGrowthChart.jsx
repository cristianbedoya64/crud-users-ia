import { Title, Group, Badge, Text } from '@mantine/core';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import GlassCard from './GlassCard';
import dashboardTokens from '../theme/dashboardTokens';

export default function UserGrowthChart({ data, isDemo = false }) {
  const safeData = Array.isArray(data) ? data : [];
  return (
    <GlassCard mb="xl">
      <Group justify="space-between" align="center" mb="md">
        <Title order={4}>Actividad de Auditoría por Fecha</Title>
        {isDemo && <Badge color="gray" variant="light">Demo</Badge>}
      </Group>
      {safeData.length === 0 ? <Text c="dimmed">No hay actividad disponible.</Text> : (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={safeData}>
            <defs>
              <linearGradient id="auditActivityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={dashboardTokens.colors.electric} stopOpacity={0.45} />
                <stop offset="100%" stopColor={dashboardTokens.colors.electric} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={dashboardTokens.colors.grid} vertical={false} />
            <XAxis dataKey="date" tick={{ fill: dashboardTokens.colors.muted, fontSize: 11 }} />
            <YAxis allowDecimals={false} tick={{ fill: dashboardTokens.colors.muted, fontSize: 11 }} />
            <Tooltip contentStyle={{ background: dashboardTokens.colors.surfaceRaised, border: `1px solid ${dashboardTokens.colors.electric}`, borderRadius: 10 }} />
            <Area type="monotone" dataKey="count" stroke={dashboardTokens.colors.electric} strokeWidth={3} fill="url(#auditActivityGradient)" activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </GlassCard>
  );
}
