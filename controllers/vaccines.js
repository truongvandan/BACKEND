import { getList, createItem, getItemById, updateItem, deleteItem } from '../services/vaccine.js';

const getVaccines = async (request, response) => {
    const data = await getList()

    response.status(200).json(data)
}

const getVaccine = async (request, response) => {
    const id = request.params.id

    const data = await getItemById(id)

    response.status(200).json(data)
}

const createVaccine = async (request, response) => {
    const item = request.body;

    try {
        const data = await createItem(item)

        response.status(200).json(data)
    } catch(err) {
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
}

const updateVaccine = async (request, response) => {
    const id = request.params.id
    const item = request.body;
    const data = await getItemById(id)

    const updateData = {
        ...data,
        ...item,
    }

    try {
        const data = await updateItem(updateData)

        response.status(200).json(data)
    } catch(err) {
        console.log('update err', err)
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
}

const deleteVaccine = async (request, response) => {
    const id = request.params.id

    try {
        const data = await deleteItem(id)

        response.status(200).json(data)
    } catch(err) {
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
}

export {
    getVaccines,
    getVaccine,
    createVaccine,
    updateVaccine,
    deleteVaccine,
}

