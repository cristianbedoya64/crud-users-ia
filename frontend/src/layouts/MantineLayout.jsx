import React, { useEffect, useRef } from 'react';
import { AppShell, Group, Text, NavLink, Box, Button, Stack, Burger, Avatar, Divider, Paper } from '@mantine/core';
import { IconDashboard, IconUsers, IconKey, IconShield, IconHistory } from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { getUserPermissions } from '../utils/permissions';

const navItems = [
  { label: 'Dashboard', icon: <IconDashboard size={20} />, view: 'dashboard' },
  { label: 'Usuarios', icon: <IconUsers size={20} />, view: 'users', requiredPermission: 'read_user' },
  { label: 'Roles', icon: <IconShield size={20} />, view: 'roles', requiredPermission: 'manage_roles' },
  { label: 'Permisos', icon: <IconKey size={20} />, view: 'permissions', requiredPermission: 'manage_roles' },
  { label: 'Auditoría', icon: <IconHistory size={20} />, view: 'audit', requiredPermission: 'view_audit' },
];

export default function MantineLayout({ view, setView, user, onLogout, children }) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 992px)');
  const userPermissions = getUserPermissions(user);
  const visibleNavItems = navItems.filter(item => !item.requiredPermission || userPermissions.has(item.requiredPermission));

  const wasMobileRef = useRef(isMobile);
  useEffect(() => {
    if (isMobile && !wasMobileRef.current) {
      close();
    }
    wasMobileRef.current = isMobile;
  }, [isMobile, close]);

  return (
    <AppShell
      padding="md"
      navbar={{ width: 240, breakpoint: 'md', collapsed: { mobile: !opened } }}
      header={{ height: { base: 92, sm: 64 } }}
    >
      <AppShell.Navbar p="md" style={{ background: '#f8fafc' }}>
        <Box mb="md" style={{ display: 'flex', justifyContent: 'center' }}>
          <Group gap="xs">
            <Avatar radius="md" color="blue">UA</Avatar>
            <Text fw={700} size="lg" c="blue.9">UARP-AI</Text>
          </Group>
        </Box>
        <Divider mb="sm" />
        <Box>
          {visibleNavItems.map(item => (
            <NavLink
              key={item.label}
              label={item.label}
              leftSection={item.icon}
              active={view === item.view}
              aria-label={item.label}
              onClick={() => {
                setView(item.view);
                if (isMobile) close();
              }}
              color="blue"
              variant={view === item.view ? 'filled' : 'light'}
              style={{ marginBottom: 10, borderRadius: 10 }}
            />
          ))}
        </Box>
      </AppShell.Navbar>
      <AppShell.Header>
        <Box
          h="100%"
          px="md"
          py={{ base: 'xs', sm: 0 }}
          style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 6px 20px rgba(37, 99, 235, 0.25)'
          }}
        >
          <Group style={{ width: '100%', justifyContent: 'space-between' }} wrap="nowrap" align="center">
            <Group gap="sm" wrap="nowrap">
              {isMobile && (
                <Burger opened={opened} onClick={toggle} size="sm" color="white" />
              )}
              <Paper
                radius="xl"
                px="sm"
                py={6}
                style={{
                  background: 'rgba(255,255,255,0.16)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 6px 18px rgba(15,23,42,0.25)'
                }}
              >
                <Stack gap={0} style={{ lineHeight: 1.05 }}>
                  <Text fw={700} size="sm" c="white" style={{ letterSpacing: 0.4 }}>
                    Control seguro
                  </Text>
                  <Text fw={600} size="xs" c="white" style={{ letterSpacing: 0.6, opacity: 0.9 }}>
                    de Usuarios
                  </Text>
                </Stack>
              </Paper>
            </Group>
            <Group gap="sm" wrap="nowrap" justify="flex-end" style={{ flex: 1, minWidth: 0 }}>
              <Paper
                radius="xl"
                px="sm"
                py={6}
                style={{
                  background: 'rgba(255,255,255,0.16)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 6px 18px rgba(15,23,42,0.25)',
                  maxWidth: isMobile ? 170 : 280,
                  minWidth: 0
                }}
              >
                <Stack gap={0} align={isMobile ? 'flex-start' : 'flex-end'} style={{ minWidth: 0 }}>
                  <Text fw={600} size="sm" c="white" lineClamp={1}>
                    {user?.name || 'Usuario'}
                  </Text>
                  <Text size="xs" c="white" style={{ opacity: 0.85 }} lineClamp={1}>
                    {user?.email || ''}
                  </Text>
                </Stack>
              </Paper>
              <Button size="xs" color="gray" variant="white" onClick={onLogout}>Salir</Button>
            </Group>
          </Group>
        </Box>
      </AppShell.Header>
      <AppShell.Main>
        <Box p={{ base: 'xs', sm: 'md' }} style={{ background: '#f1f5f9', minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
