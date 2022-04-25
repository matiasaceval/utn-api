const calendarDAO = require('./dao')

module.exports = {
    getAllActivities() {
        return calendarDAO.getAllActivities()
    },

    getAllHolidays() {
        return calendarDAO.getAllHolidays()
    },

    createActivity(activity, start, end = start) {
        return calendarDAO.createActivity(activity, start, end)
    },

    createHoliday(activity, category, start, end = start) {
        return calendarDAO.createHoliday(activity, category, start, end)
    }
}
