import { render, screen, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { vi } from 'vitest';
import AuditView from '../AuditView';

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

vi.mock('../../apiClient', () => ({
  authFetch: vi.fn((url) => Promise.resolve({
    ok: true,
    json: () => Promise.resolve(url.includes('/users') ? [] : {
      total: 1, page: 1, limit: 20, pages: 1,
      logs: [{
        id: 1, action: 'failed_access', resource: 'users', result: 'failed',
        date: '2026-01-01T00:00:00Z', userId: 1,
        executor: { name: 'Operator' }, details: { reason: 'denied' }
      }]
    })
  }))
}));

describe('AuditView', () => {
  it('renders the paginated, safe audit contract', async () => {
    render(<MantineProvider><AuditView /></MantineProvider>);
    await waitFor(() => expect(screen.getByText('failed access')).toBeInTheDocument());
    expect(screen.getByText(/Usuario: Operator/)).toBeInTheDocument();
    expect(screen.getByText('Fallido')).toBeInTheDocument();
    expect(screen.getByText(/Recurso: users/)).toBeInTheDocument();
  });
});
