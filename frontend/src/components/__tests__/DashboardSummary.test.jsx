import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import DashboardSummary from '../DashboardSummary';

describe('DashboardSummary', () => {
  it('renders totals and labels', () => {
    const totals = { users: 10, roles: 3, permissions: 12, logs: 4 };

    render(
      <MantineProvider>
        <DashboardSummary totals={totals} />
      </MantineProvider>
    );

    expect(screen.getByText('Usuarios')).toBeInTheDocument();
    expect(screen.getByText('Roles')).toBeInTheDocument();
    expect(screen.getByText('Permisos')).toBeInTheDocument();
    expect(screen.getByText('Auditoría')).toBeInTheDocument();

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});
