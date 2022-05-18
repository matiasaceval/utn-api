const comModel = require('../services/com/model')
const commissionDTO = require('../services/com/dto')
const status = require('../utils/status')
const isUndefined = require('../utils/isUndefined')
const getModuleNameByQuery = require('../services/com/utils/validateQueryCommission')


/**
 *
 * @exports app/controllers/commission.js
 * @param { * } req
 * @param { * } res
 * @returns { * } json
 */
const getCommission = async (req, res) => {
    const paramYear = req.params.year
    const paramCom = req.params.com
    const queries = req.query

    try {
        queries.subject = !isUndefined(queries.subject) ? queries.subject.trim() : undefined
        queries.teacher = !isUndefined(queries.teacher) ? queries.teacher.trim() : undefined
        
        const commission = await comModel.getSubjectsFromCom(
            paramCom,
            paramYear
        )
        if (isUndefined(commission)) return status.NOT_FOUND(res)

        const moduleName = getModuleNameByQuery(queries)
        if (isUndefined(moduleName)) return res.json(commission)
        
    
        const subject = commissionDTO[moduleName](commission, queries)
        if (isUndefined(subject)) return status.NOT_FOUND(res)

        return res.json(subject)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const postSubject = async (req, res) => {

    const paramYear = req.params.year
    const paramCom = req.params.com

    const { object } = req.body

    const collectionName = `${paramYear}-com${paramCom}`
    try{

        comModel.createSubject(collectionName, object)
        res.json(object)

    }catch(err){
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
    
}

module.exports = {
    getCommission,
    postSubject
}
