import pg from 'pg'
import * as dotenv from 'dotenv'

dotenv.config()

const {
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
} = process.env

const {Pool} = pg
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  ssl: true,
})

export { pool }
