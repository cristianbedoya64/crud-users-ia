import { useEffect, useState } from 'react';
import { Card, Button, TextInput, Group, Title, Box, Text, MultiSelect, Modal, Stack, Badge, Switch, Accordion, SimpleGrid } from '@mantine/core';
import { Loader, Tooltip } from '@mantine/core';
import DOMPurify from 'dompurify';
import { notifications } from '@mantine/notifications';
import { API_BASE } from '../apiConfig';
import { authFetch } from '../apiClient';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function UsersView() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ documentId: '', name: '', email: '', password: '', roles: [] });
  const [editModal, setEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const resetCreateForm = () => {
    setForm({ documentId: '', name: '', email: '', password: '', roles: [] });
  };

  function showError(title, message) {
    notifications.show({
      color: 'red',
      title,
      message,
      withCloseButton: true,
      autoClose: 5000
    });
  }

  function showNetworkErrorIfNeeded(err, fallbackMessage) {
    // authFetch ya muestra notificación cuando hay respuesta HTTP !ok.
    if (err && typeof err.status === 'number') return;
    showError('Error de red', fallbackMessage || 'No se pudo conectar al servidor.');
  }

  const fetchRoles = () => {
    setLoadingRoles(true);
    authFetch(`${API_BASE}/api/roles`)
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => {
        console.error(err);
        showNetworkErrorIfNeeded(err, 'No se pudieron cargar los roles.');
      })
      .finally(() => setLoadingRoles(false));
  };

  const fetchUsers = (statusParam) => {
    setLoadingUsers(true);
    const status = statusParam || (showInactive ? 'inactive' : 'active');
    const query = `?status=${encodeURIComponent(status)}&limit=500`;
    authFetch(`${API_BASE}/api/users${query}`)
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
      .catch(err => {
        console.error(err);
        showNetworkErrorIfNeeded(err, 'No se pudieron cargar los usuarios.');
        setUsers([]);
      })
      .finally(() => setLoadingUsers(false));
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  useEffect(() => {
    setSearch('');
    setRoleFilter('');
    fetchUsers(showInactive ? 'inactive' : 'active');
  }, [showInactive]);

  const showSuccess = (title, message, hint) => {
    notifications.show({
      color: 'green',
      title,
      message: hint ? `${message} · Sugerencia: ${hint}` : message,
      withCloseButton: true
    });
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: DOMPurify.sanitize(e.target.value) });
  }

  function validateEmail(email) {
    return emailRegex.test(email);
  }

  function handleAdd() {
    const missing = [];
    if (!form.documentId) missing.push('Documento');
    if (!form.name) missing.push('Nombre');
    if (!form.email) missing.push('Email');
    if (!form.password) missing.push('Contraseña');
    if (missing.length > 0) {
      showError('Faltan datos', `Completa: ${missing.join(', ')}.`);
      return;
    }
    if (!passwordRegex.test(form.password)) {
      showError('Contraseña inválida', 'Debe tener 8+ caracteres e incluir mayúscula, minúscula, número y símbolo.');
      return;
    }
    if (!validateEmail(form.email)) {
      showError('Email inválido', 'Verifica el formato (ej: usuario@dominio.com).');
      return;
    }

    if (creating) return;
    setCreating(true);
    authFetch(`${API_BASE}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, roles: form.roles.map(r => Number(r)) })
    })
      .then(res => res.json())
      .then(data => {
        showSuccess('Usuario creado', data?.message || 'Usuario creado.', 'Revisa que tenga los roles correctos y configura MFA si aplica.');
        resetCreateForm();
        fetchUsers(showInactive ? 'inactive' : 'active');
      })
      .catch(err => {
        console.error(err);
        showNetworkErrorIfNeeded(err);
      })
      .finally(() => setCreating(false));
  }

  function handleDelete(user) {
    setUserToDelete(user);
    setDeleteModalOpen(true);
  }

  function confirmDelete() {
    if (!userToDelete) return;
    authFetch(`${API_BASE}/api/users/${userToDelete.id}`, { method: 'DELETE' })
      .then(() => {
        showSuccess('Usuario eliminado', 'Usuario eliminado.', 'Recuerda desactivar accesos SSO y tokens de API si existían.');
        fetchUsers(showInactive ? 'inactive' : 'active');
        setDeleteModalOpen(false);
        setUserToDelete(null);
      })
      .catch(err => {
        console.error(err);
        showNetworkErrorIfNeeded(err);
      });
  }

  function handleRestore(id) {
    authFetch(`${API_BASE}/api/users/${id}/restore`, { method: 'POST' })
      .then(() => {
        showSuccess('Usuario restaurado', 'Usuario restaurado.', 'Valida que su rol siga vigente y solicita cambio de contraseña.');
        fetchUsers(showInactive ? 'inactive' : 'active');
      })
      .catch(err => {
        console.error(err);
        showNetworkErrorIfNeeded(err);
      });
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
    const missing = [];
    if (!form.documentId) missing.push('Documento');
    if (!form.name) missing.push('Nombre');
    if (!form.email) missing.push('Email');
    if (missing.length > 0) {
      showError('Faltan datos', `Completa: ${missing.join(', ')}.`);
      return;
    }
    if (!validateEmail(form.email)) {
      showError('Email inválido', 'Verifica el formato (ej: usuario@dominio.com).');
      return;
    }
    authFetch(`${API_BASE}/api/users/${editUser.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, roles: form.roles.map(r => Number(r)) })
    })
      .then(res => res.json())
      .then(data => {
        showSuccess('Usuario actualizado', data?.message || 'Usuario actualizado.', 'Comunica al usuario el cambio y registra auditoría de permisos.');
        setEditModal(false);
        setEditUser(null);
        setForm({ documentId: '', name: '', email: '', password: '', roles: [] });
        fetchUsers(showInactive ? 'inactive' : 'active');
      })
      .catch(err => {
        console.error(err);
        showNetworkErrorIfNeeded(err);
      });
  }

  const filteredUsers = users.filter(user => {
    const term = search.toLowerCase().trim();
    const statusValue = (user.status || '').toLowerCase();
    const isInactive = statusValue === 'inactive';
    const matchesDoc = user.documentId?.toLowerCase().includes(term);
    const matchesName = user.name?.toLowerCase().includes(term);
    const matchesEmail = user.email?.toLowerCase().includes(term);
    const matchesRole = roleFilter ? user.Roles?.some(r => r.name === roleFilter) : true;
    const matchesStatus = showInactive ? isInactive : !isInactive;
    // Ocultar admin demo por email o id
    const isProtected = (user.email?.trim().toLowerCase() === 'admin@demo.com' || user.id === 173);
    return !isProtected && (matchesDoc || matchesName || matchesEmail || term === '') && matchesRole && matchesStatus;
  });

  const currentTitle = showInactive ? 'Usuarios inactivos' : 'Usuarios activos';
  const currentCount = filteredUsers.length;
  const sectionColor = showInactive ? 'red' : 'green';

  return (
    <Box maw={900} mx="auto" px={{ base: 16, sm: 32, md: 48 }} mt="xl" role="main" aria-label="Gestión de usuarios">
      <Card shadow="md" padding="lg" radius="md" withBorder mb="lg">
        <Title order={3} mb="md">Gestión de Usuarios</Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm" mb="sm">
          <TextInput label="Documento" name="documentId" value={form.documentId} onChange={handleChange} placeholder="Número de documento" aria-label="Documento" w="100%" />
          <TextInput label="Nombre" name="name" value={form.name} onChange={handleChange} placeholder="Nombre" aria-label="Nombre" w="100%" />
          <TextInput label="Email" name="email" value={form.email} onChange={handleChange} placeholder="Email" aria-label="Email" w="100%" />
          <TextInput label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Contraseña" aria-label="Contraseña" w="100%" />
          <MultiSelect label="Roles" data={roles.map(r => ({ value: r.id.toString(), label: r.name }))} value={form.roles} onChange={roles => setForm({ ...form, roles: roles.map(r => DOMPurify.sanitize(r)) })} placeholder="Selecciona roles" clearable aria-label="Roles" w="100%" />
        </SimpleGrid>
        <Group justify="flex-end" wrap="wrap">
          <Button color="blue" onClick={handleAdd} loading={creating} disabled={editModal} mt={{ base: 8, sm: 0 }} w={{ base: '100%', sm: 120 }} type="button">Registrar</Button>
          <Button variant="default" onClick={resetCreateForm} disabled={creating || editModal} mt={{ base: 8, sm: 0 }} w={{ base: '100%', sm: 120 }} type="button">Limpiar</Button>
        </Group>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="sm" mb="md">
          <TextInput label="Buscar por documento o nombre" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." aria-label="Buscar usuario" w="100%" />
          <MultiSelect label="Filtrar por rol" data={roles.map(r => ({ value: r.name, label: r.name }))} value={roleFilter ? [roleFilter] : []} onChange={arr => setRoleFilter(arr[0] || '')} placeholder="Rol" clearable w="100%" />
          <Box pt={{ base: 0, sm: 24 }}>
            <Switch label="Mostrar inactivos" checked={showInactive} onChange={e => setShowInactive(e.currentTarget.checked)} aria-label="Mostrar usuarios inactivos" />
          </Box>
        </SimpleGrid>
        <Title order={4} mb="md">Lista de Usuarios</Title>
        {loadingUsers ? (
          <Group position="center" py="xl"><Loader size="lg" color="blue" /></Group>
        ) : (
          <Accordion defaultValue="usuarios" chevronPosition="left" variant="contained" radius="md">
            <Accordion.Item value="usuarios">
              <Accordion.Control>
                <Group gap="xs">
                  <Text fw={600}>{currentTitle}</Text>
                  <Badge color={sectionColor} variant="filled">{currentCount}</Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                {filteredUsers.length === 0 ? (
                  <Text color="dimmed" align="center" py="md">No hay usuarios registrados.</Text>
                ) : (
                  <Stack gap="sm">
                    {filteredUsers.map(user => {
                      const isInactive = (user.status || '').toLowerCase() === 'inactive';
                      const rolesText = Array.isArray(user.Roles) && user.Roles.length > 0
                        ? user.Roles.map(r => r.name).join(', ')
                        : 'Sin roles';
                      return (
                        <Card key={user.id} withBorder radius="md" shadow="xs" p="md">
                          <Group position="apart" align="start" mb="xs">
                            <Group gap="sm" align="center">
                              <Badge variant="light" color="gray">ID {user.id}</Badge>
                              <Text fw={600}>{user.name}</Text>
                            </Group>
                            <Badge color={isInactive ? 'red' : 'green'} variant="light">
                              {isInactive ? 'inactivo' : 'activo'}
                            </Badge>
                          </Group>
                          <Group gap="lg" align="center" wrap="wrap">
                            <Text size="sm"><Text span fw={600}>Documento:</Text> {user.documentId || '—'}</Text>
                            <Text size="sm"><Text span fw={600}>Email:</Text> {user.email}</Text>
                            <Text size="sm"><Text span fw={600}>Roles:</Text> {rolesText}</Text>
                          </Group>
                          <Group gap={8} mt="md">
                            {isInactive ? (
                              <Tooltip label="Restaurar usuario" withArrow position="top">
                                <Button color="green" size="xs" variant="outline" onClick={() => handleRestore(user.id)}>Restaurar</Button>
                              </Tooltip>
                            ) : (
                              <>
                                <Tooltip label="Editar usuario" withArrow position="top">
                                  <Button color="yellow" size="xs" onClick={() => handleEdit(user)}>Editar</Button>
                                </Tooltip>
                                <Tooltip label="Eliminar usuario" withArrow position="top">
                                  <Button color="red" size="xs" onClick={() => handleDelete(user)}>Eliminar</Button>
                                </Tooltip>
                              </>
                            )}
                          </Group>
                        </Card>
                      );
                    })}
                  </Stack>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
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

        <Modal opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Confirmar eliminación" centered>
          <Stack>
            <Text>¿Seguro que deseas desactivar al usuario <Text span fw={600}>{userToDelete?.name}</Text>?</Text>
            <Text size="sm" color="dimmed">Esta acción es reversible desde la vista de inactivos.</Text>
            <Group justify="flex-end">
              <Button variant="default" onClick={() => setDeleteModalOpen(false)}>Cancelar</Button>
              <Button color="red" onClick={confirmDelete}>Eliminar</Button>
            </Group>
          </Stack>
        </Modal>
      </Card>
    </Box>
  );
}
