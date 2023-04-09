import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getVacxin } from './services/vaccine.js'
import { createUser, findUserByEmail } from './services/user.js'

const app = express()
const port = 3000

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/vacxins', async (request, response) => {
    const data = await getVacxin()

    response.status(200).json(data)
})

app.post('/login', async (request, response) => {
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
                email: user.email
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
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
})

app.post('/register', async (request, response) => {
    const { email, password, name, phoneNumber } = request.body;

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

        const data = createUser(email, encryptPassword, name, phoneNumber);

        response.status(200).json({data: data})
    } catch(err) {
        response.status(500).send({message: 'Hệ thống xảy ra lỗi, vui lòng liên hệ quản trị viên'})
    }
})


app.listen(port, () => console.log(`Application running on localhost port ${port}!`))