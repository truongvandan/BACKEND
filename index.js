import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getVacxin } from './services/Vacxin.js'

const app = express()
const port = 3000


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/vacxins', async (request, response) => {
    const data = await getVacxin()

    response.status(200).json(data)
})



app.listen(port, () => console.log(`Application running on localhost port ${port}!`))