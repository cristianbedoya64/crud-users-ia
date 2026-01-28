import React from 'react';
import { AppShell, Group, Text, NavLink, Box, Button, Stack, Burger, Avatar, Divider } from '@mantine/core';
import { IconDashboard, IconUsers, IconKey, IconShield, IconHistory } from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

const navItems = [
  { label: 'Dashboard', icon: <IconDashboard size={20} />, view: 'dashboard' },
  { label: 'Usuarios', icon: <IconUsers size={20} />, view: 'users' },
  { label: 'Roles', icon: <IconShield size={20} />, view: 'roles' },
  { label: 'Permisos', icon: <IconKey size={20} />, view: 'permissions' },
  { label: 'Auditoría', icon: <IconHistory size={20} />, view: 'audit' },
];

export default function MantineLayout({ view, setView, user, onLogout, children }) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <AppShell
      padding="md"
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      header={{ height: 64 }}
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
          {navItems.map(item => (
            <NavLink
              key={item.label}
              label={item.label}
              leftSection={item.icon}
              active={view === item.view}
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
          h={64}
          px="md"
          style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 6px 20px rgba(37, 99, 235, 0.25)'
          }}
        >
          <Group style={{ width: '100%', justifyContent: 'space-between' }}>
            <Group gap="sm">
              {isMobile && (
                <Burger opened={opened} onClick={toggle} size="sm" color="white" />
              )}
              <Text fw={700} size="lg" c="white">UARP-AI Dashboard</Text>
            </Group>
            <Group gap="sm">
              <Stack gap={0} align="flex-end">
                <Text fw={600} size="sm" c="white">{user?.name || 'Usuario'}</Text>
                <Text size="xs" c="white" style={{ opacity: 0.85 }}>{user?.email || ''}</Text>
              </Stack>
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
