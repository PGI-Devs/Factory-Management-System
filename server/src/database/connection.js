import mysql from 'mysql2/promise';
import { dbConfig } from '../utils/config.js';

async function connect() {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
  });
  return connection;
}

export default connect;
