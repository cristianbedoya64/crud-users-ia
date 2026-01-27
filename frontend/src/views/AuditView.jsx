
import { useEffect, useMemo, useState } from 'react';
import { Card, Title, Text, List, Loader, TextInput, Select, Button, Group, SimpleGrid, Box } from '@mantine/core';
import { API_BASE } from '../apiConfig';
import { authFetch } from '../apiClient';

export default function AuditView() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [action, setAction] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const toArray = (value) => (Array.isArray(value) ? value : []);

  const fetchLogs = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.userId) params.set('userId', filters.userId);
      if (filters.action) params.set('action', filters.action);
      if (filters.from) params.set('from', filters.from);
      if (filters.to) params.set('to', filters.to);
      const url = params.toString()
        ? `${API_BASE}/api/audit?${params.toString()}`
        : `${API_BASE}/api/audit`;
      const res = await authFetch(url);
      const data = await res.json();
      setLogs(toArray(data));
    } catch {
      setLogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
    authFetch(`${API_BASE}/api/users?status=all&limit=500`)
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data) ? data : Array.isArray(data.users) ? data.users : [];
        setUsers(arr);
      })
      .catch(() => setUsers([]));
  }, []);

  const actionOptions = useMemo(() => {
    const set = new Set(logs.map(l => l.action).filter(Boolean));
    return Array.from(set).sort().map(value => ({ value, label: value }));
  }, [logs]);

  const userOptions = useMemo(() => {
    return users.map(u => ({ value: String(u.id), label: `${u.name} (${u.email})` }));
  }, [users]);

  const userMap = useMemo(() => {
    const map = new Map();
    users.forEach(u => map.set(String(u.id), u));
    return map;
  }, [users]);

  return (
    <Card shadow="md" padding={{ base: 'sm', sm: 'lg' }} radius="md" withBorder maw={900} mx="auto" px={{ base: 'xs', sm: 'md' }} mt="xl">
      <Title order={3} mb="md">Auditoría</Title>
      <Box mb="md">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="sm">
          <Select
            label="Usuario"
            placeholder="Todos"
            data={userOptions}
            value={userId}
            onChange={value => setUserId(value || '')}
            searchable
            clearable
          />
          <Select
            label="Acción"
            placeholder="Todas"
            data={actionOptions}
            value={action}
            onChange={value => setAction(value || '')}
            searchable
            clearable
          />
          <TextInput
            label="Desde"
            type="date"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
          <TextInput
            label="Hasta"
            type="date"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
        </SimpleGrid>
        <Group justify="flex-end" mt="sm" wrap="wrap">
          <Button variant="default" onClick={() => {
            setUserId('');
            setAction('');
            setFrom('');
            setTo('');
            fetchLogs();
          }}>
            Limpiar filtros
          </Button>
          <Button color="blue" onClick={() => fetchLogs({ userId, action, from, to })}>
            Aplicar filtros
          </Button>
        </Group>
      </Box>

      {loading ? (
        <Loader />
      ) : logs.length === 0 ? (
        <Text color="dimmed">No hay eventos de auditoría registrados.</Text>
      ) : (
        <List spacing="xs" size="sm">
          {logs.map((log, idx) => {
            const user = userMap.get(String(log.userId));
            const creator = userMap.get(String(log.createdBy));
            return (
              <List.Item key={log.id || idx}>
                <Text fw={500}>{log.action}</Text>
                <Text size="sm" color="dimmed">{log.details}</Text>
                <Text size="xs" color="gray">
                  {new Date(log.createdAt).toLocaleString()} · Usuario: {user ? user.name : log.userId} · Creado por: {creator ? creator.name : log.createdBy || '—'}
                </Text>
              </List.Item>
            );
          })}
        </List>
      )}
    </Card>
  );
}
