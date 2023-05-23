import { pool } from "./index.js"

const getList = async (options = {}) => {
  let whereClause = '';
  const searchText = options.search;

  if (searchText) {
    whereClause = `WHERE vaccine."name" ILIKE '%${searchText}%' OR diseaseType."name" ILIKE '%${searchText}%'`
  }

  const data = await pool.query(`
    SELECT vaccine.*
    FROM "tblVaccines" as vaccine
    JOIN "tblDiseaseType" as diseaseType
    ON vaccine."diseaseTypeId" = diseaseType."id"
    ${whereClause}
    ORDER BY id ASC
    OFFSET ${options.offset}
    LIMIT ${options.limit}
  `)

  return data.rows;
}

const getItemById = async (id) => {
  
  const data = await pool.query(`SELECT * FROM "tblVaccines" WHERE "id"='${id}'`)

  return data.rows[0];
}

const createItem = async (item) => {
  return pool.query(`
    INSERT INTO "tblVaccines" ("name", "image", "description", "object", "regimen", "price", "diseaseTypeId") 
    VALUES ('${item.name}', '${item.image}', '${item.description}', '${item.object}', '${item.regimen}', '${item.price}', '${item.diseaseTypeId}')
  `)
}

const updateItem = async (item) => {
  return pool.query(`
    UPDATE "tblVaccines"
    SET 
      "name"='${item.name}',
      "image"='${item.image}',
      "description"='${item.description}',
      "object"='${item.object}',
      "regimen"='${item.regimen}',
      "price"='${item.price}',
      "diseaseTypeId"='${item.diseaseTypeId}'
    WHERE "id"='${item.id}'
  `)
}

const deleteItem = async (id) => {
  return pool.query(`
    DELETE FROM "tblVaccines"
    WHERE "id"='${id}'
  `)
}

export {
  getList,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
}
