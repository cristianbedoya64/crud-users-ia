
import { useState, useEffect } from 'react';
import { API_BASE } from '../apiConfig';
import { authFetch } from '../apiClient';
import { Card, Table, Button, TextInput, Title, Box, Text, SimpleGrid, ScrollArea, Stack, Group, Badge, Modal } from '@mantine/core';
import DOMPurify from 'dompurify';
import AssignPermissionsForm from '../components/AssignPermissionsForm';
import PermissionsReferenceTable from '../components/PermissionsReferenceTable';
import { notifications } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';

export default function PermissionsView() {
  const [permissions, setPermissions] = useState([]);
  const [permName, setPermName] = useState('');
  const [permDescription, setPermDescription] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPerm, setEditingPerm] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toArray = (value) => (Array.isArray(value) ? value : []);

  useEffect(() => {
    setLoadingPermissions(true);
    authFetch(`${API_BASE}/api/permissions`)
      .then(async res => {
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          notifications.show({
            color: res.status === 403 ? 'yellow' : 'red',
            title: res.status === 403 ? 'Acceso restringido' : 'Error',
            message:
              res.status === 403
                ? 'No tienes permiso para ver la lista de permisos.'
                : (data && data.error) || 'No se pudieron cargar los permisos.',
            autoClose: 4500
          });
          return [];
        }
        return data;
      })
      .then(data => setPermissions(toArray(data)))
      .catch(err => {
        console.error(err);
        setPermissions([]);
      })
      .finally(() => setLoadingPermissions(false));
  }, []);

  function handleAdd() {
    if (!permName) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'El nombre del permiso es obligatorio.',
        autoClose: 4000
      });
      return;
    }
    authFetch(`${API_BASE}/api/permissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: permName, description: permDescription })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: data.error || 'Error al crear permiso.',
            autoClose: 4000
          });
          return;
        }
        notifications.show({
          color: 'green',
          title: 'Permiso creado',
          message: 'El permiso se creó correctamente.',
          autoClose: 3000
        });
        setPermName('');
        setPermDescription('');
        authFetch(`${API_BASE}/api/permissions`)
          .then(async res2 => {
            const data2 = await res2.json().catch(() => null);
            if (!res2.ok) return [];
            return data2;
          })
          .then(data2 => setPermissions(toArray(data2)))
          .catch(() => setPermissions([]));
      })
      .catch(() => {
        notifications.show({
          color: 'red',
          title: 'Error de red',
          message: 'No se pudo conectar al servidor.',
          autoClose: 4000
        });
      });
  }

  function handleDelete(id) {
    authFetch(`${API_BASE}/api/permissions/${id}`, {
      method: 'DELETE'
    })
      .then(async res => {
        if (res.ok) {
          notifications.show({
            color: 'green',
            title: 'Éxito',
            message: 'Permiso eliminado exitosamente.',
            withCloseButton: true,
            autoClose: 4000,
            styles: theme => ({
              root: {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'fixed',
                zIndex: 9999,
                minWidth: 320,
                boxShadow: theme.shadows.xl,
                borderRadius: theme.radius.lg,
              }
            })
          });
          setPermissions(permissions.filter(p => p.id !== id));
        } else {
          const data = await res.json();
          notifications.show({
            color: 'red',
            title: 'Error',
            message: data.error || 'Error al eliminar permiso.',
            withCloseButton: true,
            autoClose: 5000,
            styles: theme => ({
              root: {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'fixed',
                zIndex: 9999,
                minWidth: 320,
                boxShadow: theme.shadows.xl,
                borderRadius: theme.radius.lg,
              }
            })
          });
        }
      })
      .catch(err => notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Error de red al eliminar permiso.',
        withCloseButton: true,
        autoClose: 5000,
        styles: theme => ({
          root: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            position: 'fixed',
            zIndex: 9999,
            minWidth: 320,
            boxShadow: theme.shadows.xl,
            borderRadius: theme.radius.lg,
          }
        })
      }));
  }

  function handleEdit(perm) {
    setEditingPerm(perm);
    setEditingName(perm?.name || '');
    setEditingDescription(perm?.description || '');
    setEditModalOpen(true);
  }

  function handleUpdate() {
    if (!editingPerm) return;
    if (!editingName) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'El nombre del permiso es obligatorio.',
        autoClose: 4000
      });
      return;
    }
    authFetch(`${API_BASE}/api/permissions/${editingPerm.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editingName, description: editingDescription })
    })
      .then(async res => {
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: (data && data.error) || 'Error al actualizar permiso.',
            autoClose: 4000
          });
          return;
        }
        notifications.show({
          color: 'green',
          title: 'Permiso actualizado',
          message: 'El permiso se actualizó correctamente.',
          autoClose: 3000
        });
        setEditModalOpen(false);
        setEditingPerm(null);
        authFetch(`${API_BASE}/api/permissions`)
          .then(async res2 => {
            const data2 = await res2.json().catch(() => null);
            if (!res2.ok) return [];
            return data2;
          })
          .then(data2 => setPermissions(toArray(data2)))
          .catch(() => setPermissions([]));
      })
      .catch(() => {
        notifications.show({
          color: 'red',
          title: 'Error de red',
          message: 'No se pudo conectar al servidor.',
          autoClose: 4000
        });
      });
  }

  return (
    <Box maw={1200} mx="auto" px={{ base: 'xs', sm: 'md', md: 'xl' }} mt="xl">
      <PermissionsReferenceTable />
      <Card shadow="md" padding="lg" radius="md" withBorder mb="lg">
        <Title order={3} mb="md">Gestión de Permisos</Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm" mb="md">
          <TextInput
            label="Nombre del Permiso"
            value={permName}
            onChange={e => setPermName(DOMPurify.sanitize(e.target.value))}
            placeholder="Nombre del permiso"
            w="100%"
          />
          <TextInput
            label="Descripción"
            value={permDescription}
            onChange={e => setPermDescription(DOMPurify.sanitize(e.target.value))}
            placeholder="Descripción (opcional)"
            w="100%"
          />
          <Button color="blue" onClick={handleAdd} mt={{ base: 0, sm: 22 }} w={{ base: '100%', sm: 'auto' }}>
            Registrar
          </Button>
        </SimpleGrid>
      </Card>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" mt={20}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={4} mb="md">Lista de Permisos</Title>
          {loadingPermissions ? (
            <Text color="dimmed" align="center">Cargando permisos...</Text>
          ) : isMobile ? (
            <Stack gap="sm">
              {permissions.length === 0 ? (
                <Text color="dimmed" align="center">No hay permisos registrados.</Text>
              ) : (
                permissions.map(perm => (
                  <Card key={perm.id} withBorder radius="md" p="sm">
                    <Stack gap={6}>
                      <Group justify="space-between" align="center">
                        <Text fw={600}>{perm.name}</Text>
                        <Badge size="sm" variant="light">ID {perm.id}</Badge>
                      </Group>
                      <Text size="sm" color="dimmed">
                        {perm.description || 'Sin descripción'}
                      </Text>
                      <Group gap="xs">
                        <Button color="yellow" size="xs" onClick={() => handleEdit(perm)}>
                          Editar
                        </Button>
                        <Button color="red" size="xs" onClick={() => handleDelete(perm.id)}>
                          Eliminar
                        </Button>
                      </Group>
                    </Stack>
                  </Card>
                ))
              )}
            </Stack>
          ) : (
            <ScrollArea type="auto">
              <Table highlightOnHover withColumnBorders striped style={{ minWidth: 520 }}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.length === 0 ? (
                    <tr>
                      <td colSpan={3}>
                        <Text color="dimmed" align="center">No hay permisos registrados.</Text>
                      </td>
                    </tr>
                  ) : (
                    permissions.map(perm => (
                      <tr key={perm.id}>
                        <td>{perm.name}</td>
                        <td>{perm.description || <Text color="dimmed">Sin descripción</Text>}</td>
                        <td>
                          <Button color="yellow" size="xs" mr={8} onClick={() => handleEdit(perm)}>
                            Editar
                          </Button>
                          <Button color="red" size="xs" onClick={() => handleDelete(perm.id)}>
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </ScrollArea>
          )}
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <AssignPermissionsForm />
        </Card>
      </SimpleGrid>

      <Modal opened={editModalOpen} onClose={() => setEditModalOpen(false)} title="Editar permiso" centered>
        <Stack>
          <TextInput
            label="Nombre"
            value={editingName}
            onChange={e => setEditingName(DOMPurify.sanitize(e.target.value))}
            placeholder="Nombre del permiso"
          />
          <TextInput
            label="Descripción"
            value={editingDescription}
            onChange={e => setEditingDescription(DOMPurify.sanitize(e.target.value))}
            placeholder="Descripción (opcional)"
          />
          <Button color="blue" onClick={handleUpdate}>Guardar</Button>
        </Stack>
      </Modal>
    </Box>
  );
}
