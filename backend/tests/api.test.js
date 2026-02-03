const request = require('supertest');
const { createTestApp } = require('./testApp');
const userController = require('../src/controllers/userController');
const authController = require('../src/controllers/authController');
const permission = require('../src/middleware/permission');

jest.mock('../src/models', () => ({
  User: {
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    scope: jest.fn()
  },
  Role: {},
  Permission: {},
  RefreshToken: {
    findOne: jest.fn(),
    create: jest.fn()
  }
}));

const { User, RefreshToken } = require('../src/models');

function createRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };
}

describe('API smoke', () => {
  it('GET / returns running message', async () => {
    const app = createTestApp();
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('UARP-AI Backend Running');
  });
});

describe('Users API (security)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('list uses attributes exclude password', async () => {
    User.findAndCountAll.mockResolvedValue({ count: 0, rows: [] });
    const req = { query: {} };
    const res = createRes();

    await userController.list(req, res);

    expect(User.findAndCountAll).toHaveBeenCalledWith(
      expect.objectContaining({ attributes: { exclude: ['password'] } })
    );
  });

  it('detail uses attributes exclude password', async () => {
    User.findByPk.mockResolvedValue({ id: 1, name: 'Test' });
    const req = { params: { id: 1 } };
    const res = createRes();

    await userController.detail(req, res);

    expect(User.findByPk).toHaveBeenCalledWith(
      1,
      expect.objectContaining({ attributes: { exclude: ['password'] } })
    );
  });
});

describe('RBAC permission middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 403 when user lacks required permission', async () => {
    User.findByPk.mockResolvedValue({
      Roles: [{ Permissions: [{ name: 'read_user' }] }]
    });
    const req = { user: { id: 1 } };
    const res = createRes();
    const next = jest.fn();

    await permission('manage_roles')(req, res, next);

    expect(res.statusCode).toBe(403);
    expect(res.body?.error).toMatch(/manage_roles/);
    expect(next).not.toHaveBeenCalled();
  });
});

describe('Auth refresh tokens', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects revoked refresh tokens', async () => {
    RefreshToken.findOne.mockResolvedValue({ revokedAt: new Date() });
    const req = { body: { refreshToken: 'token' } };
    const res = createRes();

    await authController.refresh(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.body?.error).toMatch(/revocado/);
  });

  it('rotates refresh token when valid', async () => {
    const stored = {
      revokedAt: null,
      expiresAt: new Date(Date.now() + 60_000),
      userId: 1,
      update: jest.fn()
    };
    RefreshToken.findOne.mockResolvedValue(stored);
    RefreshToken.create.mockResolvedValue({});
    User.findByPk.mockResolvedValue({
      id: 1,
      email: 'test@demo.com',
      getRoles: jest.fn().mockResolvedValue([{ name: 'admin' }])
    });

    const req = { body: { refreshToken: 'token' } };
    const res = createRes();

    await authController.refresh(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.body?.accessToken).toBeTruthy();
    expect(stored.update).toHaveBeenCalled();
  });
});
