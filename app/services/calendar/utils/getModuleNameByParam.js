const isUndefined = require('../../../utils/isUndefined')

/**
 * @exports app/services/calendar/utils/validateDate.js
 * @param { String } paramNext  param `/:next`
 * @param { String } reference  _activity/holiday_
 * @return { String }  functions names
 */
const getModuleNameByParam = (paramNext, reference) => {
    if (!isUndefined(paramNext)) return reference === 'activity' ? 'getNextActivity' : 'getNextHoliday'

    return reference === 'activity' ? 'getNextActivities' : 'getNextHolidays'
}

module.exports = getModuleNameByParam
