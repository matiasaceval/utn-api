const calendarDAO = require('./dao')

module.exports = {
    getAllActivities() {
        return calendarDAO.getAllActivities()
    },

    getAllHolidays() {
        return calendarDAO.getAllHolidays()
    },

    createActivity(activity, start, end = start) {
        calendarDAO.createActivity(activity, start, end)
    },

    createHoliday(activity, category, start, end = start) {
        calendarDAO.createHoliday(activity, category, start, end)
    },

    deleteActivityByName(activityName) {
        return calendarDAO.deleteActivityByName(activityName)
    },
    deleteHolidayByName(holidayName) {
        return calendarDAO.deleteHolidayByName(holidayName)
    },

    updateActivityByName(activityName, newActivity) {
        return calendarDAO.updateActivityByName(activityName, newActivity)
    },
    updateHolidayByName(holidayName, newHoliday) {
        return calendarDAO.updateHolidayByName(holidayName, newHoliday)
    }
}
