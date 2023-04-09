import { getList, create } from '../services/vaccine.js';

const getVaccines = async (request, response) => {
    const data = await getList()

    response.status(200).json(data)
}

const createVaccine = async (request, response) => {
    const item = request.body;

    try {
        const data = await create(item)

        response.status(200).json(data)
    } catch(err) {
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
}

export {
    getVaccines,
    createVaccine
}

