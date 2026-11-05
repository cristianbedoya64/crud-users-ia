const auditController = require('../../src/controllers/auditLogController');
const { AuditLog } = require('../../src/models');

jest.mock('../../src/models', () => ({
  AuditLog: { findAndCountAll: jest.fn() },
  User: {}
}));

describe('Audit log pagination and serialization', () => {
  it('limits pages and removes sensitive detail fields', async () => {
    AuditLog.findAndCountAll.mockResolvedValue({
      count: 101,
      rows: [{
        id: 1, userId: 2, createdBy: 3, action: 'failed_access',
        details: JSON.stringify({ resource: 'users', password: 'hidden', ip: '127.0.0.1' }),
        createdAt: new Date('2026-01-01T00:00:00Z'),
        user: { id: 2, name: 'Target', email: 'target@example.com' },
        executor: { id: 3, name: 'Operator', email: 'operator@example.com' }
      }]
    });
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await auditController.list({ query: { page: '2', limit: '100' } }, res);

    expect(AuditLog.findAndCountAll).toHaveBeenCalledWith(expect.objectContaining({
      limit: 100, offset: 100, distinct: true,
      include: expect.arrayContaining([expect.objectContaining({ as: 'executor' })])
    }));
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      total: 101, page: 2, limit: 100, pages: 2,
      logs: [expect.objectContaining({
        result: 'failed', resource: 'users',
        executor: expect.objectContaining({ name: 'Operator' }),
        details: { resource: 'users' }
      })]
    }));
  });
});
