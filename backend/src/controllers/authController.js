const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { User, Role, RefreshToken } = require('../models');

const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '15m';
const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || '7d';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET is required in production');
    }
    return 'supersecret';
  }
  return secret;
}

function ttlToMs(ttl) {
  if (typeof ttl === 'number') return ttl * 1000;
  const match = /^([0-9]+)([smhd])$/.exec(ttl);
  if (!match) return 15 * 60 * 1000; // default 15m
  const value = parseInt(match[1], 10);
  const unit = match[2];
  const multipliers = { s: 1000, m: 60 * 1000, h: 60 * 60 * 1000, d: 24 * 60 * 60 * 1000 };
  return value * multipliers[unit];
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

async function generateTokens(user) {
  const roles = await user.getRoles({ attributes: ['name'] });
  const roleNames = roles.map(r => r.name);

  const accessToken = jwt.sign(
    { id: user.id, email: user.email, roles: roleNames },
    getJwtSecret(),
    { expiresIn: ACCESS_TOKEN_TTL }
  );

  const refreshRaw = crypto.randomBytes(40).toString('hex');
  const refreshTokenHash = hashToken(refreshRaw);
  const expiresAt = new Date(Date.now() + ttlToMs(REFRESH_TOKEN_TTL));
  await RefreshToken.create({
    tokenHash: refreshTokenHash,
    userId: user.id,
    expiresAt
  });

  return { accessToken, refreshToken: refreshRaw, roleNames, expiresAt };
}

module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son obligatorios.' });
      }
      const user = await User.scope('withPassword').findOne({ where: { email }, include: [Role] });
      if (!user) return res.status(401).json({ error: 'Credenciales inválidas.' });
      if (user.status && user.status !== 'active') {
        return res.status(403).json({ error: 'Usuario inactivo. Contacta a un administrador.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas.' });

      const { accessToken, refreshToken, roleNames, expiresAt } = await generateTokens(user);
      res.json({
        tokenType: 'Bearer',
        accessToken,
        refreshToken,
        expiresIn: ttlToMs(ACCESS_TOKEN_TTL) / 1000,
        user: { id: user.id, name: user.name, email: user.email, roles: roleNames },
        refreshExpiresAt: expiresAt
      });
    } catch (err) {
      res.status(500).json({ error: 'Error al iniciar sesión.', details: process.env.NODE_ENV === 'production' ? undefined : err.message });
    }
  },

  async refresh(req, res) {
    try {
      const { refreshToken } = req.body || {};
      if (!refreshToken) return res.status(400).json({ error: 'refreshToken es obligatorio.' });
      const tokenHash = hashToken(refreshToken);
      const stored = await RefreshToken.findOne({ where: { tokenHash } });
      if (!stored) return res.status(401).json({ error: 'Refresh token inválido.' });
      if (stored.revokedAt) return res.status(401).json({ error: 'Refresh token revocado.' });
      if (stored.expiresAt < new Date()) return res.status(401).json({ error: 'Refresh token expirado.' });

      const user = await User.findByPk(stored.userId, { include: [Role] });
      if (!user) return res.status(401).json({ error: 'Usuario no encontrado para el token.' });

      // Rotación: revocar token anterior y emitir uno nuevo
      await stored.update({ revokedAt: new Date() });
      const { accessToken, refreshToken: newRefresh, roleNames, expiresAt } = await generateTokens(user);

      res.json({
        tokenType: 'Bearer',
        accessToken,
        refreshToken: newRefresh,
        expiresIn: ttlToMs(ACCESS_TOKEN_TTL) / 1000,
        user: { id: user.id, name: user.name, email: user.email, roles: roleNames },
        refreshExpiresAt: expiresAt
      });
    } catch (err) {
      res.status(500).json({ error: 'Error al refrescar token.', details: process.env.NODE_ENV === 'production' ? undefined : err.message });
    }
  },

  async logout(req, res) {
    try {
      const { refreshToken } = req.body || {};
      if (refreshToken) {
        const tokenHash = hashToken(refreshToken);
        const stored = await RefreshToken.findOne({ where: { tokenHash } });
        if (stored) {
          await stored.update({ revokedAt: new Date() });
        }
      }
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'Error al cerrar sesión.', details: process.env.NODE_ENV === 'production' ? undefined : err.message });
    }
  }
};
