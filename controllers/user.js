import { getList } from '../services/user.js';

const getUsers = async (request, response) => {
    const data = await getList()

    response.status(200).json(data)
}

export {
    getUsers
}
