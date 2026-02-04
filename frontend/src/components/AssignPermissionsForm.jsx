import DOMPurify from 'dompurify';
import React, { useState, useEffect } from 'react';
import { API_BASE } from '../apiConfig';
import { authFetch } from '../apiClient';
import { notifications } from '@mantine/notifications';
import { notifyError, notifyWarning } from '../utils/notify';
import { Card, Title, Select, MultiSelect, Button, Text, Stack, Group, Loader } from '@mantine/core';

export default function AssignPermissionsForm({ onAssigned }) {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPerms, setSelectedPerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingPerms, setLoadingPerms] = useState(false);

  const toArray = (value) => (Array.isArray(value) ? value : []);

  useEffect(() => {
    setLoadingRoles(true);
    authFetch(`${API_BASE}/api/roles`)
      .then(async res => {
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          const message =
            res.status === 403
              ? 'No tienes permiso para listar roles (requiere manage_roles).'
              : (data && data.error) || 'No se pudieron cargar los roles.';
          if (res.status === 403) {
            notifyWarning({ title: 'Acceso restringido', message, autoClose: 5000 });
          } else {
            notifyError({ title: 'Error', message, autoClose: 5000 });
          }
          return [];
        }
        return data;
      })
      .then(data => setRoles(toArray(data)))
      .catch(() => setRoles([]))
      .finally(() => setLoadingRoles(false));

    setLoadingPerms(true);
    authFetch(`${API_BASE}/api/permissions`)
      .then(async res => {
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          const message =
            res.status === 403
              ? 'No tienes permiso para listar permisos.'
              : (data && data.error) || 'No se pudieron cargar los permisos.';
          if (res.status === 403) {
            notifyWarning({ title: 'Acceso restringido', message, autoClose: 5000 });
          } else {
            notifyError({ title: 'Error', message, autoClose: 5000 });
          }
          return [];
        }
        return data;
      })
      .then(data => setPermissions(toArray(data)))
      .catch(() => setPermissions([]))
      .finally(() => setLoadingPerms(false));
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedRole || selectedPerms.length === 0) {
      setMessage('Selecciona un rol y al menos un permiso.');
      notifyError({
        title: 'Error',
        message: 'Selecciona un rol y al menos un permiso.',
        autoClose: 4000
      });
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const res = await authFetch(`${API_BASE}/api/roles/${selectedRole}/permissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissionIds: selectedPerms.map(id => Number(id)) })
      });
      if (res.ok) {
        setMessage('Permisos asignados correctamente.');
        notifications.show({
          color: 'green',
          title: 'Éxito',
          message: 'Permisos asignados correctamente.',
          autoClose: 3000
        });
        if (onAssigned) onAssigned();
      } else {
        const data = await res.json();
        setMessage(data.error || 'Error al asignar permisos.');
        notifyError({
          title: 'Error',
          message: data.error || 'Error al asignar permisos.',
          autoClose: 4000
        });
      }
    } catch (err) {
      setMessage('Error de red.');
      notifyError({
        title: 'Error de red',
        message: 'No se pudo conectar al servidor.',
        autoClose: 4000
      });
    }
    setLoading(false);
  };

  const roleOptions = roles.map(role => ({ value: String(role.id), label: role.name }));
  const permOptions = permissions.map(perm => ({ value: String(perm.id), label: perm.name }));

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="sm">
        <Title order={4}>Asignar permisos a rol</Title>
        {(loadingRoles || loadingPerms) && (
          <Group justify="center"><Loader size="sm" /></Group>
        )}
        {!loadingRoles && roleOptions.length === 0 && (
          <Text size="sm" color="dimmed">No hay roles disponibles.</Text>
        )}
        {!loadingPerms && permOptions.length === 0 && (
          <Text size="sm" color="dimmed">No hay permisos disponibles.</Text>
        )}

        <form onSubmit={handleAssign}>
          <Stack gap="sm">
            <Select
              label="Rol"
              placeholder="Selecciona un rol"
              data={roleOptions}
              value={selectedRole}
              onChange={value => setSelectedRole(DOMPurify.sanitize(value || ''))}
              searchable
              clearable
              required
            />
            <MultiSelect
              label="Permisos"
              placeholder="Selecciona permisos"
              data={permOptions}
              value={selectedPerms}
              onChange={values => setSelectedPerms(values.map(v => DOMPurify.sanitize(v)))}
              searchable
              clearable
              required
            />
            <Button type="submit" loading={loading} fullWidth>
              {loading ? 'Asignando...' : 'Asignar permisos'}
            </Button>
            {message && (
              <Text size="sm" color={message.includes('correctamente') ? 'green' : 'red'}>
                {message}
              </Text>
            )}
          </Stack>
        </form>
      </Stack>
    </Card>
  );
}
