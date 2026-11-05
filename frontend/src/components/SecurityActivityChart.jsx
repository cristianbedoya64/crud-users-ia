import { Title, Text, Center } from '@mantine/core';
import ReactECharts from 'echarts-for-react';
import GlassCard from './GlassCard';
import dashboardTokens from '../theme/dashboardTokens';

const ACTION_LABELS = {
  login: 'Accesos exitosos',
  failed_access: 'Accesos rechazados',
  logout: 'Cierres de sesión',
  refresh_token: 'Sesiones renovadas'
};

export default function SecurityActivityChart({ data = [] }) {
  const chartData = data
    .filter(item => ACTION_LABELS[item.action])
    .map(item => ({
      name: ACTION_LABELS[item.action],
      value: Number(item.count) || 0
    }))
    .filter(item => item.value > 0);
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <GlassCard mb="xl">
      <Title order={4} mb="md">Actividad de Seguridad</Title>
      {chartData.length === 0 ? (
        <Text c="dimmed">No hay actividad de seguridad disponible.</Text>
      ) : (
        <ReactECharts
          style={{ height: 220, width: '100%' }}
          option={{
            tooltip: { trigger: 'item' },
            legend: { bottom: 0, textStyle: { color: dashboardTokens.colors.muted } },
            color: [dashboardTokens.colors.success, dashboardTokens.colors.danger, dashboardTokens.colors.electric, dashboardTokens.colors.warning],
            series: [{
              name: 'Eventos',
              type: 'pie',
              radius: ['42%', '70%'],
              avoidLabelOverlap: true,
              itemStyle: { borderRadius: 6, borderColor: dashboardTokens.colors.surface, borderWidth: 2 },
              label: { show: false },
              emphasis: { label: { show: true, fontWeight: 'bold', color: dashboardTokens.colors.text } },
              data: chartData
            }],
            graphic: [{
              type: 'text',
              left: 'center',
              top: '42%',
              style: { text: `${total}\nEventos`, textAlign: 'center', fill: dashboardTokens.colors.text, fontSize: 18, fontWeight: 700, lineHeight: 24 }
            }]
          }}
        />
      )}
    </GlassCard>
  );
}
