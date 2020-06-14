/** @description Importa conexão com banco de dados */
const dbConnection = require('../../config/database')

function track() {}

/**
 * @description SQL que adiciona uma track
 * @param {Function} callback 
 */
track.prototype.add = function(callback) {
    const sql = `INSERT INTO conferences.tracks VALUES (DEFAULT)`

    dbConnection.query(sql, callback)
}

/**
 * @description SQL que lista todas as tracks
 * @param {Function} callback 
 */
track.prototype.list = function(callback) {
    const sql = `SELECT * FROM conferences.tracks`

    dbConnection.query(sql, callback)
}

module.exports = function() {
    return track
}