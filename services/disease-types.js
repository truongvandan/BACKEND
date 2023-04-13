import { pool } from "./index.js"

const getList = async () => {
  const data = await pool.query('SELECT * FROM "tblDiseaseType" ORDER BY id ASC')

  return data.rows;
}

export {
    getList
}