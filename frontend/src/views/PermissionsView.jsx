
import { useState, useEffect } from 'react';
import { API_BASE } from '../apiConfig';
import { Card, Table, Button, TextInput, Group, Title, Box, Text } from '@mantine/core';
import DOMPurify from 'dompurify';
import AssignPermissionsForm from '../components/AssignPermissionsForm';
import PermissionsReferenceTable from '../components/PermissionsReferenceTable';
import { notifications } from '@mantine/notifications';

export default function PermissionsView() {
  const [permissions, setPermissions] = useState([]);
  const [permName, setPermName] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/permissions`)
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
        autoClose: 4000
      });
      return;
    }
    fetch(`${API_BASE}/api/permissions`, {
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
        fetch(`${API_BASE}/api/permissions`)
          .then(res => res.json())
          .then(data => setPermissions(data));
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
    fetch(`${API_BASE}/api/permissions/${id}`, {
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
    <Box maw={1200} mx="auto" px={{ base: 'xs', sm: 'md', md: 'xl' }} mt="xl">
      <PermissionsReferenceTable />
      <Card shadow="md" padding="lg" radius="md" withBorder mb="lg">
        <Title order={3} mb="md">Gestión de Permisos</Title>
        <Group mb="md" grow>
          <TextInput
            label="Nombre del Permiso"
            value={permName}
            onChange={e => setPermName(DOMPurify.sanitize(e.target.value))}
            placeholder="Nombre del permiso"
          />
          <Button color="blue" onClick={handleAdd} mt={22}>
            Registrar
          </Button>
        </Group>
      </Card>
      <Group align="flex-start" mt={20}>
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flex: 1 }}>
          <Title order={4} mb="md">Lista de Permisos</Title>
          <Table highlightOnHover withColumnBorders striped>
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
                  <td colSpan={2}>
                    <Text color="dimmed" align="center">No hay permisos registrados.</Text>
                  </td>
                </tr>
              ) : (
                permissions.map(perm => (
                  <tr key={perm.id}>
                    <td>{perm.name}</td>
                    <td>{perm.description || <Text color="dimmed">Sin descripción</Text>}</td>
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
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flex: 1, minWidth: 400 }}>
          <AssignPermissionsForm />
        </Card>
      </Group>
    </Box>
  );
}
