/** @description Importa conexão com banco de dados */
const dbConnection = require('../../config/database')

function speech() {}

/**
 * @description SQL para adicionar palestras
 * @param {String} theme 
 * @param {Int} trackId 
 * @param {Function} callback 
 */
speech.prototype.add = function(theme, trackId, callback) {    
    const sql = `INSERT INTO conferences.speechs (theme, trackId) VALUES (?, ?)`

    dbConnection.query(sql, [theme, trackId], callback)
}

/**
 * @description SQL para listar palestras de uma determinada track
 * @param {Int} trackId 
 * @param {Function} callback 
 */
speech.prototype.list = function(trackId, callback) {
    const sql = `SELECT theme FROM conferences.speechs WHERE trackId = ?`

    dbConnection.query(sql, [trackId], callback)
}

/**
 * @description Apaga todos os dados de speechs
 * @param {Function} callback 
 */
speech.prototype.delete = function(callback) {
    const sql = `TRUNCATE TABLE conferences.speechs`

    dbConnection.query(sql, callback)
}

module.exports = function() {
    return speech
}