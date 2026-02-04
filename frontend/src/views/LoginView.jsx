import { useState } from 'react';
import { Card, TextInput, PasswordInput, Button, Title, Stack, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { notifyError } from '../utils/notify';
import { login } from '../auth';
import { isValidEmail } from '../utils/validation';

export default function LoginView({ onLogin }) {
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('Password1!');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      notifyError({ title: 'Error', message: 'Email y contraseña son obligatorios.' });
      return;
    }
    if (!isValidEmail(email)) {
      notifyError({ title: 'Error', message: 'El email no tiene un formato válido.' });
      return;
    }
    setLoading(true);
    try {
      const data = await login(email, password);
      notifications.show({ color: 'green', title: 'Sesión iniciada', message: `Bienvenido ${data?.user?.name || ''}` });
      onLogin?.(data);
    } catch (err) {
      notifyError({ title: 'Error', message: err.message || 'No se pudo iniciar sesión' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card shadow="md" padding="lg" radius="md" withBorder maw={420} mx="auto" mt="xl">
      <Stack>
        <Title order={3}>Iniciar sesión</Title>
        <Text c="dimmed" size="sm">Usa tus credenciales para obtener un token Bearer.</Text>
        <TextInput label="Email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@demo.com" required />
        <PasswordInput label="Contraseña" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password1!" required />
        <Button color="blue" onClick={handleLogin} loading={loading}>Entrar</Button>
        <Text size="xs" c="dimmed">Demo: admin@demo.com / Password1!</Text>
      </Stack>
    </Card>
  );
}
