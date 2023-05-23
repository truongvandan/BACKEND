import { createItem, getListForUser, updateItem, deleteItem, getItemById } from '../services/injection-register.js';


const injectionRegister = async (request, response) => {
    const item = request.body;
    const currentUser = request.user;

    try {
        const data = await createItem({
            ...item,
            userId: currentUser.id
        })

        response.status(200).json(data)
    } catch(err) {
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
}

const getInjectionRegisters = async (request, response) => {
    const currentUser = request.user;

    let {page, limit} = request.query

    page = page ? page - 1 : 0
    limit = limit || 10
    
    const data = await getListForUser({
        userId: currentUser.id,
        offset: page * limit,
        limit
    })

    response.status(200).json(data)
}

const updateInjectionRegister = async (request, response) => {
    const id = request.params.id
    const item = request.body

    try {
        const data = await updateItem({
            ...item,
            id,
        })

        response.status(200).json(data)
    } catch(err) {
        console.log(err)
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
}

const getInjectionRegister = async (request, response) => {
    const id = request.params.id

    const data = await getItemById(id)

    response.status(200).json(data)
}

const deleteInjectionRegister = async (request, response) => {
    const id = request.params.id

    try {
        const data = await deleteItem(id)

        response.status(200).json(data)
    } catch(err) {
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
}

export {
    injectionRegister,
    getInjectionRegisters,
    updateInjectionRegister,
    getInjectionRegister,
    deleteInjectionRegister,
}

