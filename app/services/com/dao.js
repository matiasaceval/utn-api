const { calendarConn } = require('mongoose')
const subjectScheme = require('../../schemas/Subject')
const getListOfCommissions = require('./utils/getListOfCommissions')

/**
 *
 * @exports app/services/com/dao.js
 * @param { String } year
 * @param { String } numberCommission
 * @return { Object | undefined } get all the names of a commission's subjects
 */

const getSubjectsFromCom = async (collection) => {

    const listOfCommissions = await getListOfCommissions()
    if (listOfCommissions.find((s) => s === collection)) {
        const subjectModel = calendarConn.model(collection, subjectScheme)

        return subjectModel.find().select('-__v -_id').sort({ subject: 'asc'})
    }
}

/** 
 *
 * @exports app/services/com/dao.js
 * @param { String } collectionName format: Y-comX, example:  1-com1   2-com3
 * @param { Object } obj
 */
const createSubject = (collectionName, obj) => {
    const SubjectModel = calendarConn.model(collectionName, subjectScheme)
    const event = new SubjectModel(obj)

    event.save()
}

const updateDocumentBySubject = async (collection, filter, obj) => {
    
    const listOfCommissions = await getListOfCommissions()
    if (listOfCommissions.find((s) => s === collection)) {
        const subjectModel = calendarConn.model(collection, subjectScheme)

        Object.keys(filter).forEach((key) => {
            if (filter[key] === undefined) {
                delete filter[key]
            }
        })
        
        return subjectModel.findOneAndUpdate(filter, obj, { new: true }).select('-__v -_id')
    }
}

const deleteDocumentBySubject = async (collection, filter) => {
    
    const listOfCommissions = await getListOfCommissions()
    if (listOfCommissions.find((s) => s === collection)) {
        const subjectModel = calendarConn.model(collection, subjectScheme)

        Object.keys(filter).forEach((key) => {
            if (filter[key] === undefined) {
                delete filter[key]
            }
        })

        return subjectModel.findOneAndRemove(filter).select('-__v -_id')
    }
}

const createCommission = async (collection) => {
    const listOfCommissions = await getListOfCommissions()
    if (listOfCommissions.find((s) => s === collection)) return
    calendarConn.createCollection(collection)
    return collection
}

const deleteCommission = async (collection) => {
    const listOfCommissions = await getListOfCommissions()
    if (listOfCommissions.find((s) => s === collection)){
        calendarConn.collection(collection).drop()
        return collection
    }
}

module.exports = {
    getSubjectsFromCom,
    createSubject,
    updateDocumentBySubject,
    deleteDocumentBySubject,
    createCommission,
    deleteCommission
}
