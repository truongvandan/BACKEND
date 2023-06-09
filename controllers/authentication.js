import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { createUser, findUserByEmail } from '../services/user.js'

const login = async (request, response) => {
    const { email, password } = request.body;

    try {
        // Check email exist
        const user = await findUserByEmail(email)

        if (!user) {
            response.status(400).send({
                message: "Không tìm thấy tài khoản"
            })

            return
        }

        const passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        )

        if (!passwordIsValid) {
            return response.status(403).send({
                message: "Mật khẩu không đúng"
            })
        }

        const token = jwt.sign(
            {
                email: user.email,
                role: user.role
            },
            'key',
            {
              expiresIn: "48h"
            }
        )

        response.status(200).json({
            token: token,
            profile: {
                email: user.email,
                name: user.name,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        })
    } catch(err) {
        console.log(err)
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
}

const register = async (request, response) => {
    const { email, password, name, phoneNumber, address, birthday } = request.body;

    try {
        // Check duplicate email
        const user = await findUserByEmail(email);
        if (user) {
            response.status(400).send({
                message: "Tài khoản đã tồn tại"
            });

            return
        }

        const encryptPassword = bcrypt.hashSync(password, 8)

        const data = await createUser(email, encryptPassword, name, phoneNumber, address, birthday, "user");

        response.status(200).json({data: data})
    } catch(err) {
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
}

export {
    login,
    register
}

