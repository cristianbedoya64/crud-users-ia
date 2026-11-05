jest.mock('axios', () => ({ post: jest.fn() }));
jest.mock('../../src/models', () => ({
  sequelize: {
    fn: jest.fn((name, value) => `${name}(${value})`),
    col: jest.fn(value => value),
    literal: jest.fn(value => value),
    authenticate: jest.fn()
  },
  User: {
    count: jest.fn(),
    findAll: jest.fn()
  },
  Role: { findAll: jest.fn() },
  UserRole: { findAll: jest.fn() },
  AuditLog: {
    findAll: jest.fn(),
    count: jest.fn()
  }
}));

const axios = require('axios');
const { sequelize, User, Role, UserRole, AuditLog } = require('../../src/models');
const { getSummary } = require('../../src/services/dashboardService');

describe('dashboardService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    User.count
      .mockResolvedValueOnce(4)
      .mockResolvedValueOnce(3)
      .mockResolvedValueOnce(1);
    User.findAll.mockResolvedValue([{ id: 1, name: 'Ana', email: 'ana@example.com', status: 'active' }]);
    UserRole.findAll.mockResolvedValue([{ roleId: 1, count: '3' }]);
    Role.findAll.mockResolvedValue([{ id: 1, name: 'admin' }]);
    AuditLog.findAll
      .mockResolvedValueOnce([{ id: 1, userId: 1, action: 'login', createdAt: new Date() }])
      .mockResolvedValueOnce([{ action: 'login', count: '2' }])
      .mockResolvedValueOnce([{ date: '2026-11-04', count: '2' }]);
    AuditLog.count.mockResolvedValue(1);
    sequelize.authenticate.mockResolvedValue();
    axios.post.mockResolvedValue({ status: 200 });
  });

  it('returns the stable summary contract without password data', async () => {
    const summary = await getSummary();

    expect(summary).toEqual(expect.objectContaining({
      users: {
        total: 4,
        active: 3,
        inactive: 1,
        recent: expect.any(Array)
      },
      roles: expect.any(Array),
      audit: {
        recent: expect.any(Array),
        byAction: [{ action: 'login', count: 2 }],
        failedAccess: 1
      },
      activity: [{ date: '2026-11-04', count: 2 }],
      services: expect.any(Object)
    }));
    expect(summary.users.createdRecently).toBeUndefined();
    expect(summary.audit.actions).toBeUndefined();
    expect(summary.audit.failedAccesses).toBeUndefined();
    expect(summary.activityByDate).toBeUndefined();
    expect(summary.roles).toEqual([{ roleId: 1, role: 'admin', count: 3 }]);
    expect(summary.services.database.status).toBe('online');
    expect(summary.users.recent[0].password).toBeUndefined();
  });
});
