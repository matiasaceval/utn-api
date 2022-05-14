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

        return subjectModel.find().select('-__v -_id')
    }
}

/**
 *
 * @exports app/services/com/dao.js
 * @param { String } commission format: Y-comX, example:  1-com1   2-com3
 * @param { Object } obj
 */
const createSubject = (commission, obj) => {
    const SubjectModel = calendarConn.model(commission, subjectScheme)
    const event = new SubjectModel({
        subject: obj.subject,
        code: obj.code,
        zoom: obj.zoom ? obj.zoom : null,
        teacher: {
            name: obj.teacher,
            email: obj.email ? obj.email : null
        },
        timetable: obj.timetable,
        exam: obj.exam,
        makeupExam: obj.makeupExam,
        extra: obj.extra ? obj.extra : null
    })

    event.save().then((_) => {
        console.log('Registered: ', obj.subject, commission)
    })
}

module.exports = {
    getSubjectsFromCom,
    createSubject
}
