const permissionMatrix = require('../../src/constants/permissionMatrix');

describe('permissionMatrix', () => {
  it('contains core permission names', () => {
    expect(permissionMatrix).toMatchObject({
      CREATE_USER: 'create_user',
      READ_USER: 'read_user',
      UPDATE_USER: 'update_user',
      DELETE_USER: 'delete_user',
      MANAGE_ROLES: 'manage_roles',
      VIEW_AUDIT: 'view_audit'
    });
  });
});
