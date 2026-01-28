import { useMemo } from 'react';
import {
  Container,
  Grid,
  Title,
  Text,
  Button,
  Group,
  Card,
  Stack,
  Badge,
  ThemeIcon,
  SimpleGrid,
  Image,
  Box,
  Paper,
  Divider,
  Avatar
} from '@mantine/core';
import {
  IconSparkles,
  IconUsers,
  IconShield,
  IconKey,
  IconHistory,
  IconDashboard,
  IconRobot,
  IconRocket,
  IconChecklist,
  IconStars
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const appName = 'UARP-AI';
const creatorName = 'Cristian Bedoya';

export default function WelcomeView() {
  const navigate = useNavigate();

  const modules = useMemo(() => ([
    {
      title: 'Dashboard Inteligente',
      description: 'Visión general de métricas, actividad y tendencias clave.',
      icon: <IconDashboard size={22} />,
      path: '/dashboard'
    },
    {
      title: 'Usuarios',
      description: 'Crea, edita y organiza personas con validaciones claras.',
      icon: <IconUsers size={22} />,
      path: '/users'
    },
    {
      title: 'Roles',
      description: 'Define perfiles y asigna responsabilidades precisas.',
      icon: <IconShield size={22} />,
      path: '/roles'
    },
    {
      title: 'Permisos',
      description: 'Controla accesos de forma granular y segura.',
      icon: <IconKey size={22} />,
      path: '/permissions'
    },
    {
      title: 'Auditoría',
      description: 'Explora trazabilidad, cambios y eventos críticos.',
      icon: <IconHistory size={22} />,
      path: '/audit'
    }
  ]), []);

  const highlights = useMemo(() => ([
    {
      title: '¿Qué es la app?',
      text: `${appName} es una plataforma moderna para administrar identidades, roles y permisos con analítica integrada.`
    },
    {
      title: '¿Para qué sirve?',
      text: 'Centraliza la gestión de accesos, simplifica el control operativo y aporta visibilidad en tiempo real.'
    },
    {
      title: '¿Por qué la creé?',
      text: 'La diseñé para hacer más humano el gobierno de usuarios: rápido, claro y con narrativa visual.'
    },
    {
      title: 'Usos posibles',
      text: 'Equipos de TI, seguridad, compliance y líderes que necesitan controlar acceso con eficiencia.'
    }
  ]), []);

  return (
    <Box style={{ background: 'linear-gradient(180deg, #eef2ff 0%, #f8fafc 45%, #ffffff 100%)', minHeight: '100vh' }}>
      <Container size="lg" py={{ base: 30, md: 50 }}>
        <Grid align="center" gutter={{ base: 32, md: 48 }}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="lg">
              <Group gap="xs">
                <Badge variant="light" color="blue" leftSection={<IconSparkles size={14} />}>Nuevo</Badge>
                <Badge variant="outline" color="indigo">Experiencia interactiva</Badge>
              </Group>
              <Title order={1} style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}>
                Bienvenido a {appName}
              </Title>
              <Text size="lg" c="dimmed">
                La plataforma donde yo soy el protagonista creativo: una app pensada para modernizar la gestión
                de usuarios, permisos y auditoría con un enfoque visual, claro y divertido.
              </Text>
              <Group wrap="wrap">
                <Button size="md" color="blue" onClick={() => navigate('/login')}>¡Bienvenido! Ir al login</Button>
              </Group>
              <Group gap="xl">
                <Stack gap={4}>
                  <Text fw={700}>Cómo se llama</Text>
                  <Text c="dimmed">{appName}</Text>
                </Stack>
                <Stack gap={4}>
                  <Text fw={700}>Creada por</Text>
                  <Text c="dimmed">{creatorName}</Text>
                </Stack>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper radius="lg" shadow="xl" p="md" style={{ background: 'linear-gradient(145deg, #0f172a 0%, #1e3a8a 55%, #3b82f6 100%)' }}>
              <Image src="/welcome-hero.svg" alt="Ilustración de bienvenida" radius="md" />
            </Paper>
          </Grid.Col>
        </Grid>

        <Divider my={{ base: 32, md: 40 }} />

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {highlights.map((item) => (
            <Card key={item.title} shadow="sm" radius="md" p="lg" withBorder>
              <Stack gap="xs">
                <Title order={4}>{item.title}</Title>
                <Text size="sm" c="dimmed">{item.text}</Text>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>

        <Grid mt={{ base: 36, md: 50 }} gutter={{ base: 24, md: 36 }} align="stretch">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card shadow="md" radius="lg" p={{ base: 'lg', md: 'xl' }}>
              <Stack gap="md">
                <Group>
                  <ThemeIcon size={46} radius="md" color="blue" variant="light">
                    <IconRocket size={24} />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Title order={3}>Cómo interactuar con los módulos</Title>
                    <Text size="sm" c="dimmed">Guía rápida y atractiva para descubrir cada sección.</Text>
                  </Stack>
                </Group>
                <Stack gap="sm">
                  <Group align="flex-start" gap="sm">
                    <ThemeIcon size={36} radius="xl" color="indigo" variant="light">
                      <IconChecklist size={18} />
                    </ThemeIcon>
                    <Text size="sm">Explora cada módulo como si fuera una misión: crea usuarios, define roles y valida permisos con rapidez.</Text>
                  </Group>
                  <Group align="flex-start" gap="sm">
                    <ThemeIcon size={36} radius="xl" color="blue" variant="light">
                      <IconStars size={18} />
                    </ThemeIcon>
                    <Text size="sm">En el dashboard verás métricas clave para tomar decisiones inmediatas y medir impacto.</Text>
                  </Group>
                  <Group align="flex-start" gap="sm">
                    <ThemeIcon size={36} radius="xl" color="violet" variant="light">
                      <IconRobot size={18} />
                    </ThemeIcon>
                    <Text size="sm">El panel de IA estará listo para sugerirte acciones inteligentes y automatizar tareas repetitivas.</Text>
                  </Group>
                </Stack>
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Card shadow="md" radius="lg" p="xl" withBorder style={{ height: '100%' }}>
              <Stack align="center" gap="md">
                <Avatar size={96} radius={32} src="/creator-profile.svg" alt="Creador" />
                <Badge variant="light" color="blue">Creador y protagonista</Badge>
                <Title order={4}>{creatorName}</Title>
                <Text size="sm" ta="center" c="dimmed">
                  Arquitecto de {appName}. Diseñé la experiencia para que cada módulo sea intuitivo, potente y memorable.
                </Text>
                <Button variant="default" onClick={() => navigate('/dashboard')}>Comenzar recorrido</Button>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        <Grid mt={{ base: 36, md: 50 }} gutter={{ base: 24, md: 36 }}>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Card shadow="md" radius="lg" p={{ base: 'lg', md: 'xl' }} withBorder>
              <Stack gap="md">
                <Group justify="space-between" align="center">
                  <Title order={3}>Panel IA</Title>
                  <Badge color="violet" variant="light">Próximamente</Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  Este espacio albergará funciones inteligentes: recomendaciones, alertas predictivas y asistentes
                  contextuales para agilizar tu trabajo.
                </Text>
                <Paper radius="md" p="lg" style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)' }}>
                  <Group gap="md">
                    <ThemeIcon size={48} radius="md" color="violet" variant="light">
                      <IconRobot size={26} />
                    </ThemeIcon>
                    <Stack gap={2}>
                      <Text fw={600}>IA en camino</Text>
                      <Text size="sm" c="dimmed">Entrenando modelos para decisiones más inteligentes.</Text>
                    </Stack>
                  </Group>
                </Paper>
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Card shadow="md" radius="lg" p="xl" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
              <Stack gap="sm">
                <Badge color="cyan" variant="light">Interacción destacada</Badge>
                <Title order={3} c="white">¿Qué puedes hacer hoy?</Title>
                <Text size="sm" c="gray.2">
                  Navega, crea, ajusta permisos y monitorea actividad desde un solo lugar.
                </Text>
                <Button color="cyan" onClick={() => navigate('/users')}>Ir a Usuarios</Button>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        <Stack mt={{ base: 40, md: 50 }} gap="lg">
          <Title order={3}>Explora los módulos principales</Title>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
            {modules.map((module) => (
              <Card key={module.title} shadow="sm" radius="md" p="lg" withBorder>
                <Group mb="sm">
                  <ThemeIcon size={40} radius="md" color="blue" variant="light">
                    {module.icon}
                  </ThemeIcon>
                  <Title order={4}>{module.title}</Title>
                </Group>
                <Text size="sm" c="dimmed">{module.description}</Text>
                <Button mt="md" variant="light" onClick={() => navigate(module.path)}>Explorar</Button>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}
