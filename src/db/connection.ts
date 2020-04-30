import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.on('connect', client => {
  console.log('Postgres database connected');
});

pool.on('error', err => {
  console.error('Database error!', err);
});
export default pool;
