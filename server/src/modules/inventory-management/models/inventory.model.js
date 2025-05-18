import { DataTypes } from 'sequelize';
import { sequelize } from '../../../database/sequelize.js';

export const Inventory = sequelize.define('inventory', {
  id:  { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  sku: { type: DataTypes.STRING,  allowNull: false },
  qty: { type: DataTypes.INTEGER, allowNull: false },
});
