const { application } = require('express')
const express = require('express')

const app = express()
const port = 5000

app.get('/', (req, res) => res.send('Olá, mundo pelo express'))

app.listen(port, () => console.log('API rodando na porta 5000'))