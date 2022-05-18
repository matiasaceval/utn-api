const comModel = require('../services/com/model')
const commissionDTO = require('../services/com/dto')
const status = require('../utils/status')
const isUndefined = require('../utils/isUndefined')
const getModuleNameByQuery = require('../services/com/utils/validateQueryCommission')
const { is } = require('express/lib/request')


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

        const collectionName = `${paramYear}-com${paramCom}`
        const commission = await comModel.getSubjectsFromCom(collectionName)
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

    const { objectComplete } = req.body
    
    if(isUndefined(objectComplete.subject) && isUndefined(objectComplete.code))
        return status.BAD_REQUEST(res, 'subject or code must be specified in body')

    const collectionName = `${paramYear}-com${paramCom}`
    try{

        comModel.createSubject(collectionName, objectComplete)
        res.json(objectComplete)

    }catch(err){
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const putSubject = async (req, res) => {
    const paramYear = req.params.year
    const paramCom = req.params.com
    const { subject, code } = req.query

    if (isUndefined(subject) && isUndefined(code))
        return status.BAD_REQUEST(res, 'subject or code must be specified by query')

    const { object } = req.body
    const collection = `${paramYear}-com${paramCom}`

    try {
        const documentUpdated = await comModel.updateDocumentBySubject(
            collection,
            { subject, code },
            object
        )
        if (isUndefined(documentUpdated)) return status.NOT_FOUND(res)

        res.json(documentUpdated)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const deleteSubject = async (req, res) => {
    const paramYear = req.params.year
    const paramCom = req.params.com
    const { subject, code } = req.query

    if (isUndefined(subject) && isUndefined(code))
        return status.BAD_REQUEST(res, 'subject or code must be specified by query')

    const collection = `${paramYear}-com${paramCom}`

    try {
        const documentDeleted = await comModel.deleteDocumentBySubject(collection, { subject, code })
        if (isUndefined(documentDeleted)) return status.NOT_FOUND(res)

        res.json(documentDeleted)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const postCommission = async (req, res) => {
    const paramYear = req.params.year
    const paramCom = req.params.com

    const collection = `${paramYear}-com${paramCom}`

    try {

        const posted = await comModel.createCommission(collection)
        if(isUndefined(posted)) return status.CONFLICT(res, `${collection} already exists`)

        res.json(posted)

    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}


module.exports = {
    getCommission,
    postSubject,
    putSubject,
    deleteSubject,
    postCommission
}
