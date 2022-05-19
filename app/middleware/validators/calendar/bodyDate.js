const status = require('../../../utils/status')
const isUndefined = require('../../../utils/isUndefined')
const isValidDate = require('../../../services/calendar/utils/isValidDate')

const validatorBodyDate = (req, res, next) => {
    let { start, end } = req.body

    if (!isUndefined(start)) {
        start = start.trim()
        if (!isValidDate(start)) return status.BAD_REQUEST(res)

        req.body.start = start
    }

    if (!isUndefined(end)) {
        end = end.trim()
        if (!isValidDate(end)) return status.BAD_REQUEST(res)

        req.body.end = start
    }

    next()
}

module.exports = validatorBodyDate
