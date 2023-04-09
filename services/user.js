import { pool } from "./index.js"

const findUserByEmail = async (email) => {
  const data = await pool.query(`SELECT * FROM "tblUser" WHERE "email"='${email}'`)

  return data.rows[0];
}

const createUser = async (email, password, name, phoneNumber) => {
    return pool.query(`INSERT INTO "tblUser" ("email", "password", "name", "phoneNumber") VALUES ('${email}', '${password}', '${name}', '${phoneNumber}')`)
}

export {
  findUserByEmail,
  createUser
}
