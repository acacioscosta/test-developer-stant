module.exports.list = async (app, req, res) => {

    /**
     * @description Instância dos Model's Tracks e Speechs
     */
    const trackModel = new app.src.model.tracks()
    const speechModel = new app.src.model.speechs()

    /** @type {Array} Recebe as tracks */
    const tracks = []

    /** @description Serve para definir a identificação das tracks */
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    /**
     * @description Busca as tracks no banco de dados
     * @description Com as tracks, busca as palestras de suas respectivas tracks
     */
    trackModel.list(async (error, result) => {

        const getSpeechs = result.map((track, index) => {
            
            return new Promise((resolve, reject) => {
                speechModel.list(track.id, (error, result) => {
                    error
                        ? reject(error)
                        : resolve(tracks.push({ [`Track${alpha[index]}`]: result }))
                })
            })

        })

        await Promise.all(getSpeechs)

        return res.status(200).json(tracks)
    
    })    

}