import dotenv from 'dotenv';
dotenv.config();                 // FIRST line executed

export const dbConfig = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS || '',
//   database: process.env.DB_NAME,
  host: 'localhost',
  user:'root',
  password:  '',
  database:'pgi',
  port:4000,
    dialect:  'mysql',
    logging:  false,
};
