const status = require('../../../utils/status')
const isUndefined = require('../../../utils/isUndefined')
const getListOfCommissions = require('../../../services/com/utils/getListOfCommissions')

const validatorParamYearCom = async (req, res, next) => {

    let paramYear = req.params.year
    let paramCom = req.params.com
    
    if(isUndefined(paramYear) || isUndefined(paramCom)) return status.BAD_REQUEST(res)
    
    paramYear = parseInt(paramYear)
    paramCom = parseInt(paramCom)
    if (isNaN(paramYear) || isNaN(paramCom)) return status.BAD_REQUEST(res)
    
    const listOfCommissions = await getListOfCommissions()
    const years = []
    const coms = []

    for(const com of listOfCommissions){
        const y = parseInt(com.split('-')[0])
        const c = parseInt(com.split('com')[1])

        years.push(y)
        coms.push(c)
    }

    if(!years.includes(paramYear) || !coms.includes(paramCom)) return status.BAD_REQUEST(res)

    req.params.year = paramYear
    req.params.com = paramCom
    next()

}

module.exports = validatorParamYearCom