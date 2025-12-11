import DOMPurify from 'dompurify';
import React, { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';

export default function AssignPermissionsForm({ onAssigned }) {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPerms, setSelectedPerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/roles')
      .then(res => res.json())
      .then(setRoles);
    fetch('http://localhost:3000/api/permissions')
      .then(res => res.json())
      .then(setPermissions);
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedRole || selectedPerms.length === 0) {
      setMessage('Selecciona un rol y al menos un permiso.');
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Selecciona un rol y al menos un permiso.',
        autoClose: 4000
      });
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`http://localhost:3000/api/role-permissions/${selectedRole}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissionIds: selectedPerms })
      });
      if (res.ok) {
        setMessage('Permisos asignados correctamente.');
        notifications.show({
          color: 'green',
          title: 'Éxito',
          message: 'Permisos asignados correctamente.',
          autoClose: 3000
        });
        if (onAssigned) onAssigned();
      } else {
        const data = await res.json();
        setMessage(data.error || 'Error al asignar permisos.');
        notifications.show({
          color: 'red',
          title: 'Error',
          message: data.error || 'Error al asignar permisos.',
          autoClose: 4000
        });
      }
    } catch (err) {
      setMessage('Error de red.');
      notifications.show({
        color: 'red',
        title: 'Error de red',
        message: 'No se pudo conectar al servidor.',
        autoClose: 4000
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleAssign} style={{ padding: 20, border: '1px solid #eee', borderRadius: 8, background: '#fafafa', maxWidth: 400 }}>
      <h3>Asignar Permisos a Rol</h3>
      <div>
        <label>Rol:</label>
        <select value={selectedRole} onChange={e => setSelectedRole(DOMPurify.sanitize(e.target.value))} required>
          <option value="">Selecciona un rol</option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: 10 }}>
        <label>Permisos:</label>
        <div style={{ maxHeight: 120, overflowY: 'auto', border: '1px solid #ddd', padding: 5 }}>
          {permissions.map(perm => (
            <div key={perm.id} style={{ marginBottom: 6 }}>
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span>
                  <input
                    type="checkbox"
                    value={perm.id}
                    checked={selectedPerms.includes(perm.id)}
                    onChange={e => {
                      const value = DOMPurify.sanitize(e.target.value);
                      if (e.target.checked) setSelectedPerms([...selectedPerms, perm.id]);
                      else setSelectedPerms(selectedPerms.filter(id => id !== perm.id));
                    }}
                  />
                  <b style={{ marginLeft: 6 }}>{perm.name}</b>
                </span>
                {perm.description && (
                  <span style={{ fontSize: '0.9em', color: '#555', marginLeft: 24 }}>{perm.description}</span>
                )}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" disabled={loading} style={{ marginTop: 15 }}>
        {loading ? 'Asignando...' : 'Asignar Permisos'}
      </button>
      {message && <div style={{ marginTop: 10, color: message.includes('correctamente') ? 'green' : 'red' }}>{message}</div>}
    </form>
  );
}
