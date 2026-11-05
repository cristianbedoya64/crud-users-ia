import { Card } from '@mantine/core';
import dashboardTokens from '../theme/dashboardTokens';

export default function GlassCard({ children, className = '', style, ...props }) {
  return (
    <Card
      {...props}
      className={`dashboard-glass-card ${className}`.trim()}
      style={{
        '--dashboard-card-shadow': dashboardTokens.shadows.card,
        '--dashboard-card-glow': dashboardTokens.shadows.glow,
        ...style
      }}
    >
      {children}
    </Card>
  );
}
