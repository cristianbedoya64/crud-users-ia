'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'documentId', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      defaultValue: 'pendiente'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'documentId');
  }
};
