const isUndefined = require('../../../utils/isUndefined')

/**
 * @exports app/services/com/utils/getListOfCommissions.js
 * @param { Object } reference  _{ subject?, teacher? }_
 * @return { String }  functions names
 */
const validateQueryCommission = (query) => {
    if (!isUndefined(query.subject) && !isUndefined(query.teacher)) return 'getSubjectByTeacher'
    if (!isUndefined(query.subject)) return 'getSubject'
    if (!isUndefined(query.teacher)) return 'getTeacherSubjects'

    return undefined
}

module.exports = validateQueryCommission
