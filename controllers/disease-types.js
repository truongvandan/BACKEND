import { getList } from "../services/disease-types.js"

const getDiseaseTypes = async (request, response) => {
    const data = await getList()

    response.status(200).json(data)
}

export {
    getDiseaseTypes
}