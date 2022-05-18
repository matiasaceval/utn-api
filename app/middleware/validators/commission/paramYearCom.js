const status = require('../../../utils/status')
const isUndefined = require('../../../utils/isUndefined')

module.exports = async (req, res, next) => {

    let paramYear = req.params.year
    let paramCom = req.params.com
    
    if(isUndefined(paramYear) || isUndefined(paramCom)) return status.BAD_REQUEST(res)
    
    paramYear = parseInt(paramYear)
    paramCom = parseInt(paramCom)
    if (isNaN(paramYear) || isNaN(paramCom)) return status.BAD_REQUEST(res, 'invalid parameters')

    req.params.year = paramYear
    req.params.com = paramCom
    next()

}