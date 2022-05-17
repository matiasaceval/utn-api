const status = require('../../../utils/status')
const isUndefined = require('../../../utils/isUndefined')
const isValidDate = require('../../../services/calendar/utils/isValidDate')

const validatorQueryDate = (req, res, next) => {
    
    let queryDate = req.query.date

    if (!isUndefined(queryDate)) {
        queryDate = queryDate.trim()
        if (!isValidDate(queryDate)) return status.BAD_REQUEST(res)
        
        req.query.date = queryDate

    }else{
        req.query.date = Date.now()
    }
    
    next()
} 


module.exports = validatorQueryDate

