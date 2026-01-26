
import { useState, useEffect } from 'react';
import { Card, Table, Button, TextInput, Title, Box, Text, Modal, Checkbox, Stack, Loader, SimpleGrid, ScrollArea } from '@mantine/core';
import DOMPurify from 'dompurify';
import { notifications } from '@mantine/notifications';
import { API_BASE } from '../apiConfig';
import { authFetch } from '../apiClient';


export default function RolesView() {
  const [roleName, setRoleName] = useState('');
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [rolePerms, setRolePerms] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loadingPerms, setLoadingPerms] = useState(false);
  const [saving, setSaving] = useState(false);

  const toArray = (value) => (Array.isArray(value) ? value : []);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);
  function fetchPermissions() {
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
      });
  }
  function fetchRoles() {
    authFetch(`${API_BASE}/api/roles`)
      .then(async res => {
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          notifications.show({
            color: res.status === 403 ? 'yellow' : 'red',
            title: res.status === 403 ? 'Acceso restringido' : 'Error',
            message:
              res.status === 403
                ? 'No tienes permiso para ver la sección de roles (requiere manage_roles).'
                : (data && data.error) || 'No se pudieron cargar los roles.',
            autoClose: 5000
          });
          return [];
        }
        return data;
      })
      .then(data => setRoles(toArray(data)))
      .catch(err => {
        console.error(err);
        setRoles([]);
      });
  }
  function handleAdd() {
    if (!roleName) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'El nombre del rol es obligatorio.',
        autoClose: 4000
      });
      return;
    }
    authFetch(`${API_BASE}/api/roles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: roleName })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: data.error || 'Error al crear rol.',
            autoClose: 4000
          });
          return;
        }
        notifications.show({
          color: 'green',
          title: 'Rol creado',
          message: 'El rol se creó correctamente.',
          autoClose: 3000
        });
        setRoleName('');
        fetchRoles();
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
  // ...existing code...

  function handleDelete(id) {
    authFetch(`${API_BASE}/api/roles/${id}`, {
      method: 'DELETE'
    })
      .then(async res => {
        if (res.ok) {
          notifications.show({
            color: 'green',
            title: 'Éxito',
            message: 'Rol eliminado exitosamente.',
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
          fetchRoles();
        } else {
          const data = await res.json();
          notifications.show({
            color: 'red',
            title: 'Error',
            message: data.error || 'Error al eliminar rol.',
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
        message: 'Error de red al eliminar rol.',
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

  // Mostrar permisos de un rol
  function handleShowPerms(role) {
    setSelectedRole(role);
    setLoadingPerms(true);
    authFetch(`${API_BASE}/api/roles/${role.id}/permissions`)
      .then(async res => {
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          notifications.show({
            color: res.status === 403 ? 'yellow' : 'red',
            title: res.status === 403 ? 'Acceso restringido' : 'Error',
            message:
              res.status === 403
                ? 'No tienes permiso para ver/editar permisos de roles.'
                : (data && data.error) || 'No se pudieron cargar los permisos del rol.',
            autoClose: 5000
          });
          return [];
        }
        return data;
      })
      .then(data => {
        const safePerms = toArray(data);
        setRolePerms(safePerms.map(p => p.id));
        setModalOpen(true);
        notifications.show({
          color: 'blue',
          title: 'Permisos cargados',
          message: `Permisos de ${role.name} listos para editar.`,
          withCloseButton: true,
          autoClose: 3500,
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
      })
      .catch(() => notifications.show({
        color: 'red',
        title: 'Error',
        message: 'No se pudieron cargar los permisos del rol.',
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
      }))
      .finally(() => setLoadingPerms(false));
  }

  // Guardar cambios de permisos
  function handleSavePerms() {
    setSaving(true);
    authFetch(`${API_BASE}/api/roles/${selectedRole.id}/permissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permissionIds: rolePerms })
    })
      .then(async res => {
        if (res.ok) {
          notifications.show({
            color: 'green',
            title: 'Permisos actualizados',
            message: `Permisos del rol actualizados correctamente.`,
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
          setModalOpen(false);
          setSelectedRole(null);
        } else {
          const data = await res.json();
          notifications.show({
            color: 'red',
            title: 'Error',
            message: data.error || 'Error al actualizar permisos.',
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
      .catch(() => notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Error de red al actualizar permisos.',
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
      }))
      .finally(() => setSaving(false));
  }

  return (
    <Box maw={1200} mx="auto" px={{ base: 'xs', sm: 'md', md: 'xl' }} mt="xl">
      <Card shadow="md" padding="lg" radius="md" withBorder mb="lg">
        <Title order={3} mb="md">Gestión de Roles</Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" mb="md">
          <TextInput
            label="Nombre del Rol"
            value={roleName}
            onChange={e => setRoleName(DOMPurify.sanitize(e.target.value))}
            placeholder="Nombre del rol"
            w="100%"
          />
          <Button color="blue" onClick={handleAdd} mt={{ base: 0, sm: 22 }} w={{ base: '100%', sm: 'auto' }}>
            Registrar
          </Button>
        </SimpleGrid>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">Lista de Roles</Title>
        <ScrollArea type="auto">
          <Table highlightOnHover withColumnBorders striped style={{ minWidth: 520 }}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Permisos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roles.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                    <Text color="dimmed" align="center">No hay roles registrados.</Text>
                  </td>
                </tr>
              ) : (
                roles.map(role => (
                  <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>
                      <Button size="xs" variant="light" onClick={() => handleShowPerms(role)}>
                        Ver/Editar Permisos
                      </Button>
                    </td>
                    <td>
                      <Button color="red" size="xs" onClick={() => handleDelete(role.id)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </ScrollArea>
      </Card>

      <Modal opened={modalOpen} onClose={() => setModalOpen(false)} title={selectedRole ? `Permisos de ${selectedRole.name}` : ''} size="lg">
        {loadingPerms ? (
          <Loader />
        ) : (
          <Stack>
            {permissions.map(perm => (
              <Checkbox
                key={perm.id}
                label={perm.name}
                checked={rolePerms.includes(perm.id)}
                onChange={e => {
                  if (e.target.checked) {
                    setRolePerms([...rolePerms, perm.id]);
                  } else {
                    setRolePerms(rolePerms.filter(id => id !== perm.id));
                  }
                }}
              />
            ))}
            <Button color="blue" onClick={handleSavePerms} loading={saving} mt="md">
              Guardar Cambios
            </Button>
          </Stack>
        )}
      </Modal>
    </Box>
  );
}
