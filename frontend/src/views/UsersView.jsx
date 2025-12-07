
import { useState, useEffect } from 'react';
import { Card, Table, Button, TextInput, Group, Title, Box, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';

export default function UsersView() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const fetchUsers = () => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  function validateEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }

  function handleAdd() {
    if (!form.name || !form.email || !form.password) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Todos los campos son obligatorios.',
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
    if (!validateEmail(form.email)) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'El email no tiene un formato válido.',
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
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: data.error || 'Error al crear usuario.',
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
            message: data.message || 'Usuario creado exitosamente.',
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
          setForm({ name: '', email: '', password: '' });
          fetchUsers();
        }
      })
      .catch(err => notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Error de red.',
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
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'DELETE'
    })
      .then(async res => {
        if (res.ok) {
          notifications.show({
            color: 'green',
            title: 'Éxito',
            message: 'Usuario eliminado exitosamente.',
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
          fetchUsers();
        } else {
          const data = await res.json();
          notifications.show({
            color: 'red',
            title: 'Error',
            message: data.error || 'Error al eliminar usuario.',
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
        message: 'Error de red al eliminar usuario.',
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
        <Title order={3} mb="md">Gestión de Usuarios</Title>
        <Group mb="md" grow>
          <TextInput
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <TextInput
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <TextInput
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
          />
          <Button color="blue" onClick={handleAdd} mt={22}>
            Registrar
          </Button>
        </Group>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">Lista de Usuarios</Title>
        <Table highlightOnHover withColumnBorders striped>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={3}>
                  <Text color="dimmed" align="center">No hay usuarios registrados.</Text>
                </td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button color="red" size="xs" onClick={() => handleDelete(user.id)}>
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
