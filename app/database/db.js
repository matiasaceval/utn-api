/**
 *
 * @exports app/database/db
 */
module.exports = {
    Calendar: {
        Action: {
            createActivity: require('./queries-calendar/action/createActivity'),
            createHoliday: require('./queries-calendar/action/createHoliday')
        },
        Select: {
            currentEvent: require('./queries-calendar/select/currentEvent'),
            nextActivity: require('./queries-calendar/select/nextActivity'),
            nextHoliday: require('./queries-calendar/select/nextHoliday')
        }
    },
    Commission: {
        Action: {
            createSubject: require('./queries-commission/action/createSubject')
        },
        Select: {
            getSubject: require('./queries-commission/select/getSubject'),
            getSubjectsFromCom: require('./queries-commission/select/getSubjectsFromCom')
        }
    }
}
