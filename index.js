import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { login, register } from './controllers/authentication.js'
import { getVaccines, getVaccine, createVaccine, updateVaccine, deleteVaccine } from './controllers/vaccines.js'

const app = express()
const port = 3000

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.get('/vaccines', getVaccines)
app.get('/vaccines/:id', getVaccine)
app.post('/vaccines/create', createVaccine)
app.put('/vaccines/update/:id', updateVaccine)
app.delete('/vaccines/:id', deleteVaccine)

app.post('/login', login)

app.post('/register', register)

app.listen(port, () => console.log(`Application running on localhost port ${port}!`))
