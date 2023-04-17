import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { login, register } from './controllers/authentication.js'
import { getUsers } from './controllers/user.js'
import { getDiseaseTypes } from './controllers/disease-types.js'
import { getVaccines, getVaccine, createVaccine, updateVaccine, deleteVaccine } from './controllers/vaccines.js'
import authMiddleware from './middlewares/auth.js'
import adminAuthMiddleware from './middlewares/admin-auth.js'
import { injectionRegister, getInjectionRegisters, getInjectionRegister, updateInjectionRegister, deleteInjectionRegister } from './controllers/injection-register.js'
import { getInjectionRegistersForAdmin } from './controllers/injections-management.js'

const app = express()
const port = process.env.APP_PORT || 80

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/vaccines', getVaccines)
app.get('/vaccines/:id', getVaccine)
app.get('/disease-types', getDiseaseTypes)

/**
 * API FOR ADMIN
 */
app.post('/vaccines', adminAuthMiddleware, createVaccine)
app.put('/vaccines/:id', adminAuthMiddleware, updateVaccine)
app.delete('/vaccines/:id', adminAuthMiddleware, deleteVaccine)
app.get('/users', adminAuthMiddleware, getUsers)
app.get('/injections-management', adminAuthMiddleware, getInjectionRegistersForAdmin)

/**
 * API FOR USER
 */
app.post('/injections-register', authMiddleware, injectionRegister)
app.get('/injections-register', authMiddleware, getInjectionRegisters)
app.get('/injections-register/:id', authMiddleware, getInjectionRegister)
app.put('/injections-register/:id', authMiddleware, updateInjectionRegister)
app.delete('/injections-register/:id', authMiddleware, deleteInjectionRegister)

app.post('/login', login)

app.post('/register', register)

app.listen(port, () => console.log(`Application running on localhost port ${port}!`))

