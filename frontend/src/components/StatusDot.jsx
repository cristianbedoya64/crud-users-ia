import { Box, Text } from '@mantine/core';

const STATUS_COLORS = {
  online: 'var(--dashboard-success)',
  healthy: 'var(--dashboard-success)',
  active: 'var(--dashboard-success)',
  warning: 'var(--dashboard-warning)',
  offline: 'var(--dashboard-danger)',
  error: 'var(--dashboard-danger)'
};

export default function StatusDot({ status, label, pulse = true }) {
  const normalizedStatus = String(status || 'offline').toLowerCase();
  const color = STATUS_COLORS[normalizedStatus] || 'var(--dashboard-muted)';

  return (
    <Box className="dashboard-status" style={{ '--dashboard-status-color': color }}>
      <span className={`dashboard-status-dot${pulse ? ' dashboard-status-dot--pulse' : ''}`} aria-hidden="true" />
      {label && <Text component="span" size="sm">{label}</Text>}
    </Box>
  );
}
