const fs = require('fs')

module.exports.fileMounted = () => {

    // Ler o arquivo feito upload
    const data = fs.readFileSync('./uploads/proposals.txt', 'utf-8')
    
    // Quebra as linhas e salva no array lines
    let lines = data.split('\n')

    // Retira todas as linhas que possam estar vazias
    const linesWithoutEmpty = lines.filter(e => { return e })

    // Acumulador de horas
    let totalTime = 0

    /**
     * @description Quebra a string pelos espaços
     * @description Remove o prefixo 'min' da última string
     * @description Acumula o total de horas
     * @description Monta JSON com Tema, Tempo e Usado
     * @returns {Array}
     */
    const speechs = linesWithoutEmpty.map(line => {
        
        const parts = line.split(' ')
        
        const time = parts.pop().replace('min', '')

        totalTime += time === 'lightning'
            ? 5
            : parseInt(time)

        return { theme: parts.join(' '), time, used: false }
        
    })

    /**
     * @description Retorna estrutura com tempo total
     * @returns {JSON}
     */
    return { speechs, totalTime }

}