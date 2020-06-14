const server = require('./config/server')
const dbConnection = require('./config/database')
const { migrate, port } = require('./config.json')
const fs = require('fs')

server.listen(port || 3000, () => {

    /**
     * @description Cria banco de dados e tabelas
     * @property {migration}
     */
    if (migrate) {
        console.log('Creating Database conferences...')
        dbConnection.connect()
    
        let sql = "CREATE DATABASE IF NOT EXISTS `conferences` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */"
    
        dbConnection.query(sql, error => { if (error) throw error })

        console.log('Creating Table tracks...')
        sql = `
            CREATE TABLE IF NOT EXISTS conferences.tracks (
                id int(11) NOT NULL AUTO_INCREMENT,
                PRIMARY KEY (id),
                UNIQUE KEY id_UNIQUE (id)
          )
        `
        dbConnection.query(sql, error => { if (error) throw error })

        console.log('Creating Table speechs...')
        sql = `
            CREATE TABLE IF NOT EXISTS conferences.speechs (
                id int(11) NOT NULL AUTO_INCREMENT,
                theme varchar(255) NOT NULL,
                trackId int(11) NOT NULL,
                PRIMARY KEY (id),
                UNIQUE KEY id_UNIQUE (id)
          )        
        `
        dbConnection.query(sql, error => { if (error) throw error })

        console.log('Created!')
    }

    /**
     * @description verifica se existe o diretório uploads
     * @description Se não existir, cria
     */
    const dirUploadExist = fs.existsSync('./uploads')

    if (!dirUploadExist) fs.mkdirSync('./uploads')

    console.log(`Server ON at port ${port || 3000}`)
})