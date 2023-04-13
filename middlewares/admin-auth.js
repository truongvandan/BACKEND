import jwt from 'jsonwebtoken'
import { findUserByEmail } from '../services/user.js'

const adminAuthMiddleware = async(req, res, next) => {
    const authorization = req.header('Authorization')

    if (!authorization) {
        return res.status(401).send({ error: 'Không có quyền truy cập' })
    }

    const token = authorization.replace('Bearer ', '')
    const data = jwt.verify(token, 'key')

    try {
        const user = await findUserByEmail(data.email)
        if (user?.role !== 'admin') {
            res.status(401).send({ error: 'Không có quyền truy cập' })
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Không có quyền truy cập' })
    }

}
export default adminAuthMiddleware

