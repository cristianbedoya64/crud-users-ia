const ACTION_LABELS = {
  login: 'Inicio de sesión',
  logout: 'Cierre de sesión',
  refresh_token: 'Renovación de sesión',
  failed_access: 'Acceso rechazado',
  view_audit: 'Consulta de auditoría',
  create_user: 'Usuario creado',
  read_user: 'Usuario consultado',
  update_user: 'Usuario actualizado',
  delete_user: 'Usuario desactivado',
  restore_user: 'Usuario restaurado',
  create_role: 'Rol creado',
  update_role: 'Rol actualizado',
  delete_role: 'Rol eliminado',
  assign_role: 'Rol asignado',
  remove_role: 'Rol retirado',
  create_permission: 'Permiso creado',
  update_permission: 'Permiso actualizado',
  delete_permission: 'Permiso eliminado',
  assign_permission: 'Permiso asignado',
  remove_permission: 'Permiso retirado'
};

export function getAuditActionLabel(action) {
  if (!action) return 'Actividad registrada';
  return ACTION_LABELS[action] || String(action).replace(/_/g, ' ');
}

export function getAuditActionOptions(actions) {
  return actions
    .filter(Boolean)
    .sort()
    .map(value => ({ value, label: getAuditActionLabel(value) }));
}
