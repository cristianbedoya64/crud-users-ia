import React from 'react';
import { AppShell, Group, Text, NavLink, Box, Button, Stack, Burger } from '@mantine/core';
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
      navbar={{ width: 220, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      header={{ height: 56 }}
    >
      <AppShell.Navbar p="xs">
        <Box mb="md" style={{ display: 'flex', justifyContent: 'center' }}>
          <Text fw={700} size="lg" color="blue.9">UARP-AI</Text>
        </Box>
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
              style={{ marginBottom: 8 }}
            />
          ))}
        </Box>
      </AppShell.Navbar>
      <AppShell.Header>
        <Box h={56} px="md" style={{ background: '#1976d2', display: 'flex', alignItems: 'center' }}>
          <Group style={{ width: '100%', justifyContent: 'space-between' }}>
            <Group gap="sm">
              {isMobile && (
                <Burger opened={opened} onClick={toggle} size="sm" color="white" />
              )}
              <Text fw={700} size="lg" color="white">UARP-AI Dashboard</Text>
            </Group>
            <Group gap="sm">
              <Stack gap={0} align="flex-end">
                <Text fw={600} size="sm" color="white">{user?.name || 'Usuario'}</Text>
                <Text size="xs" color="white" style={{ opacity: 0.85 }}>{user?.email || ''}</Text>
              </Stack>
              <Button size="xs" color="red" variant="white" onClick={onLogout}>Salir</Button>
            </Group>
          </Group>
        </Box>
      </AppShell.Header>
      <AppShell.Main>
        <Box p={{ base: 'xs', sm: 'md' }}>
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}
