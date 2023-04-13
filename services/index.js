import pg from 'pg';

const {Pool} = pg
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
})

// {
//   user: 'truongvandan',
//   host: 'dpg-cgs18o8dh87on0pnhjr0-a.singapore-postgres.render.com',
//   database: 'vaccines_api',
//   password: '9KGsK9pEVHNVeUJ4eyktDZQW4FeHl4Md',
//   port: 5432,
// }

export { pool }
