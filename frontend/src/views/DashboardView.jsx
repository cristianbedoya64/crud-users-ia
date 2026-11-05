import { lazy, useEffect, useRef, useState } from 'react';
import { Title, Text, Loader, Box, Stack, SimpleGrid, Group, Button } from '@mantine/core';
import DashboardSummary from '../components/DashboardSummary';
import UserStatusSummary from '../components/UserStatusSummary';
import UsersByRoleChart from '../components/UsersByRoleChart';
import UserGrowthChart from '../components/UserGrowthChart';
import ModuleAccessChart from '../components/ModuleAccessChart';
import Chart3DWrapper from '../components/Chart3DWrapper';
import LastLogins from '../components/LastLogins';
import SecurityAlerts from '../components/SecurityAlerts';
import ChangeHistory from '../components/ChangeHistory';
import SystemStatus from '../components/SystemStatus';
import RecentActivity from '../components/RecentActivity';
import TopPermissions from '../components/TopPermissions';
import SecurityActivityChart from '../components/SecurityActivityChart';
import UserRegistrationChart from '../components/UserRegistrationChart';
import AIPanel from '../components/AIPanel';
import DashboardHero from '../components/DashboardHero';
import { API_BASE } from '../apiConfig';
import { authFetch } from '../apiClient';

const ModuleActivity3D = lazy(() => import('../components/ModuleActivity3D'));

const emptySummary = {
  users: { total: 0, active: 0, inactive: 0, recent: [] },
  roles: [],
  audit: { recent: [], byAction: [], failedAccess: 0 },
  moduleActivity: [],
  lastLogins: [],
  userActivity: [],
  activity: [],
  services: {}
};

const emptyAI = { suggestions: '', anomalies: '', predictions: '' };
const POLLING_INTERVAL_MS = 30_000;
const CHANGE_ACTIONS = new Set([
  'create_user',
  'update_user',
  'delete_user',
  'restore_user',
  'create_role',
  'update_role',
  'delete_role',
  'create_permission',
  'update_permission',
  'delete_permission',
  'assign_role',
  'remove_role',
  'assign_permission',
  'remove_permission'
]);

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

