const { model } = require('mongoose')
const subjectScheme = require('../../../schemas/Subject')

/**
 *
 * @exports app/database/queries-commission/select/getSubjectsFromCom.js
 * @param { String } year
 * @param { String } commission
 * @return { Object | undefined } get all the names of a commission's subjects
 */

module.exports = async (year, commission) => {
    const collection = `${year}-com${commission}`
    const subjectModel = model(collection, subjectScheme)
    const filters = {}

    const resultSubject = await subjectModel
        .find(filters)
        .select('subject -_id')
    return resultSubject
}
