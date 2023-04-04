import { pool } from "./index.js"

const getVacxin = async () => {
  const data = await pool.query('SELECT * FROM "lblVacxins" ORDER BY id ASC')

  return data.rows;
}

export {
  getVacxin
}