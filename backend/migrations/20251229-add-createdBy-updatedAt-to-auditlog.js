'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('AuditLogs', 'createdBy', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('AuditLogs', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW')
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('AuditLogs', 'createdBy');
    await queryInterface.removeColumn('AuditLogs', 'updatedAt');
  }
};
