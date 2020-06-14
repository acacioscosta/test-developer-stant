/**
 * @description Importa lib's/framework's Express, Consign e Body-Parser
 */
const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

/** @description Instância do Express */
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/** @description Define configurações de Request/Response e etc. */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
    next()
})

/** @description Autoload dos arquivos da pasta src */
consign()
    .include('./src')
    .into(app)

module.exports = app