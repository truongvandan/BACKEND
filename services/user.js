import { pool } from "./index.js"

const getList = async () => {
  const data = await pool.query('SELECT * FROM "tblUsers" ORDER BY id ASC')

  return data.rows;
}

const findUserByEmail = async (email) => {
  const data = await pool.query(`SELECT * FROM "tblUsers" WHERE "email"='${email}'`)

  return data.rows[0];
}

const createUser = async (email, password, name, phoneNumber) => {
    return pool.query(`INSERT INTO "tblUsers" ("email", "password", "name", "phoneNumber") VALUES ('${email}', '${password}', '${name}', '${phoneNumber}')`)
}

export {
  findUserByEmail,
  createUser,
  getList
}