export default function DashboardView() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(emptySummary);
  const [topPermissions, setTopPermissions] = useState([]);
  const [permissionsError, setPermissionsError] = useState(null);
  const [aiData, setAIData] = useState(emptyAI);
  const [aiStatus, setAIStatus] = useState({ status: 'available', message: '', isDemo: false });
  const [error, setError] = useState(null);
  const [refreshError, setRefreshError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [nextRefreshIn, setNextRefreshIn] = useState(POLLING_INTERVAL_MS / 1000);
  const requestInFlight = useRef(false);
  const refreshDashboard = useRef(null);

  useEffect(() => {
    let active = true;

    async function fetchData(isInitial = false) {
      if (requestInFlight.current) return;
      requestInFlight.current = true;
      if (active) setNextRefreshIn(POLLING_INTERVAL_MS / 1000);
      if (isInitial) setLoading(true);
      else setRefreshing(true);

      try {
        const response = await authFetch(`${API_BASE}/api/dashboard/summary`);
        const data = await response.json();
        if (active) {
          setSummary({
            ...emptySummary,
            ...data,
            users: { ...emptySummary.users, ...(data?.users || {}) },
            audit: { ...emptySummary.audit, ...(data?.audit || {}) },
            moduleActivity: asArray(data?.moduleActivity),
            lastLogins: asArray(data?.lastLogins),
            userActivity: asArray(data?.userActivity),
            roles: asArray(data?.roles),
            activity: asArray(data?.activity)
          });
          setLastUpdated(new Date());
          setError(null);
          setRefreshError(null);
        }
      } catch (err) {
        if (active) {
          const message = err?.message || 'No se pudo cargar el resumen del panel.';
          if (isInitial) setError(message);
          else setRefreshError(message);
        }
      } finally {
        if (active) {
          setLoading(false);
          setRefreshing(false);
        }
      }

      try {
        const response = await authFetch(`${API_BASE}/api/dashboard/top-permissions?limit=5`);
        const data = await response.json();
        if (active) {
          setTopPermissions(asArray(data));
          setPermissionsError(null);
        }
      } catch (err) {
        if (active) {
          setTopPermissions([]);
          setPermissionsError(err?.message || 'No se pudieron cargar los permisos.');
        }
      }

      // La IA es opcional; authFetch centraliza el JWT y su renovación.
      try {
        const response = await authFetch(`${API_BASE}/api/ia-panel`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({})
        });
        const data = await response.json();
        if (active) {
          setAIData(data);
          setAIStatus({ status: 'available', message: '', isDemo: false });
        }
      } catch (err) {
        if (active) {
          const details = err?.data?.details || err?.data?.error || '';
          setAIStatus({
            status: 'unavailable',
            message: String(details).includes('ia_model')
              ? 'IA no disponible: modelo no cargado.'
              : 'IA no disponible temporalmente.',
            isDemo: false
          });
          setAIData(emptyAI);
        }
      }

      requestInFlight.current = false;
    }

    refreshDashboard.current = () => fetchData(false);
    fetchData(true);
    const intervalId = window.setInterval(() => fetchData(false), POLLING_INTERVAL_MS);
    const countdownId = window.setInterval(() => {
      setNextRefreshIn(seconds => seconds <= 1 ? POLLING_INTERVAL_MS / 1000 : seconds - 1);
    }, 1000);
    return () => {
      active = false;
      window.clearInterval(intervalId);
      window.clearInterval(countdownId);
      requestInFlight.current = false;
      refreshDashboard.current = null;
    };
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
        <Text color="red" size="lg" fw={700}>{error}</Text>
        <Text mt="md" color="dimmed">No se muestran datos parciales. Intenta recargar la página.</Text>
      </Box>
    );
  }

  const users = summary.users || emptySummary.users;
  const audit = summary.audit || emptySummary.audit;
  const recentAudit = asArray(audit.recent);
  const auditByAction = asArray(audit.byAction);
  const failedAudit = recentAudit.filter((entry) => entry.action === 'failed_access');
  const recentChanges = recentAudit.filter((entry) => CHANGE_ACTIONS.has(entry.action));
  const activity = asArray(summary.activity);
  const moduleActivity = asArray(summary.moduleActivity);
  const lastLogins = asArray(summary.lastLogins);
  const userActivity = asArray(summary.userActivity);
  const roles = asArray(summary.roles);
  const services = summary.services || {};
  const formattedLastUpdated = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : 'sin datos';

  return (
    <Box maw={1000} mx="auto" px={{ base: 12, sm: 24, md: 32 }} py="xl" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Group justify="space-between" align="center" mb="md">
        <Box>
          <Title order={2}>Panel de Control</Title>
          <Text size="sm" c="dimmed">
            Última actualización: {formattedLastUpdated} · Actualización automática en {nextRefreshIn}s
          </Text>
        </Box>
        <Button onClick={() => refreshDashboard.current?.()} loading={refreshing} variant="light">
          Actualizar
        </Button>
      </Group>
      <DashboardHero />
      {refreshError && (
        <Text c="red" size="sm" mb="md">
          No se pudo actualizar el panel: {refreshError}. Se conservan los últimos datos válidos.
        </Text>
      )}
      <Stack spacing="md">
        <DashboardSummary totals={{
          users: users.total,
          roles: roles.length,
          permissions: null,
          logs: recentAudit.length,
          userSparkline: userActivity.map(item => item.count),
          roleSparkline: roles.map(item => item.count),
          permissionSparkline: topPermissions.map(item => item.count),
          auditSparkline: auditByAction.map(item => item.count)
        }} />
        <UserStatusSummary active={users.active} inactive={users.inactive} pending={0} />
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <UsersByRoleChart data={roles.map((item) => ({ role: item.role, value: item.count }))} />
          <UserRegistrationChart data={userActivity} />
        </SimpleGrid>
        <UserGrowthChart data={activity} />
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <SecurityActivityChart data={auditByAction} />
          <Chart3DWrapper
            lazy3D={<ModuleActivity3D data={moduleActivity} />}
            fallback={<ModuleAccessChart data={moduleActivity} />}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <SystemStatus status={{
            api: services.api?.status || 'no disponible',
            ia: services.ia?.status || 'no disponible',
            database: services.database?.status || 'no disponible'
          }} />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <RecentActivity logs={recentAudit} />
          <TopPermissions permissions={topPermissions} error={permissionsError} />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <LastLogins logins={lastLogins} />
          <SecurityAlerts alerts={failedAudit} />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <ChangeHistory changes={recentChanges} />
          <AIPanel data={aiData} status={aiStatus.status} message={aiStatus.message} isDemo={false} />
        </SimpleGrid>
      </Stack>
    </Box>
  );
}
