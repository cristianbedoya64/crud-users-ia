import { Title, Text } from '@mantine/core';
import ReactECharts from 'echarts-for-react';
import GlassCard from './GlassCard';
import dashboardTokens from '../theme/dashboardTokens';

export default function UserRegistrationChart({ data = [] }) {
  const dates = data.map(item => item.date);
  const counts = data.map(item => Number(item.count) || 0);

  return (
    <GlassCard mb="xl">
      <Title order={4} mb="md">Nuevos Usuarios</Title>
      {data.length === 0 ? (
        <Text c="dimmed">No hay nuevos usuarios en el periodo.</Text>
      ) : (
        <ReactECharts
          style={{ height: 220, width: '100%' }}
          option={{
            tooltip: { trigger: 'axis' },
            grid: { left: 36, right: 16, top: 16, bottom: 32 },
            grid: { left: 36, right: 16, top: 16, bottom: 32, containLabel: true },
            xAxis: { type: 'category', data: dates, axisLabel: { color: dashboardTokens.colors.muted } },
            yAxis: { type: 'value', minInterval: 1, axisLabel: { color: dashboardTokens.colors.muted }, splitLine: { lineStyle: { color: dashboardTokens.colors.grid } } },
            series: [{
              name: 'Usuarios',
              type: 'line',
              smooth: true,
              data: counts,
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0, y: 0, x2: 0, y2: 1,
                  colorStops: [
                    { offset: 0, color: 'rgba(45, 212, 191, 0.42)' },
                    { offset: 1, color: 'rgba(45, 212, 191, 0.02)' }
                  ]
                }
              },
              lineStyle: { width: 3 },
              itemStyle: { color: dashboardTokens.colors.cyan }
            }]
          }}
        />
      )}
    </GlassCard>
  );
}
