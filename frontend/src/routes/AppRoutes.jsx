import { Routes, Route, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Card, Title, Text, Button, Stack, Group } from '@mantine/core';
import MantineLayout from '../layouts/MantineLayout';
import DashboardView from '../views/DashboardView';
import UsersView from '../views/UsersView';
import RolesView from '../views/RolesView';
import PermissionsView from '../views/PermissionsView';
import AuditView from '../views/AuditView';
import LoginView from '../views/LoginView';

const viewToPath = {
  dashboard: '/dashboard',
  users: '/users',
  roles: '/roles',
  permissions: '/permissions',
  audit: '/audit'
};

const pathToView = (pathname) => {
  if (pathname.startsWith('/users')) return 'users';
  if (pathname.startsWith('/roles')) return 'roles';
  if (pathname.startsWith('/permissions')) return 'permissions';
  if (pathname.startsWith('/audit')) return 'audit';
  return 'dashboard';
};

function RequireAuth({ isAuthed }) {
  const location = useLocation();
  if (!isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}

function Lobby({ onContinue, onLogout }) {
  return (
    <Card shadow="md" padding="lg" radius="md" withBorder maw={420} mx="auto" mt="xl">
      <Stack>
        <Title order={3}>Bienvenido</Title>
        <Text c="dimmed" size="sm">Tu sesión está activa. Puedes continuar o cerrar sesión.</Text>
        <Group justify="flex-end" wrap="wrap">
          <Button variant="default" onClick={onLogout}>Cerrar sesión</Button>
          <Button color="blue" onClick={onContinue}>Continuar</Button>
        </Group>
      </Stack>
    </Card>
  );
}

function AuthenticatedLayout({ currentUser, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const view = pathToView(location.pathname);
  const setView = (nextView) => {
    const nextPath = viewToPath[nextView] || '/dashboard';
    navigate(nextPath);
  };

  return (
    <MantineLayout view={view} setView={setView} user={currentUser} onLogout={onLogout}>
      <Outlet />
    </MantineLayout>
  );
}

export default function AppRoutes({ isAuthed, currentUser, onLogin, onLogout }) {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthed
            ? <Lobby onContinue={() => navigate('/dashboard')} onLogout={onLogout} />
            : <LoginView onLogin={onLogin} />
        }
      />
      <Route element={<RequireAuth isAuthed={isAuthed} />}>
        <Route element={<AuthenticatedLayout currentUser={currentUser} onLogout={onLogout} />}>
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/roles" element={<RolesView />} />
          <Route path="/permissions" element={<PermissionsView />} />
          <Route path="/audit" element={<AuditView />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}
