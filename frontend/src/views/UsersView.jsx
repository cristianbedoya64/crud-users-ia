import { useEffect, useState } from 'react';
import { Card, Table, Button, TextInput, Group, Title, Box, Text, MultiSelect, Modal, Stack } from '@mantine/core';
import { Loader, Tooltip } from '@mantine/core';
import DOMPurify from 'dompurify';
import { notifications } from '@mantine/notifications';
import { API_BASE } from '../apiConfig';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

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

  const fetchRoles = () => {
    setLoadingRoles(true);
    fetch(`${API_BASE}/api/roles`)
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.error(err))
      .finally(() => setLoadingRoles(false));
  };

  const fetchUsers = () => {
    setLoadingUsers(true);
    fetch(`${API_BASE}/api/users`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: DOMPurify.sanitize(e.target.value) });
  }

  function validateEmail(email) {
    return emailRegex.test(email);
  }

  function handleAdd() {
    if (!form.documentId || !form.name || !form.email || !form.password) {
      notifications.show({ color: 'red', title: 'Error', message: 'Todos los campos son obligatorios.' });
      return;
    }
    if (!passwordRegex.test(form.password)) {
      notifications.show({ color: 'red', title: 'Error', message: 'La contraseña debe ser robusta (8+ chars, mayus, minus, número y símbolo).' });
      return;
    }
    if (!validateEmail(form.email)) {
      notifications.show({ color: 'red', title: 'Error', message: 'Email inválido.' });
      return;
    }
    fetch(`${API_BASE}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, roles: form.roles.map(r => Number(r)) })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al crear usuario');
        notifications.show({ color: 'green', title: 'Éxito', message: data.message || 'Usuario creado.' });
        setForm({ documentId: '', name: '', email: '', password: '', roles: [] });
        fetchUsers();
      })
      .catch(err => notifications.show({ color: 'red', title: 'Error', message: err.message || 'Error de red' }));
  }

  function handleDelete(id) {
    fetch(`${API_BASE}/api/users/${id}`, { method: 'DELETE' })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al eliminar usuario');
        notifications.show({ color: 'green', title: 'Éxito', message: 'Usuario eliminado.' });
        fetchUsers();
      })
      .catch(err => notifications.show({ color: 'red', title: 'Error', message: err.message || 'Error de red' }));
  }

  function handleRestore(id) {
    fetch(`${API_BASE}/api/users/${id}/restore`, { method: 'POST' })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al restaurar usuario');
        notifications.show({ color: 'green', title: 'Éxito', message: 'Usuario restaurado.' });
        fetchUsers();
      })
      .catch(err => notifications.show({ color: 'red', title: 'Error', message: err.message || 'Error de red' }));
  }

  function handleEdit(user) {
    setEditUser(user);
    setForm({
      documentId: user.documentId || '',
      name: user.name || '',
      email: user.email || '',
      password: '',
      roles: user.Roles ? user.Roles.map(r => r.id.toString()) : []
    });
    setEditModal(true);
  }

  function handleUpdate() {
    if (!form.documentId || !form.name || !form.email) {
      notifications.show({ color: 'red', title: 'Error', message: 'Documento, nombre y email son obligatorios.' });
      return;
    }
    if (!validateEmail(form.email)) {
      notifications.show({ color: 'red', title: 'Error', message: 'Email inválido.' });
      return;
    }
    fetch(`${API_BASE}/api/users/${editUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, roles: form.roles.map(r => Number(r)) })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Error al actualizar usuario');
        notifications.show({ color: 'green', title: 'Éxito', message: data.message || 'Usuario actualizado.' });
        setEditModal(false);
        setEditUser(null);
        setForm({ documentId: '', name: '', email: '', password: '', roles: [] });
        fetchUsers();
      })
      .catch(err => notifications.show({ color: 'red', title: 'Error', message: err.message || 'Error de red' }));
  }

  const filteredUsers = users.filter(user => {
    const term = search.toLowerCase();
    const matchesDoc = user.documentId?.toLowerCase().includes(term);
    const matchesName = user.name?.toLowerCase().includes(term);
    const matchesRole = roleFilter ? user.Roles?.some(r => r.name === roleFilter) : true;
    return (matchesDoc || matchesName) && matchesRole;
  });

  return (
    <Box maw={900} mx="auto" px={{ base: 16, sm: 32, md: 48 }} mt="xl" role="main" aria-label="Gestión de usuarios">
      <Card shadow="md" padding="lg" radius="md" withBorder mb="lg">
        <Title order={3} mb="md">Gestión de Usuarios</Title>
        <Group mb="md" grow>
          <TextInput label="Documento" name="documentId" value={form.documentId} onChange={handleChange} placeholder="Número de documento" aria-label="Documento" w={{ base: '100%', sm: 150, md: 180 }} />
          <TextInput label="Nombre" name="name" value={form.name} onChange={handleChange} placeholder="Nombre" aria-label="Nombre" w={{ base: '100%', sm: 150, md: 180 }} />
          <TextInput label="Email" name="email" value={form.email} onChange={handleChange} placeholder="Email" aria-label="Email" w={{ base: '100%', sm: 180, md: 220 }} />
          <TextInput label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Contraseña" aria-label="Contraseña" w={{ base: '100%', sm: 150, md: 180 }} />
          <MultiSelect label="Roles" data={roles.map(r => ({ value: r.id.toString(), label: r.name }))} value={form.roles} onChange={roles => setForm({ ...form, roles: roles.map(r => DOMPurify.sanitize(r)) })} placeholder="Selecciona roles" clearable aria-label="Roles" w={{ base: '100%', sm: 180, md: 220 }} />
          <Button color="blue" onClick={handleAdd} mt={{ base: 8, sm: 22 }} w={{ base: '100%', sm: 120 }}>Registrar</Button>
        </Group>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group mb="md">
          <TextInput label="Buscar por documento o nombre" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." aria-label="Buscar usuario" w={250} />
          <MultiSelect label="Filtrar por rol" data={roles.map(r => ({ value: r.name, label: r.name }))} value={roleFilter ? [roleFilter] : []} onChange={arr => setRoleFilter(arr[0] || '')} placeholder="Rol" clearable w={200} />
        </Group>
        <Title order={4} mb="md">Lista de Usuarios</Title>
        {loadingUsers ? (
          <Group position="center" py="xl"><Loader size="lg" color="blue" /></Group>
        ) : (
          <Table highlightOnHover withColumnBorders striped>
            <thead>
              <tr>
                <th style={{ minWidth: 40 }}>ID</th>
                <th style={{ minWidth: 100 }}>Documento</th>
                <th style={{ minWidth: 120 }}>Nombre</th>
                <th style={{ minWidth: 160 }}>Email</th>
                <th style={{ minWidth: 120 }}>Roles</th>
                <th style={{ minWidth: 140 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr><td colSpan={6}><Text color="dimmed" align="center">No hay usuarios registrados.</Text></td></tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.documentId}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{Array.isArray(user.Roles) && user.Roles.length > 0 ? user.Roles.map(r => r.name).join(', ') : <Text color="dimmed">Sin roles</Text>}</td>
                    <td>
                      <Group gap={8}>
                        <Tooltip label="Editar usuario" withArrow position="top">
                          <Button color="yellow" size="xs" onClick={() => handleEdit(user)}>Editar</Button>
                        </Tooltip>
                        <Tooltip label="Eliminar usuario" withArrow position="top">
                          <Button color="red" size="xs" onClick={() => handleDelete(user.id)}>Eliminar</Button>
                        </Tooltip>
                        <Tooltip label="Restaurar usuario" withArrow position="top">
                          <Button color="green" size="xs" variant="outline" onClick={() => handleRestore(user.id)}>Restaurar</Button>
                        </Tooltip>
                      </Group>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}

        <Modal opened={editModal} onClose={() => setEditModal(false)} title="Editar Usuario" centered>
          <Stack>
            <TextInput label="Documento" name="documentId" value={form.documentId} onChange={handleChange} placeholder="Número de documento" />
            <TextInput label="Nombre" name="name" value={form.name} onChange={handleChange} placeholder="Nombre" />
            <TextInput label="Email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
            <TextInput label="Contraseña (dejar vacío para no cambiar)" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Contraseña" />
            <MultiSelect label="Roles" data={roles.map(r => ({ value: r.id.toString(), label: r.name }))} value={form.roles} onChange={roles => setForm({ ...form, roles })} placeholder="Selecciona roles" clearable />
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
