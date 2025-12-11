
import { useState, useEffect } from 'react';
import { Card, Table, Button, TextInput, Group, Title, Box, Text, MultiSelect, Modal, Stack } from '@mantine/core';
import DOMPurify from 'dompurify';
import { Loader } from '@mantine/core';
import { Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';

export default function UsersView() {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [form, setForm] = useState({ documentId: '', name: '', email: '', password: '', roles: [] });
  const [editModal, setEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  // Obtener roles disponibles
  const fetchRoles = () => {
    setLoadingRoles(true);
    fetch('http://localhost:3000/api/roles')
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.error(err))
      .finally(() => setLoadingRoles(false));
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: DOMPurify.sanitize(e.target.value) });
  }

  const fetchUsers = () => {
    setLoadingUsers(true);
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => {
        console.log('Usuarios recibidos:', data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error('La respuesta de /api/users no es un array:', data);
          setUsers([]);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoadingUsers(false));
  };
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  function handleAdd() {
    if (!form.documentId || !form.name || !form.email || !form.password) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Todos los campos son obligatorios.',
        autoClose: 4000
      });
      return;
    }
    // Validación de contraseña segura (minúscula, mayúscula, número y símbolo)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'La contraseña debe tener al menos 8 caracteres, una minúscula, una mayúscula, un número y un símbolo.',
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
      body: JSON.stringify({ ...form, roles: form.roles.map(r => Number(r)) })
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
          setForm({ name: '', email: '', password: '', roles: [] });
          // Si el backend devuelve el usuario como data.user, refresca la lista correctamente
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

  // Editar usuario (abrir modal)
  function handleEdit(user) {
    setEditUser(user);
    setForm({
      documentId: user.documentId || '',
      name: user.name,
      email: user.email,
      password: '',
      roles: user.Roles ? user.Roles.map(r => r.id.toString()) : []
    });
    setEditModal(true);
  }

  // Guardar edición
  function handleUpdate() {
        // Validación de formato de documento (solo números, 6-12 dígitos)
        const docRegex = /^\d{6,12}$/;
        if (!docRegex.test(form.documentId)) {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: 'El documento debe ser solo números y tener entre 6 y 12 dígitos.',
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
    fetch(`http://localhost:3000/api/users/${editUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, roles: form.roles.map(r => Number(r)) })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          notifications.show({ color: 'red', title: 'Error', message: data.error || 'Error al actualizar usuario.' });
        } else {
          notifications.show({ color: 'green', title: 'Éxito', message: data.message || 'Usuario actualizado.' });
          setEditModal(false);
          setEditUser(null);
          setForm({ name: '', email: '', password: '', roles: [] });
          fetchUsers();
        }
      })
      .catch(() => notifications.show({ color: 'red', title: 'Error', message: 'Error de red.' }));
  }

  // Log de depuración para ver la estructura de los usuarios antes de renderizar
  console.log('Renderizando tabla de usuarios. users:', users.map(u => ({ id: u.id, name: u.name, Roles: u.Roles })));
  return (
    <Box maw={900} mx="auto" px={{ base: 16, sm: 32, md: 48 }} mt="xl" role="main" aria-label="Gestión de usuarios">
      <Card shadow="md" padding="lg" radius="md" withBorder mb="lg">
        <Title order={3} mb="md" id="gestion-usuarios-title">Gestión de Usuarios</Title>
        <Group mb="md" grow>
          <TextInput
            label="Documento"
            name="documentId"
            value={form.documentId}
            onChange={handleChange}
            placeholder="Número de documento"
            aria-label="Documento"
            aria-required="true"
            id="documentId-input"
            w={{ base: '100%', sm: 150, md: 180 }}
          />
          <TextInput
            label="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nombre"
            aria-label="Nombre"
            aria-required="true"
            id="name-input"
            w={{ base: '100%', sm: 150, md: 180 }}
          />
          <TextInput
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            aria-label="Email"
            aria-required="true"
            id="email-input"
            w={{ base: '100%', sm: 180, md: 220 }}
          />
          <TextInput
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
            aria-label="Contraseña"
            aria-required="true"
            id="password-input"
            w={{ base: '100%', sm: 150, md: 180 }}
          />
          <MultiSelect
            label="Roles"
            data={roles.map(r => ({ value: r.id.toString(), label: r.name }))}
            value={form.roles}
            onChange={roles => setForm({ ...form, roles: roles.map(r => DOMPurify.sanitize(r)) })}
            placeholder="Selecciona roles"
            clearable
            aria-label="Roles"
            aria-required="true"
            id="roles-input"
            w={{ base: '100%', sm: 180, md: 220 }}
          />
          <Button color="blue" onClick={handleAdd} mt={{ base: 8, sm: 22 }} w={{ base: '100%', sm: 120 }}>
            Registrar
          </Button>
        </Group>
      </Card>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group mb="md">
                  <TextInput
                    label="Buscar por documento o nombre"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar..."
                    aria-label="Buscar usuario"
                    w={250}
                  />
                  <MultiSelect
                    label="Filtrar por rol"
                    data={roles.map(r => ({ value: r.name, label: r.name }))}
                    value={roleFilter ? [roleFilter] : []}
                    onChange={arr => setRoleFilter(arr[0] || '')}
                    placeholder="Rol"
                    clearable
                    w={200}
                  />
                </Group>
        <Title order={4} mb="md" id="lista-usuarios-title">Lista de Usuarios</Title>
        {loadingUsers ? (
          <Group position="center" py="xl">
            <Loader size="lg" color="blue" />
          </Group>
        ) : (
          <Table highlightOnHover withColumnBorders striped>
            <thead>
                  <tr>
                    <th scope="col" style={{ minWidth: 40 }}>ID</th>
                    <th scope="col" style={{ minWidth: 100 }}>Documento</th>
                    <th scope="col" style={{ minWidth: 120 }}>Nombre</th>
                    <th scope="col" style={{ minWidth: 160 }}>Email</th>
                    <th scope="col" style={{ minWidth: 120 }}>Roles</th>
                    <th scope="col" style={{ minWidth: 120 }}>Acciones</th>
                  </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <Text color="dimmed" align="center">No hay usuarios registrados.</Text>
                  </td>
                </tr>
              ) : (
                users
                  .filter(user => {
                    const term = search.toLowerCase();
                    const matchesDoc = user.documentId && user.documentId.toLowerCase().includes(term);
                    const matchesName = user.name && user.name.toLowerCase().includes(term);
                    const matchesRole = roleFilter ? (user.Roles && user.Roles.some(r => r.name === roleFilter)) : true;
                    return (matchesDoc || matchesName) && matchesRole;
                  })
                  .map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.documentId}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{Array.isArray(user.Roles) && user.Roles.length > 0 ? user.Roles.map(r => r.name).join(', ') : <Text color="dimmed">Sin roles</Text>}</td>
                      <td>
                        <Tooltip label="Editar usuario" withArrow position="top">
                          <Button color="yellow" size="xs" onClick={() => handleEdit(user)} mr={8} aria-label="Editar usuario">
                            Editar
                          </Button>
                        </Tooltip>
                        <Tooltip label="Eliminar usuario" withArrow position="top">
                          <Button color="red" size="xs" onClick={() => handleDelete(user.id)} aria-label="Eliminar usuario">
                            Eliminar
                          </Button>
                        </Tooltip>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </Table>
        )}
            <Modal opened={editModal} onClose={() => setEditModal(false)} title="Editar Usuario" centered>
              <Stack>
                <TextInput
                  label="Documento"
                  name="documentId"
                  value={form.documentId}
                  onChange={handleChange}
                  placeholder="Número de documento"
                />
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
                  label="Contraseña (dejar vacío para no cambiar)"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                />
                <MultiSelect
                  label="Roles"
                  data={roles.map(r => ({ value: r.id.toString(), label: r.name }))}
                  value={form.roles}
                  onChange={roles => setForm({ ...form, roles })}
                  placeholder="Selecciona roles"
                  clearable
                />
                <Group position="right">
                  <Button color="blue" onClick={handleUpdate}>Guardar</Button>
                  <Button variant="outline" onClick={() => setEditModal(false)}>Cancelar</Button>
                </Group>
              </Stack>
            </Modal>
      </Card>
    </Box>
  );
}
