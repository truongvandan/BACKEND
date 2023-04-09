import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { login, register } from './controllers/authentication.js'
import { getVaccines, createVaccine } from './controllers/vaccines.js'

const app = express()
const port = 3000

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/vaccines', getVaccines);

app.post('/vaccines/create', createVaccine);

app.post('/login', login)

app.post('/register', register)

app.listen(port, () => console.log(`Application running on localhost port ${port}!`))