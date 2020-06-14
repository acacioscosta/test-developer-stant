/**
 * @description Importa lib mysql
 * @description Importa configurações de conexão do banco de dados
 */
const mysql = require('mysql')
const { host, user, password, db_port, database } = require('../config.json')

/**
 * @description cria conexão com banco de dados
 */
const connection = mysql.createConnection({
    host,
    user,
    password,
    port: db_port || 3306,
    database
})

module.exports = connection