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

const getSubjectsFromCom = async (numCommission, year) => {
    const collection = `${year}-com${numCommission}`

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

    event.save().then((_) => {
        console.log('Registered: ', obj.subject, collectionName)
    })

}

module.exports = {
    getSubjectsFromCom,
    createSubject
}
