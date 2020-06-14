// Lib para upload de arquivo
const multer = require('multer')

/**
 * @description Trata recebimento do arquivo
 * @description Define local para salvar
 */
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const parts = file.originalname.split('.')

        parts.pop() !== 'txt'
            ? callback(new Error('Arquivo inválido!'))
            : callback(null, 'uploads/')
    },

    filename: (req, file, callback) => {
        callback(null, 'proposals.txt')
    }
})

// Instância de multer
const upload = multer({ storage })

/**
 * @description Controle de rotas
 * @param {*} app 
 */
module.exports = app => {

    app.get('/', (req, res) => { return res.send('API Organização de Palestras') } )

    app.get('/tracks', (req, res) => app.src.controller.list.list(app, req, res) )

    app.post('/upload', upload.single('file'), (req, res) => {

        app.src.controller.add.save(app, req, res)

    })

}