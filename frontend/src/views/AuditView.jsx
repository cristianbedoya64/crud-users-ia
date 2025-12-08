
import { useEffect, useState } from 'react';
import { Card, Title, Text, List, Loader } from '@mantine/core';

export default function AuditView() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/api/audit');
        const data = await res.json();
        setLogs(data);
      } catch {
        setLogs([]);
      }
      setLoading(false);
    }
    fetchLogs();
  }, []);

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder maw={600} mx="auto">
      <Title order={3} mb="md">Auditoría</Title>
      {loading ? (
        <Loader />
      ) : logs.length === 0 ? (
        <Text color="dimmed">No hay eventos de auditoría registrados.</Text>
      ) : (
        <List spacing="xs" size="sm">
          {logs.map((log, idx) => (
            <List.Item key={log.id || idx}>
              <Text fw={500}>{log.action}</Text>
              <Text size="sm" color="dimmed">{log.details}</Text>
              <Text size="xs" color="gray">{new Date(log.createdAt).toLocaleString()}</Text>
            </List.Item>
          ))}
        </List>
      )}
    </Card>
  );
}
