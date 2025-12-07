
import { useEffect, useState } from 'react';
import { Card, Title, Text, Loader, Group } from '@mantine/core';
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

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch users
        const usersRes = await fetch('http://localhost:3000/api/users');
        const users = await usersRes.json();
        // Fetch roles
        const rolesRes = await fetch('http://localhost:3000/api/roles');
        const roles = await rolesRes.json();
        // Fetch permissions
        const permsRes = await fetch('http://localhost:3000/api/permissions');
        const perms = await permsRes.json();
        // Fetch logs (dummy)
        let logs = [];
        try {
          const logsRes = await fetch('http://localhost:3000/api/audit');
          logs = await logsRes.json();
        } catch {
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
          const alertsRes = await fetch('http://localhost:3000/api/security-alerts');
          const alerts = await alertsRes.json();
          setSecurityAlerts(alerts);
        } catch {
          setSecurityAlerts([]);
        }

        // Historial de cambios (real, si hay endpoint)
        try {
          const changesRes = await fetch('http://localhost:3000/api/change-history');
          const changes = await changesRes.json();
          setChangeHistory(changes);
        } catch {
          setChangeHistory([]);
        }

        // Estado del sistema (real, si hay endpoint)
        try {
          const statusRes = await fetch('http://localhost:3000/api/system-status');
          const status = await statusRes.json();
          setSystemStatus(status);
        } catch {
          setSystemStatus({ api: 'online', ia: 'online', cloud: 'online' });
        }

        // Tendencia de usuarios (real, si hay endpoint)
        try {
          const growthRes = await fetch('http://localhost:3000/api/user-growth');
          const growth = await growthRes.json();
          setUserGrowth(growth);
        } catch {
          setUserGrowth([]);
        }

        // Accesos por módulo (real, si hay endpoint)
        try {
          const moduleRes = await fetch('http://localhost:3000/api/module-access');
          const moduleAccess = await moduleRes.json();
          setModuleAccess(moduleAccess);
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
          const iaRes = await fetch('http://localhost:3000/api/ia-panel', {
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
        // fallback
        setTotals({ users: 0, roles: 0, permissions: 0, logs: 0 });
        setUsersByRole([]);
        setRecentLogs([]);
        setTopPerms([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <Group justify="center" align="center" h={400}><Loader size="xl" /></Group>;
  }

  return (
    <div style={{ marginLeft: 240, transition: 'margin 0.3s' }}>
      <Card shadow="md" padding="xl" radius="lg" withBorder>
        <Title order={3} mb="md">Dashboard</Title>
        <Text color="dimmed" mb="xl">Bienvenido al dashboard principal. Aquí puedes ver el resumen y métricas del sistema.</Text>
        <DashboardSummary totals={totals} />
        <UserStatusSummary {...userStatus} />
        <Group align="flex-start" grow mb="xl">
          <UsersByRoleChart data={usersByRole} />
          <UserGrowthChart data={userGrowth} />
          <ModuleAccessChart data={moduleAccess} />
        </Group>
        <Group align="flex-start" grow mb="xl">
          <LastLogins logins={lastLogins} />
          <SecurityAlerts alerts={securityAlerts} />
          <ChangeHistory changes={changeHistory} />
        </Group>
        <SystemStatus status={systemStatus} />
        <RecentActivity logs={recentLogs} />
        <TopPermissions permissions={topPerms} />
        <AIPanel {...aiData} />
      </Card>
    </div>
  );
}
