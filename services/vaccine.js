import { pool } from "./index.js"

const getList = async () => {
  const data = await pool.query('SELECT * FROM "tblVaccines" ORDER BY id ASC')

  return data.rows;
}

const create = async (item) => {
  return pool.query(`INSERT INTO "tblVaccines" ("name", "image", "description", "object", "regimen", "price") VALUES ('${item.name}', '${item.image}', '${item.description}', '${item.object}', '${item.regimen}', '${item.price}')`)
}

export {
  getList,
  create
}
