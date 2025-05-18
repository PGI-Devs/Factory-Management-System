'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('inventory', {
      id:        { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      sku:       { type: Sequelize.STRING, allowNull: false },
      qty:       { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('inventory');
  }
};
