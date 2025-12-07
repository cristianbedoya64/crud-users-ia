import { Card, Group, Text, Box, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconUsers, IconShield, IconKey, IconHistory } from '@tabler/icons-react';

export default function DashboardSummary({ totals }) {
  return (
    <SimpleGrid cols={4} spacing="lg" mb="xl">
      <Card shadow="md" radius="md" withBorder>
        <Group>
          <ThemeIcon color="blue" size={40} radius="md"><IconUsers size={28} /></ThemeIcon>
          <Box>
            <Text size="lg" fw={700}>{totals.users}</Text>
            <Text size="sm" color="dimmed">Usuarios</Text>
          </Box>
        </Group>
      </Card>
      <Card shadow="md" radius="md" withBorder>
        <Group>
          <ThemeIcon color="teal" size={40} radius="md"><IconShield size={28} /></ThemeIcon>
          <Box>
            <Text size="lg" fw={700}>{totals.roles}</Text>
            <Text size="sm" color="dimmed">Roles</Text>
          </Box>
        </Group>
      </Card>
      <Card shadow="md" radius="md" withBorder>
        <Group>
          <ThemeIcon color="violet" size={40} radius="md"><IconKey size={28} /></ThemeIcon>
          <Box>
            <Text size="lg" fw={700}>{totals.permissions}</Text>
            <Text size="sm" color="dimmed">Permisos</Text>
          </Box>
        </Group>
      </Card>
      <Card shadow="md" radius="md" withBorder>
        <Group>
          <ThemeIcon color="orange" size={40} radius="md"><IconHistory size={28} /></ThemeIcon>
          <Box>
            <Text size="lg" fw={700}>{totals.logs}</Text>
            <Text size="sm" color="dimmed">Auditoría</Text>
          </Box>
        </Group>
      </Card>
    </SimpleGrid>
  );
}
