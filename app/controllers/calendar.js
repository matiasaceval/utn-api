const Repository = require('../services/calendar/calendarRepository')
const calendarDTO = require('../services/calendar/dto')
const getModuleNameByParam = require('../services/calendar/utils/getModuleNameByParam')
const isUndefined = require('../utils/isUndefined')
const status = require('../utils/status')

/**
 * @exports app/controllers/calendar
 * @param { * } req
 * @param { * } res
 * @returns { * } json
 */

const getActivities = async (req, res) => {
    const queryDate = req.query.date
    let paramNext = req.params.next

    try {
        const activities = await Repository.getAllActivities()
        if (isUndefined(activities)) return status.NOT_FOUND(res)

        paramNext = !isUndefined(paramNext) ? paramNext.trim() : paramNext
        const moduleName = getModuleNameByParam(paramNext, 'activity')

        const nextActivityDTO = calendarDTO[moduleName](activities, new Date(queryDate))
        return res.json(nextActivityDTO)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

/**
 * @exports app/controllers/calendar
 * @param { * } req
 * @param { * } res
 * @returns { * } json
 */

const getHolidays = async (req, res) => {
    const queryDate = req.query.date
    let paramNext = req.params.next

    try {
        const holidays = await Repository.getAllHolidays()
        if (isUndefined(holidays)) return status.NOT_FOUND(res)

        paramNext = !isUndefined(paramNext) ? paramNext.trim() : paramNext
        const moduleName = getModuleNameByParam(paramNext, 'holiday')

        const nextHolidayDTO = calendarDTO[moduleName](holidays, new Date(queryDate))
        return res.json(nextHolidayDTO)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const postActivity = (req, res) => {
    let { activity, start, end } = req.body

    if (isUndefined(activity) || isUndefined(start)) return status.BAD_REQUEST(res, 'activity and start must be specified')
    activity = activity.trim()

    try {
        Repository.createActivity(activity, start, isUndefined(end) ? undefined : end)
        const obj = {
            activity: activity,
            start: new Date(start),
            end: !isUndefined(end) ? new Date(end) : new Date(start)
        }
        status.EVENT_CREATED(res, obj)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const postHoliday = (req, res) => {
    let { holiday, start, category, end } = req.body

    if (isUndefined(holiday) || isUndefined(category) || isUndefined(start))
        return status.BAD_REQUEST(res, 'holiday, category and start must be specified')

    holiday = holiday.trim()
    category = category.trim()

    try {
        Repository.createHoliday(holiday, category, start, isUndefined(end) ? undefined : end)
        const obj = {
            holiday: holiday,
            category: category,
            start: new Date(start),
            end: !isUndefined(end) ? new Date(end) : new Date(start)
        }
        status.EVENT_CREATED(res, obj)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const putActivity = async (req, res) => {
    let { activity, start, end } = req.body
    let activityName = req.query.name

    if (isUndefined(activityName)) return status.BAD_REQUEST(res, 'activity must be specified by query')
    activityName = activityName.trim()

    activity = activity ? activity.trim() : activity

    const activityObj = {
        activity,
        start,
        end: end || start
    }

    const asArray = Object.entries(activityObj)
    const filtered = asArray.filter(([_, value]) => !isUndefined(value))
    if (isUndefined(filtered)) return status.BAD_REQUEST(res)

    const objectFiltered = Object.fromEntries(filtered)

    try {
        const activityUpdated = await Repository.updateActivityByName(activityName, objectFiltered)

        if (isUndefined(activityUpdated)) return status.NOT_FOUND(res)

        status.EVENT_UPDATED(res, activityUpdated)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const putHoliday = async (req, res) => {
    let { activity, category, start, end } = req.body
    let holidayName = req.query.name

    if (isUndefined(holidayName)) return status.BAD_REQUEST(res, 'holiday must be specified by query')
    holidayName = holidayName.trim()

    activity = activity ? activity.trim() : activity
    category = category ? category.trim() : category

    const holidayObj = {
        activity,
        category,
        start,
        end: end || start
    }

    const asArray = Object.entries(holidayObj)
    const filtered = asArray.filter(([_, value]) => !isUndefined(value))

    if (isUndefined(filtered)) return status.BAD_REQUEST(res)

    const objectFiltered = Object.fromEntries(filtered)

    try {
        const holidayUpdated = await Repository.updateHolidayByName(holidayName, objectFiltered)
        if (isUndefined(holidayUpdated)) return status.NOT_FOUND(res)

        status.EVENT_UPDATED(res, holidayUpdated)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const deleteActivityByName = async (req, res) => {
    let activityName = req.query.name

    if (isUndefined(activityName)) return status.BAD_REQUEST(res, 'activity must be specified by query')

    activityName = activityName.trim()

    try {
        const activityDeleted = await Repository.deleteActivityByName(activityName)
        if (isUndefined(activityDeleted)) return status.NOT_FOUND(res)

        status.EVENT_DELETED(res)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const deleteHolidayByName = async (req, res) => {
    let holidayName = req.query.name

    if (isUndefined(holidayName)) return status.BAD_REQUEST(res, 'holiday must be specified by query')
    holidayName = holidayName.trim()

    try {
        const holidayDeleted = await Repository.deleteHolidayByName(holidayName)
        if (isUndefined(holidayDeleted)) return status.NOT_FOUND(res)

        status.EVENT_DELETED(res)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

module.exports = {
    getHolidays,
    getActivities,
    postActivity,
    postHoliday,
    deleteActivityByName,
    deleteHolidayByName,
    putActivity,
    putHoliday
}
