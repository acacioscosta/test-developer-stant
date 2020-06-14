module.exports.delete = async (app, req, res) => {

    /**
     * @description Instância dos Model's Tracks e Speechs
     */
    const trackModel = new app.src.model.tracks()
    const speechModel = new app.src.model.speechs()

    /**
     * @description Apaga todos os dados das tabelas speech e track
     */
    try {        
        speechModel.delete()
        trackModel.delete()

        return res.status(200).json({ message: 'Dados removidos!' })
    } catch (error) {
        return res.status(500).json({ message: 'internalServerError' })
    }

}