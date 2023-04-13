import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { login, register } from './controllers/authentication.js'
import { getUsers } from './controllers/user.js'
import { getDiseaseTypes } from './controllers/disease-types.js'
import { getVaccines, getVaccine, createVaccine, updateVaccine, deleteVaccine } from './controllers/vaccines.js'
import authMiddleware from './middlewares/auth.js'
import adminAuthMiddleware from './middlewares/admin-auth.js'
import { injectionRegister, getInjectionRegisters } from './controllers/injection.js'
import * as dotenv from 'dotenv'

dotenv.config()
console.log('env', JSON.stringify(process.env))
const app = express()
const port = process.env.PORT || 80

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/vaccines', getVaccines)
app.get('/vaccines/:id', getVaccine)
app.post('/vaccines', adminAuthMiddleware, createVaccine)
app.put('/vaccines/:id', adminAuthMiddleware, updateVaccine)
app.delete('/vaccines/:id', adminAuthMiddleware, deleteVaccine)
app.get('/users', adminAuthMiddleware, getUsers)

app.get('/disease-types', authMiddleware, getDiseaseTypes)
app.post('/injections', authMiddleware, injectionRegister)
app.get('/injections', authMiddleware, getInjectionRegisters)

app.post('/login', login)

app.post('/register', register)

app.listen(port, () => console.log(`Application running on localhost port ${port}!`))
