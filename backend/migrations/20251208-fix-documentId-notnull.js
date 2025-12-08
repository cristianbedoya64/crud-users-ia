'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Actualizar valores nulos a un valor temporal antes de aplicar NOT NULL
    await queryInterface.sequelize.query("UPDATE \"Users\" SET \"documentId\" = 'pendiente' WHERE \"documentId\" IS NULL;");
    // Alterar la columna para que sea NOT NULL
    await queryInterface.changeColumn('Users', 'documentId', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Permitir nulos nuevamente si se revierte
    await queryInterface.changeColumn('Users', 'documentId', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
  }
};
