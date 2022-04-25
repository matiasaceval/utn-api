/**
 * @exports app/services/calendar/dto.js
 * @param { Object } resource
 * @param { Date } [date]
 * @returns { Object }
 */
const getNextHolidays = (resource, date = Date.now()) => {
    const nextHolidays = resource
        .filter((holiday) => new Date(holiday.start) >= date)
        .sort(function (a, b) {
            return new Date(a.start) - new Date(b.start)
        })
    return nextHolidays
}

/**
 * @exports app/services/calendar/dto.js
 * @param { Object } resource
 * @param { Date } [date]
 * @returns { Object }
 */
const getNextActivities = (resource, date = Date.now()) => {
    const nextActivities = resource
        .filter((activity) => new Date(activity.start) >= date)
        .sort(function (a, b) {
            return new Date(a.start) - new Date(b.start)
        })
    return nextActivities
}

/**
 * @exports app/services/calendar/dto.js
 * @param { Object } resource
 * @param { Date } [date]
 * @returns { Object }
 */
const getNextHoliday = (resource, date = Date.now()) => {
    return getNextHolidays(resource, date)[0]
}

/**
 * @exports app/services/calendar/dto.js
 * @param { Object } resource
 * @param { Date } [date]
 * @returns { Object }
 */
const getNextActivity = (resource, date = Date.now()) => {
    return getNextActivities(resource, date)[0]
}

module.exports = {
    getNextHoliday,
    getNextHolidays,
    getNextActivities,
    getNextActivity
}
