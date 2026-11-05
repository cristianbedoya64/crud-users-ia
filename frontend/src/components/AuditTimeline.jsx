import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import { Box, Text } from '@mantine/core';

dayjs.extend(relativeTime);
dayjs.locale('es');

export default function AuditTimeline({ items = [], emptyMessage, renderIcon, renderTitle, renderDescription }) {
  const safeItems = Array.isArray(items) ? items.slice(0, 5) : [];

  if (safeItems.length === 0) {
    return <Text c="dimmed">{emptyMessage}</Text>;
  }

  return (
    <Box className="dashboard-timeline">
      {safeItems.map((item, index) => {
        const date = item.date || item.createdAt;
        const validDate = date && dayjs(date).isValid();
        return (
          <Box className="dashboard-timeline-item" key={item.id || `${date || 'event'}-${index}`}>
            <Box className="dashboard-timeline-marker">{renderIcon(item)}</Box>
            <Box className="dashboard-timeline-content">
              <Text fw={600} size="sm">{renderTitle(item)}</Text>
              {renderDescription && <Text size="xs" c="dimmed">{renderDescription(item)}</Text>}
              <Text size="xs" c="dimmed" title={validDate ? dayjs(date).format('DD/MM/YYYY HH:mm') : undefined}>
                {validDate ? dayjs(date).fromNow() : 'Fecha no disponible'}
              </Text>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
