import { getList } from '../services/user.js';

const getUsers = async (request, response) => {
    let {page, limit, search} = request.query

    page = page ? page - 1 : 0
    limit = limit || 10
    
    const data = await getList({
        offset: page * limit,
        limit,
        search
    })

    response.status(200).json(data)
}

export {
    getUsers
}
