const { application } = require('express')
const express = require('express')

const add = express()
const port = 5000

application.listen(port, () => console.log('API rodando na porta 5000'))