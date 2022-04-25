const calendarModel = require('../services/calendar/model')
const calendarDTO = require('../services/calendar/dto')
const getValidateParam = require('../services/calendar/utils/validateParam')
const isUndefined = require('../utils/isUndefined')
const status = require('../utils/error')
const isValidDate = require('../services/calendar/utils/isValidDate')

/**
 * @exports app/controllers/calendar
 * @param { * } req
 * @param { * } res
 * @returns { * } json
 */

const getActivities = async (req, res) => {
    const queryDate = req.query.date
    const paramNext = req.params.next

    const activities = await calendarModel.getAllActivities()
    if (isUndefined(activities)) return status.NOT_FOUND

    const validateParam = getValidateParam(paramNext, 'activity')

    let date = Date.now()
    if (!isUndefined(queryDate)) {
        if (!isValidDate(queryDate)) return status.BAD_REQUEST

        date = new Date(queryDate)
    }

    const nextActivityDTO = calendarDTO[validateParam](activities, date)
    return res.json(nextActivityDTO)
}

/**
 * @exports app/controllers/calendar
 * @param { * } req
 * @param { * } res
 * @returns { * } json
 */

const getHolidays = async (req, res) => {
    const queryDate = req.query.date
    const paramNext = req.params.next

    const holidays = await calendarModel.getAllHolidays()
    if (isUndefined(holidays)) return status.NOT_FOUND

    const validateParam = getValidateParam(paramNext, 'holiday')

    let date = Date.now()
    if (!isUndefined(queryDate)) {
        if (!isValidDate(queryDate)) return status.BAD_REQUEST

        date = new Date(queryDate)
    }

    const nextHolidayDTO = calendarDTO[validateParam](holidays, date)
    return res.json(nextHolidayDTO)
}

module.exports = {
    getHolidays,
    getActivities
}
