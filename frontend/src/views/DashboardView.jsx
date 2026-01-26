
import { useEffect, useState } from 'react';
// import AssignPermissionsForm from '../components/AssignPermissionsForm';
import { Card, Title, Text, Loader, Box, Stack, SimpleGrid } from '@mantine/core';
import DashboardSummary from '../components/DashboardSummary';
import UserStatusSummary from '../components/UserStatusSummary';
import UsersByRoleChart from '../components/UsersByRoleChart';
import UserGrowthChart from '../components/UserGrowthChart';
import ModuleAccessChart from '../components/ModuleAccessChart';
import LastLogins from '../components/LastLogins';
import SecurityAlerts from '../components/SecurityAlerts';
import ChangeHistory from '../components/ChangeHistory';
import SystemStatus from '../components/SystemStatus';
import RecentActivity from '../components/RecentActivity';
import TopPermissions from '../components/TopPermissions';
import AIPanel from '../components/AIPanel';
import { API_BASE } from '../apiConfig';
import { authFetch } from '../apiClient';

export default function DashboardView() {
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ users: 0, roles: 0, permissions: 0, logs: 0 });
  const [usersByRole, setUsersByRole] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [topPerms, setTopPerms] = useState([]);
  // Paneles simulados
  const [userStatus, setUserStatus] = useState({ active: 0, inactive: 0, pending: 0 });
  const [lastLogins, setLastLogins] = useState([]);
  const [securityAlerts, setSecurityAlerts] = useState([]);
  const [changeHistory, setChangeHistory] = useState([]);
  const [systemStatus, setSystemStatus] = useState({ api: 'online', ia: 'online', cloud: 'online' });
  const [userGrowth, setUserGrowth] = useState([]);
  const [moduleAccess, setModuleAccess] = useState([]);
  const [aiData, setAIData] = useState({
    suggestions: '',
    anomalies: '',
    predictions: ''
  });
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const toArray = (val) => Array.isArray(val) ? val : [];
        // Fetch users
        const usersRes = await authFetch(`${API_BASE}/api/users`);
        const usersData = await usersRes.json();
        const users = Array.isArray(usersData) ? usersData : toArray(usersData.users);
        // Fetch roles
        const rolesRes = await authFetch(`${API_BASE}/api/roles`);
        const roles = toArray(await rolesRes.json());
        // Fetch permissions
        const permsRes = await authFetch(`${API_BASE}/api/permissions`);
        const perms = toArray(await permsRes.json());
        // Fetch logs (tolerante: si falla o no es array, usa dummy)
        let logs = [];
        try {
          const logsRes = await authFetch(`${API_BASE}/api/audit`);
          const maybeLogs = await logsRes.json();
          logs = toArray(maybeLogs);
        } catch (err) {
          logs = [
            { action: 'login', details: 'Usuario admin inició sesión', createdAt: new Date() },
            { action: 'create_user', details: 'Se creó usuario Juan', createdAt: new Date() },
            { action: 'delete_role', details: 'Rol auditor eliminado', createdAt: new Date() }
          ];
        }

        // Totales
        setTotals({
          users: users.length,
          roles: roles.length,
          permissions: perms.length,
          logs: logs.length
        });

        // Estado de usuarios (real, si hay campos)
        let active = 0, inactive = 0, pending = 0;
        users.forEach(u => {
          if (u.status === 'active') active++;
          else if (u.status === 'inactive') inactive++;
          else pending++;
        });
        setUserStatus({ active, inactive, pending });

        // Últimos accesos (real, si hay campo lastLogin)
        setLastLogins(
          users
            .filter(u => u.lastLogin)
            .sort((a, b) => new Date(b.lastLogin) - new Date(a.lastLogin))
            .slice(0, 5)
            .map(u => ({ user: u.name, date: u.lastLogin }))
        );

        // Alertas de seguridad (real, si hay endpoint)
        try {
          const alertsRes = await authFetch(`${API_BASE}/api/security-alerts`);
          const alerts = toArray(await alertsRes.json());
          setSecurityAlerts(alerts);
        } catch {
          setSecurityAlerts([]);
        }

        // Historial de cambios (real, si hay endpoint)
        try {
          const changesRes = await authFetch(`${API_BASE}/api/change-history`);
          const changes = toArray(await changesRes.json());
          setChangeHistory(changes);
        } catch {
          setChangeHistory([]);
        }

        // Estado del sistema (real, si hay endpoint)
        try {
          const statusRes = await authFetch(`${API_BASE}/api/system-status`);
          const status = await statusRes.json();
          setSystemStatus(status);
        } catch {
          setSystemStatus({ api: 'online', ia: 'online', cloud: 'online' });
        }

        // Tendencia de usuarios (real, si hay endpoint)
        try {
          const growthRes = await authFetch(`${API_BASE}/api/user-growth`);
          const growth = toArray(await growthRes.json());
          setUserGrowth(growth);
        } catch {
          setUserGrowth([]);
        }

        // Accesos por módulo (real, si hay endpoint)
        try {
          const moduleRes = await authFetch(`${API_BASE}/api/module-access`);
          const moduleData = toArray(await moduleRes.json());
          setModuleAccess(moduleData);
        } catch {
          setModuleAccess([]);
        }

        // Users by role (dummy grouping)
        const roleMap = {};
        roles.forEach(r => roleMap[r.name] = 0);
        users.forEach(u => {
          // Dummy: assign random role
          const role = roles[Math.floor(Math.random() * roles.length)];
          if (role) roleMap[role.name]++;
        });
        setUsersByRole(Object.entries(roleMap).map(([role, value]) => ({ role, value })));

        // Recent logs
        setRecentLogs(logs);

        // Top permissions (dummy)
        setTopPerms(perms.slice(0, 5).map(p => ({ name: p.name, count: Math.floor(Math.random() * 20) + 1 })));

        // Panel IA real
        try {
          const iaRes = await authFetch(`${API_BASE}/api/ia-panel`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
          });
          const iaPanel = await iaRes.json();
          setAIData(iaPanel);
        } catch {
          setAIData({
            suggestions: 'No disponible',
            anomalies: 'No disponible',
            predictions: 'No disponible'
          });
        }
      } catch (err) {
        setError('Error al cargar el panel. Intenta recargar la página.');
        setTotals({ users: 0, roles: 0, permissions: 0, logs: 0 });
        setUsersByRole([]);
        setRecentLogs([]);
        setTopPerms([]);
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box maw={600} mx="auto" py="xl" style={{ textAlign: 'center' }}>
        <Loader size="lg" />
        <Text mt="md">Cargando panel...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box maw={600} mx="auto" py="xl" style={{ textAlign: 'center' }}>
        <Text color="red" size="lg" fw={700}>
          {error}
        </Text>
        <Text mt="md" color="dimmed">Si el problema persiste, revisa la consola o contacta soporte.</Text>
      </Box>
    );
  }

  return (
    <Box maw={1000} mx="auto" px={{ base: 12, sm: 24, md: 32 }} py="xl" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Title order={2} mb="md" align="center">Panel de Control</Title>
      <Stack spacing="md">
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <DashboardSummary totals={totals || { users: 0, roles: 0, permissions: 0, logs: 0 }} />
          <UserStatusSummary
            active={(userStatus && userStatus.active) || 0}
            inactive={(userStatus && userStatus.inactive) || 0}
            pending={(userStatus && userStatus.pending) || 0}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <UsersByRoleChart data={usersByRole || []} />
          <UserGrowthChart data={userGrowth || []} />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <ModuleAccessChart data={moduleAccess || []} />
          <SystemStatus status={systemStatus || { api: 'online', ia: 'online', cloud: 'online' }} />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <RecentActivity logs={recentLogs || []} />
          <TopPermissions perms={topPerms || []} />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <LastLogins logins={lastLogins || []} />
          <SecurityAlerts alerts={securityAlerts || []} />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <ChangeHistory history={changeHistory || []} />
          <AIPanel data={aiData || { suggestions: '', anomalies: '', predictions: '' }} />
        </SimpleGrid>
          {/* El formulario de asignar permisos se movió a PermissionsView */}
      </Stack>
    </Box>
  );
}
