const express = require('express')
const bodyParser = require('body-parser')//middleware para transformar dados do corpo da requisição em obj

const userRoute = require('./routes/userRoutes')

const app = express()
const port = 5000

app.use(bodyParser.urlencoded({ extended: false }))//bodyparser chamado

userRoute(app)

app.get('/', (req, res) => res.send('Olá, mundo pelo express'))

app.listen(port, () => console.log('API rodando na porta 5000'))