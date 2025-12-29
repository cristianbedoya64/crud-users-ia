'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RefreshTokens', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      tokenHash: { type: Sequelize.STRING, allowNull: false, unique: true },
      expiresAt: { type: Sequelize.DATE, allowNull: false },
      revokedAt: { type: Sequelize.DATE, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE'
      }
    });
    await queryInterface.addIndex('RefreshTokens', ['userId']);
    await queryInterface.addIndex('RefreshTokens', ['expiresAt']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('RefreshTokens');
  }
};
