'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Agregar el campo como NULL y sin UNIQUE
    await queryInterface.addColumn('Users', 'documentId', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'documentId');
  }
};
