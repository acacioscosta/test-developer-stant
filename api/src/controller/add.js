/**
 * @description Importa função para leitura e montagem da estrutura dos dados
 * @description Importa lib moment para manipulação de tempo
 */
const { fileMounted } = require('../../utils/readFileAndMountStructure')
const moment = require('moment')

module.exports.save = (app, req, res) => {

    /**
     * @description Pega estrutura e total de tempo
     * @description Instância dos Model's Tracks e Speechs
     */
    let { speechs, totalTime } = fileMounted()
    const trackModel = new app.src.model.tracks()
    const speechModel = new app.src.model.speechs()

    /**
     * @description Total em minutos de uma track sem almoço e networking
     * @description Total em minutos de sessão da manhã 
     * @description Total em minutos de sessão da tarde
     * @description Hora de início da sessão da manhã
     * @description Hora de início da sessão da tarde
     */
    const totalTrackWithoutLunchAndNetworking = 360
    const totalSessionAM = 180
    const totalSessionPM = 240
    let startSessionAM = moment('09:00', 'HH:mm')
    let startSessionPM = moment('13:00', 'HH:mm')

    /**
     * @type {Array} Recebe as tracks
     * @type {Int} Calcula a quantidade de tracks de acordo com o tempo das palestras
     */
    let tracks = []
    const amountTracks = Math.trunc(totalTime / totalTrackWithoutLunchAndNetworking)
    
    /**
     * @description Monta a quantidade de tracks calculada anteriormente
     */
    for (i = 0; i < amountTracks; i++) {
    
        /**
         * @description Acumulador de horas da sessão da manhã
         * @description Acumulador de horas da sessão da tarde
         * @description Recebe as palestras para a sessão da manhã
         * @description Recebe as palestras para a sessão da tarde
         */
        let amountHourSessionAM = 0
        let amountHourSessionPM = 0
        let sessionAM = []
        let sessionPM = []
        
        /** @description Montagem das tracks */
        speechs.map((speech, index) => {

            const time = speech.time === 'lightning'
                ? 5
                : parseInt(speech.time)
            
            /**
             * @description Monta sessão da manhã de cada track
             * @description Não pode ser palestra lightning
             * @description Tema não pode já estar sendo usado
             * @description Soma do tempo atual com o acumulado deve ser menor ou igual a 180
             */
            if (speech.time !== 'lightning' && !speech.used && (time + amountHourSessionAM <= totalSessionAM)) {

                /** @description Verifica se o valor acumulado fica entre 150 e 180 */
                const condition = Boolean(time + amountHourSessionAM > 150 && time+amountHourSessionAM < 180)
                
                /**
                 * @description Apenas executa se valor for menor ou igual a 150
                 * @description Isso não deixa sobrar tempo até o almoço, já que cada sessão tem no mínimo 30 minutos
                 * @description Acumula o total de horas da sessão da manhã
                 * @description Salva a hora, a palestra e o tempo em minutos na sessão da manhã
                 * @description Altera a hora em que deve iniciar a próxima palestra da manhã
                 * @description Marca o item atual como usado
                 */
                if (!condition) {
                    amountHourSessionAM += time
                    sessionAM.push(`${startSessionAM.format('HH:mm')} ${speech.theme} (${speech.time}min)`)
                    startSessionAM.add(time, 'minutes').format('HH:mm')
                    speechs[index].used = true
                }

            }

            /**
             * @description Monta sessão da tarde de cada track
             * @description Tema não pode já estar sendo usado
             * @description Soma do tempo atual com o acumulado deve ser menor que 240
             */
            if (!speech.used && (time + amountHourSessionPM < totalSessionPM)) {
                
                /**
                 * @description Acumula o total de horas da sessão da tarde
                 * @description Salva a hora, a palestra e o tempo em minutos na sessão da tarde
                 * @description Altera a hora em que deve iniciar a próxima palestra da tarde
                 * @description Marca o item atual como usado
                 */
                amountHourSessionPM += time
                sessionPM.push(`${startSessionPM.format('HH:mm')} ${speech.theme} (${speech.time === 'lightning' ? 5 : speech.time}min)`)
                startSessionPM.add(time, 'minutes').format('HH:mm')
                speechs[index].used = true
                
            }

        })

        /**
         * @description Salva a track estruturada no array
         * @type {JSON} { Sessão da manhã, Almoço, Sessão da tarde, Networking }
         */
        tracks.push({
            sessionAM,
            lunch: "12:00 Almoço (60min)",
            sessionPM,
            networking: startSessionPM.format('HH:mm') + ' - ' + '17:00 Evento de Networking'
        })

        /**
         * @description Redefine os horários das sessões manhã e tarde para montar a próxima track
         */
        startSessionAM = moment('09:00', 'HH:mm')
        startSessionPM = moment('13:00', 'HH:mm')
    
    }

    /**
     * @description Salva as tracks com as palestras no banco de dados
     * @description Primeiro salva uma track
     * @description Salva todas as palestras da manhã com o id da última track
     * @description Salva o almoço
     * @description Salva todas as palestras da tarde com o id da última track
     * @description Salva networking
     */
    tracks.map(track => {

        try {
            trackModel.add((error, result) => {
                const { insertId } = result
                
                track.sessionAM.map(speech => speechModel.add(speech, insertId))
    
                speechModel.add(track.lunch, insertId)
    
                track.sessionPM.map(speech => speechModel.add(speech, insertId))
    
                speechModel.add(track.networking, insertId)    
            })
        } catch (error) {            
            return res.status(500).json({ message: 'internalServerError' })
        }
        

    })

    /**
     * @returns {JSON}
     */
    return res.status(200).json({ message: 'Arquivo enviado!' })
    
}