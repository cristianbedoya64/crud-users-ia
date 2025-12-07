
import { useState, useEffect } from 'react';
import { Card, Table, Button, TextInput, Group, Title, Box, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';

export default function PermissionsView() {
  const [permissions, setPermissions] = useState([]);
  const [permName, setPermName] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/permissions')
      .then(res => res.json())
      .then(data => setPermissions(data))
      .catch(err => console.error(err));
  }, []);

  function handleAdd() {
    if (!permName) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'El nombre del permiso es obligatorio.',
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
      return;
    }
    fetch('http://localhost:3000/api/permissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: permName })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: data.error || 'Error al crear permiso.',
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
        } else {
          notifications.show({
            color: 'green',
            title: 'Éxito',
            message: data.message || 'Permiso creado exitosamente.',
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
          if (data.permission) {
            setPermissions([...permissions, data.permission]);
          } else {
            notifications.show({
              color: 'yellow',
              title: 'Advertencia',
              message: 'El backend no devolvió el permiso creado. Se recargará la lista.',
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
            // Recargar lista de permisos
            fetch('http://localhost:3000/api/permissions')
              .then(res => res.json())
              .then(data => setPermissions(data));
          }
          setPermName('');
        }
      })
      .catch(err => notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Error de red al crear permiso.',
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

  function handleDelete(id) {
    fetch(`http://localhost:3000/api/permissions/${id}`, {
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

  return (
    <Box maw={600} mx="auto">
      <Card shadow="md" padding="lg" radius="md" withBorder mb="lg">
        <Title order={3} mb="md">Gestión de Permisos</Title>
        <Group mb="md" grow>
          <TextInput
            label="Nombre del Permiso"
            value={permName}
            onChange={e => setPermName(e.target.value)}
            placeholder="Nombre del permiso"
          />
          <Button color="blue" onClick={handleAdd} mt={22}>
            Registrar
          </Button>
        </Group>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">Lista de Permisos</Title>
        <Table highlightOnHover withColumnBorders striped>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {permissions.length === 0 ? (
              <tr>
                <td colSpan={2}>
                  <Text color="dimmed" align="center">No hay permisos registrados.</Text>
                </td>
              </tr>
            ) : (
              permissions.map(perm => (
                <tr key={perm.id}>
                  <td>{perm.name}</td>
                  <td>
                    <Button color="red" size="xs" onClick={() => handleDelete(perm.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>
    </Box>
  );
}
