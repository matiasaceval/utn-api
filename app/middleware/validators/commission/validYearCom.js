const status = require('../../../utils/status')
const getListOfCommissions = require('../../../services/com/utils/getListOfCommissions')

module.exports = async (req, res, next) => {
    const paramYear = req.params.year
    const paramCom = req.params.com

    const listOfCommissions = await getListOfCommissions()
    const years = []
    const coms = []

    for (const com of listOfCommissions) {
        const y = parseInt(com.split('-')[0])
        const c = parseInt(com.split('com')[1])

        years.push(y)
        coms.push(c)
    }

    if (!years.includes(paramYear) || !coms.includes(paramCom))
        return status.BAD_REQUEST(res, 'invalid year or commission')

    next()
}
