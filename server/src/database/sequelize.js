import { Sequelize } from 'sequelize';
import { dbConfig } from '../utils/config.js';
console.log('DB-CONFIG', dbConfig);   
export const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',  // explicitly specify dialect here
});
