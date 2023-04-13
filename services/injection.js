import { pool } from "./index.js"

const createItem = async (item) => {
    return pool.query(`
      INSERT INTO "tblInjectionRegisters" ("vaccineId", "userId", "injectionDay") 
      VALUES ('${item.vaccineId}', '${item.userId}', '${item.injectionDay}')
    `)
  }

const getList = async (options = {}) => {
  const data = await pool.query(`
    SELECT ir.*, v."name" as "vaccineName"
    FROM "tblInjectionRegisters" ir
    JOIN "tblVaccines" v
    ON ir."vaccineId" = v."id"
    WHERE ir."userId"='${options.userId}'
    ORDER BY ir."id" ASC
    OFFSET ${options.offset || 0}
    LIMIT ${options.limit || 20}
  `)

  return data.rows;
}

export {
    createItem,
    getList,
}  