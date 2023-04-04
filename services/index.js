import pg from 'pg';
const {Pool} = pg
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'VacxinAPI',
  password: 'postgres',
  port: 5432,
})

export { pool }
