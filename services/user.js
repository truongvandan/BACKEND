import { pool } from "./index.js"

const getList = async (options = {}) => {
  let whereClause = '';
  const searchText = options.search;

  if (searchText) {
    whereClause = `WHERE "name" ILIKE '%${searchText}%' OR "email" ILIKE '%${searchText}%' OR "phoneNumber" ILIKE '%${searchText}%'`
  }

  const data = await pool.query(`
    SELECT *
    FROM "tblUsers"
    ${whereClause}
    ORDER BY id ASC
    OFFSET ${options.offset}
    LIMIT ${options.limit}
  `)

  return data.rows;
}

const findUserByEmail = async (email) => {
  const data = await pool.query(`SELECT * FROM "tblUsers" WHERE "email"='${email}'`)

  return data.rows[0];
}

const createUser = async (email, password, name, phoneNumber, role) => {
  console.log('role', role)
  console.log('query', `INSERT INTO "tblUsers" ("email", "password", "name", "phoneNumber", "role") VALUES ('${email}', '${password}', '${name}', '${phoneNumber}', '${role}')`)
  return pool.query(`INSERT INTO "tblUsers" ("email", "password", "name", "phoneNumber", "role") VALUES ('${email}', '${password}', '${name}', '${phoneNumber}', '${role}')`)
}


export {
  findUserByEmail,
  createUser,
  getList
}
