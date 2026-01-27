
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
  // Paneles demo (datos de ejemplo)
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
        // Fetch logs (real)
        let logs = [];
        try {
          const logsRes = await authFetch(`${API_BASE}/api/audit`);
          const maybeLogs = await logsRes.json();
          logs = toArray(maybeLogs);
        } catch (err) {
          logs = [];
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

        // Alertas de seguridad (demo)
        try {
          const alertsRes = await authFetch(`${API_BASE}/api/demo/security-alerts`);
          const alerts = toArray(await alertsRes.json());
          setSecurityAlerts(alerts);
        } catch {
          setSecurityAlerts([]);
        }

        // Historial de cambios (demo)
        try {
          const changesRes = await authFetch(`${API_BASE}/api/demo/change-history`);
          const changes = toArray(await changesRes.json());
          setChangeHistory(changes);
        } catch {
          setChangeHistory([]);
        }

        // Estado del sistema (demo)
        try {
          const statusRes = await authFetch(`${API_BASE}/api/demo/system-status`);
          const status = await statusRes.json();
          setSystemStatus(status);
        } catch {
          setSystemStatus({ api: 'online', ia: 'online', cloud: 'online' });
        }

        // Tendencia de usuarios (demo)
        try {
          const growthRes = await authFetch(`${API_BASE}/api/demo/user-growth`);
          const growth = toArray(await growthRes.json());
          setUserGrowth(growth);
        } catch {
          setUserGrowth([]);
        }

        // Accesos por módulo (demo)
        try {
          const moduleRes = await authFetch(`${API_BASE}/api/demo/module-access`);
          const moduleData = toArray(await moduleRes.json());
          setModuleAccess(moduleData);
        } catch {
          setModuleAccess([]);
        }

        // Users by role (real)
        const roleMap = {};
        roles.forEach(r => { roleMap[r.name] = 0; });
        let noRoleCount = 0;
        users.forEach(u => {
          const userRoles = u.Roles || u.roles || [];
          if (!Array.isArray(userRoles) || userRoles.length === 0) {
            noRoleCount += 1;
            return;
          }
          userRoles.forEach(r => {
            const roleName = r?.name || r;
            if (!roleName) return;
            if (!(roleName in roleMap)) roleMap[roleName] = 0;
            roleMap[roleName] += 1;
          });
        });
        if (noRoleCount > 0) {
          roleMap['Sin rol'] = noRoleCount;
        }
        setUsersByRole(Object.entries(roleMap).map(([role, value]) => ({ role, value })));

        // Recent logs
        setRecentLogs(logs);

        // Top permissions (real)
        try {
          const topPermsRes = await authFetch(`${API_BASE}/api/dashboard/top-permissions`);
          const topPermsData = toArray(await topPermsRes.json());
          setTopPerms(topPermsData);
        } catch {
          setTopPerms(perms.map(p => ({ name: p.name, count: 0 })));
        }

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
          <UserGrowthChart data={userGrowth || []} isDemo />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <ModuleAccessChart data={moduleAccess || []} isDemo />
          <SystemStatus status={systemStatus || { api: 'online', ia: 'online', cloud: 'online' }} isDemo />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <RecentActivity logs={recentLogs || []} />
          <TopPermissions permissions={topPerms || []} />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <LastLogins logins={lastLogins || []} />
          <SecurityAlerts alerts={securityAlerts || []} isDemo />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <ChangeHistory changes={changeHistory || []} isDemo />
          <AIPanel data={aiData || { suggestions: '', anomalies: '', predictions: '' }} />
        </SimpleGrid>
          {/* El formulario de asignar permisos se movió a PermissionsView */}
      </Stack>
    </Box>
  );
}
