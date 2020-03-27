const axios = require('axios')
const cheerio = require('cheerio')

const webScrapper = async () => {
    try {
        const coronaLink = 'https://www.worldometers.info/coronavirus/country/us/'
        const response = await axios.get(coronaLink)
        const $ = cheerio.load(response.data)

        const headerNames = ['states', 'totalCases', 'newCases', 'totalDeaths', 'newDeaths', 'activeCases']
        const coronaJSON = []
        $('#usa_table_countries_today > tbody:nth-child(2) > tr').each(function (rowIdx) {
            const dataItem = {}
            $(this).children().each(function (colIdx) {
                if (colIdx !== 6) {
                    dataItem[headerNames[colIdx]] = Number($(this).text().trim().replace(/\D/g, ''))
                }
            })
            coronaJSON.push(dataItem)
        })

        return coronaJSON
    } catch (err) {
        throw Error(err)
    }
}

module.exports = webScrapper