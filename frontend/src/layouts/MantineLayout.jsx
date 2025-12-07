import React from 'react';
import { AppShell, Group, Text, NavLink, Box } from '@mantine/core';
import { IconDashboard, IconUsers, IconKey, IconShield, IconHistory } from '@tabler/icons-react';

const navItems = [
  { label: 'Dashboard', icon: <IconDashboard size={20} />, view: 'dashboard' },
  { label: 'Usuarios', icon: <IconUsers size={20} />, view: 'users' },
  { label: 'Roles', icon: <IconShield size={20} />, view: 'roles' },
  { label: 'Permisos', icon: <IconKey size={20} />, view: 'permissions' },
  { label: 'Auditoría', icon: <IconHistory size={20} />, view: 'audit' },
];

export default function MantineLayout({ view, setView, children }) {
  return (
    <AppShell padding="md">
      <AppShell.Navbar p="xs" style={{ width: 220 }}>
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
              onClick={() => setView(item.view)}
              color="blue"
              style={{ marginBottom: 8 }}
            />
          ))}
        </Box>
      </AppShell.Navbar>
      <AppShell.Header>
        <Box h={56} px="md" style={{ background: '#1976d2', display: 'flex', alignItems: 'center' }}>
          <Text fw={700} size="lg" color="white">UARP-AI Dashboard</Text>
        </Box>
      </AppShell.Header>
      <AppShell.Main>
        <Group p="md">
          {children}
        </Group>
      </AppShell.Main>
    </AppShell>
  );
}
