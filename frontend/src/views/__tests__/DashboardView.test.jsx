import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { vi } from 'vitest';
import DashboardView from '../DashboardView';

const summary = {
  users: { total: 4, active: 3, inactive: 1, recent: [] },
  roles: [{ roleId: 1, role: 'admin', count: 3 }],
  audit: { recent: [], byAction: [], failedAccess: 0 },
  activity: [],
  services: { api: { status: 'online' } }
};

vi.mock('../../apiClient', () => ({
  authFetch: vi.fn((url) => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(url.includes('/ia-panel') ? {} : summary)
  }))
}));

describe('DashboardView', () => {
  it('loads the summary endpoint and renders empty states without demo requests', async () => {
    const { authFetch } = await import('../../apiClient');
    render(<MantineProvider><DashboardView /></MantineProvider>);

    await waitFor(() => expect(screen.getByText('Panel de Control')).toBeInTheDocument());
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Actividad de Auditoría por Fecha')).toBeInTheDocument();
    expect(screen.getByText('No disponible en el resumen actual.')).toBeInTheDocument();
    expect(authFetch).toHaveBeenCalledWith(expect.stringContaining('/api/dashboard/summary'));
    expect(authFetch).not.toHaveBeenCalledWith(expect.stringContaining('/api/demo/'));
    expect(authFetch).not.toHaveBeenCalledWith(expect.stringContaining('/api/users'));
    expect(authFetch).not.toHaveBeenCalledWith(expect.stringContaining('/api/roles'));
    expect(authFetch).not.toHaveBeenCalledWith(expect.stringContaining('/api/permissions'));
    expect(authFetch).not.toHaveBeenCalledWith(expect.stringContaining('/api/audit'));
    expect(screen.getByRole('button', { name: 'Actualizar' })).toBeInTheDocument();
    expect(screen.getByText(/Última actualización:/)).toBeInTheDocument();
  });

  it('allows a controlled manual refresh through the same summary endpoint', async () => {
    const { authFetch } = await import('../../apiClient');
    vi.clearAllMocks();
    render(<MantineProvider><DashboardView /></MantineProvider>);

    await waitFor(() => expect(screen.getByText('Panel de Control')).toBeInTheDocument());
    const initialSummaryCalls = authFetch.mock.calls.filter(([url]) => url.includes('/api/dashboard/summary')).length;
    fireEvent.click(screen.getByRole('button', { name: 'Actualizar' }));

    await waitFor(() => {
      const summaryCalls = authFetch.mock.calls.filter(([url]) => url.includes('/api/dashboard/summary')).length;
      expect(summaryCalls).toBe(initialSummaryCalls + 1);
    });
  });
});
