const comModel = require('../services/com/model')
const commissionDTO = require('../services/com/dto')
const status = require('../utils/error')
const isUndefined = require('../utils/isUndefined')
const validateQuery = require('../services/com/utils/validateQueryCommission')

/**
 *
 * @exports app/controllers/commission.js
 * @param { * } req
 * @param { * } res
 * @returns { * } json
 */

const getCommission = async (req, res) => {
    const paramYear = parseInt(req.params.year)
    const paramCom = parseInt(req.params.com)
    const queries = req.query

    if (isNaN(paramYear) || isNaN(paramCom)) {
        return status.BAD_REQUEST(res)
    }

    const commission = await comModel.getSubjectsFromCom(paramCom, paramYear)
    if (isUndefined(commission)) return status.NOT_FOUND(res)

    const validation = validateQuery(queries)
    if (isUndefined(validation)) return res.json(commission)

    const subject = commissionDTO[validation](commission, queries)
    if (isUndefined(subject)) return status.NOT_FOUND(res)

    return res.json(subject)
}

module.exports = getCommission
