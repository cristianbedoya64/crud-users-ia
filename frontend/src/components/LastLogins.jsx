import { Card, Title, List, Text } from '@mantine/core';
import dayjs from 'dayjs';

export default function LastLogins({ logins }) {
  return (
    <Card shadow="md" radius="md" withBorder mb="xl">
      <Title order={4} mb="md">Últimos accesos</Title>
      <List spacing="xs" size="sm">
        {logins.length === 0 ? (
          <Text color="dimmed">No hay accesos recientes.</Text>
        ) : (
          logins.slice(0, 5).map((login, idx) => (
            <List.Item key={idx}>{login.user} <Text span color="dimmed">({dayjs(login.date).format('DD/MM/YYYY HH:mm')})</Text></List.Item>
          ))
        )}
      </List>
    </Card>
  );
}
