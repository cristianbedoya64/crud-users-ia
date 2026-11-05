
import { useEffect, useMemo, useState } from 'react';
import { Card, Title, Text, List, Loader, TextInput, Select, Button, Group, SimpleGrid, Box, Pagination, Badge } from '@mantine/core';
import { API_BASE } from '../apiConfig';
import { authFetch } from '../apiClient';
import { getAuditActionLabel, getAuditActionOptions } from '../utils/auditLabels';

export default function AuditView() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [action, setAction] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 0, limit: 20 });
  const [error, setError] = useState('');

  const fetchLogs = async (filters = {}, requestedPage = 1) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (filters.userId) params.set('userId', filters.userId);
      if (filters.action) params.set('action', filters.action);
      if (filters.from) params.set('from', filters.from);
      if (filters.to) params.set('to', filters.to);
      params.set('page', requestedPage);
      params.set('limit', pagination.limit);
      const url = params.toString()
        ? `${API_BASE}/api/audit?${params.toString()}`
        : `${API_BASE}/api/audit`;
      const res = await authFetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'No se pudo consultar la auditoría');
      setLogs(Array.isArray(data) ? data : (data.logs || []));
      setPagination(Array.isArray(data) ? { total: data.length, pages: 1, limit: data.length || 20 } : data);
      setPage(Array.isArray(data) ? 1 : (data.page || requestedPage));
    } catch (err) {
      setLogs([]);
      setError(err.message || 'No se pudo consultar la auditoría');
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
    return getAuditActionOptions(Array.from(set));
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
      ) : error ? (
        <Text c="red">{error}</Text>
      ) : logs.length === 0 ? (
        <Text color="dimmed">No hay eventos de auditoría registrados.</Text>
      ) : (
        <List spacing="xs" size="sm">
          {logs.map((log, idx) => {
            const user = userMap.get(String(log.userId));
            const creator = userMap.get(String(log.createdBy));
            return (
              <List.Item key={log.id || idx}>
                <Text fw={500}>{getAuditActionLabel(log.action)}</Text>
                <Text size="sm" c="dimmed">{typeof log.details === 'object' ? JSON.stringify(log.details) : log.details}</Text>
                <Box component="div" fz="xs" c="dimmed">
                  {new Date(log.date || log.createdAt).toLocaleString()} · Usuario: {(log.executor || creator || user)?.name || '—'} · Recurso: {log.resource || 'sistema'} · <Badge size="xs" color={log.result === 'failed' ? 'red' : 'green'}>{log.result === 'failed' ? 'Fallido' : 'Correcto'}</Badge>
                </Box>
              </List.Item>
            );
          })}
        </List>
      )}
      {!loading && !error && pagination.pages > 1 && (
        <Pagination mt="md" value={page} total={pagination.pages} onChange={(value) => {
          setPage(value);
          fetchLogs({ userId, action, from, to }, value);
        }} />
      )}
    </Card>
  );
}
