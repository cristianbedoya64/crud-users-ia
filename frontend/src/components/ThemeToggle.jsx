import { ActionIcon, Tooltip, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const label = isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';

  return (
    <Tooltip label={label}>
      <ActionIcon
        variant="light"
        color={isDark ? 'yellow' : 'blue'}
        size="lg"
        aria-label={label}
        onClick={() => toggleColorScheme()}
        style={{ position: 'fixed', top: 16, right: 16, zIndex: 3000 }}
      >
        {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
      </ActionIcon>
    </Tooltip>
  );
}
