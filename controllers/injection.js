import { createItem, getList } from '../services/injection.js';


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
        console.log('err', err)
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
}

const getInjectionRegisters = async (request, response) => {
    const currentUser = request.user;
    const {page, limit} = request.query

    try {
        const data = await getList({
            userId: currentUser.id,
            offset: (page - 1) * limit,
            limit,
        })

        response.status(200).json(data)
    } catch(err) {
        console.log('err', err)
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
}

export {
    injectionRegister,
    getInjectionRegisters,
}

