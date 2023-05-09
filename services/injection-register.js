import { pool } from "./index.js"

const createItem = async (item) => {
    console.log(`
      INSERT INTO "tblInjectionRegisters" ("vaccineId", "userId", "injectionDay") 
      VALUES (${item.vaccineId}, ${item.userId}, '${item.injectionDay}')
  `)

    return pool.query(`
      INSERT INTO "tblInjectionRegisters" ("vaccineId", "userId", "injectionDay") 
      VALUES (${item.vaccineId}, ${item.userId}, '${item.injectionDay}')
    `)
  }

const getListForUser = async (options = {}) => {
  const data = await pool.query(`
    SELECT ir.*, v."name" as "vaccineName"
    FROM "tblInjectionRegisters" ir
    JOIN "tblVaccines" v
    ON ir."vaccineId" = v."id"
    WHERE ir."userId"='${options.userId}'
    ORDER BY ir."id" ASC
    OFFSET ${options.offset}
    LIMIT ${options.limit}
  `)

  return data.rows;
}

const getListForAdmin = async (options = {}) => {
  let whereClause = '';
  const searchText = options.search;

  if (searchText) {
    whereClause = `WHERE u."name" ILIKE '%${searchText}%' OR u."email" ILIKE '%${searchText}%' OR u."phoneNumber" ILIKE '%${searchText}%'`
  }

  const data = await pool.query(`
    SELECT ir.*, v."name" as "vaccineName", u."email", u."phoneNumber", u."name"
    FROM "tblInjectionRegisters" ir
    JOIN "tblVaccines" v
    ON ir."vaccineId" = v."id"
    JOIN "tblUsers" u
    ON ir."userId" = u."id"
    ${whereClause}
    ORDER BY ir."id" ASC
    OFFSET ${options.offset || 0}
    LIMIT ${options.limit || 20}
  `)

  return data.rows;
}

const getItemById = async (id) => {
  const data = await pool.query(`
    SELECT ir.*, v."name" as "vaccineName"
    FROM "tblInjectionRegisters" ir
    JOIN "tblVaccines" v
    ON ir."vaccineId" = v."id"
    WHERE ir."id"='${id}'
  `)

  return data.rows[0];
}

const updateItem = async (item) => {
  const updateQueries = Object.keys(item).map((key) => `"${key}"='${item[key]}'`)

  return pool.query(`
    UPDATE "tblInjectionRegisters"
    SET 
      ${updateQueries.join(',')}
    WHERE "id"='${item.id}'
  `)
}

const deleteItem = async (id) => {
  return pool.query(`
    DELETE FROM "tblInjectionRegisters"
    WHERE "id"='${id}'
  `)
}

export {
    createItem,
    getListForUser,
    getListForAdmin,
    getItemById,
    updateItem,
    deleteItem,
}  