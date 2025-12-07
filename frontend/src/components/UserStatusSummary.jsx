import { Card, Group, Box, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconUserCheck, IconUserX, IconClock } from '@tabler/icons-react';

export default function UserStatusSummary({ active, inactive, pending }) {
  return (
    <SimpleGrid cols={3} spacing="lg" mb="xl">
      <Card shadow="md" radius="md" withBorder>
        <Group>
          <ThemeIcon color="green" size={40} radius="md"><IconUserCheck size={28} /></ThemeIcon>
          <Box>
            <Text size="lg" fw={700}>{active}</Text>
            <Text size="sm" color="dimmed">Activos</Text>
          </Box>
        </Group>
      </Card>
      <Card shadow="md" radius="md" withBorder>
        <Group>
          <ThemeIcon color="red" size={40} radius="md"><IconUserX size={28} /></ThemeIcon>
          <Box>
            <Text size="lg" fw={700}>{inactive}</Text>
            <Text size="sm" color="dimmed">Bloqueados</Text>
          </Box>
        </Group>
      </Card>
      <Card shadow="md" radius="md" withBorder>
        <Group>
          <ThemeIcon color="yellow" size={40} radius="md"><IconClock size={28} /></ThemeIcon>
          <Box>
            <Text size="lg" fw={700}>{pending}</Text>
            <Text size="sm" color="dimmed">Pendientes</Text>
          </Box>
        </Group>
      </Card>
    </SimpleGrid>
  );
}
