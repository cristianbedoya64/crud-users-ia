const ALL_PERMISSIONS = [
  'create_user',
  'read_user',
  'update_user',
  'delete_user',
  'manage_roles',
  'view_audit'
];

const ROLE_PERMISSIONS = {
  admin: ALL_PERMISSIONS,
  user: ['read_user'],
  auditor: ['read_user', 'view_audit']
};

function normalizeRoles(user) {
  if (!user) return [];
  const roles = user.roles || user.Roles || [];
  if (!Array.isArray(roles)) return [];
  return roles
    .map(role => (typeof role === 'string' ? role : role?.name))
    .filter(Boolean)
    .map(role => role.toLowerCase());
}

export function getUserPermissions(user) {
  const roleNames = normalizeRoles(user);
  if (roleNames.includes('admin')) return new Set(ALL_PERMISSIONS);

  const perms = new Set();
  roleNames.forEach(role => {
    const mapped = ROLE_PERMISSIONS[role] || [];
    mapped.forEach(p => perms.add(p));
  });
  return perms;
}

export function hasPermission(user, permission) {
  if (!permission) return true;
  return getUserPermissions(user).has(permission);
}

export function hasAnyPermission(user, permissions = []) {
  if (!permissions.length) return true;
  const permSet = getUserPermissions(user);
  return permissions.some(p => permSet.has(p));
}
