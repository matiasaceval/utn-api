const calendarModel = require('../services/calendar/model')
const calendarDTO = require('../services/calendar/dto')
const validateParam = require('../services/calendar/utils/validateParam')
const isUndefined = require('../utils/isUndefined')
const status = require('../utils/status')
const isValidDate = require('../services/calendar/utils/isValidDate')

/**
 * @exports app/controllers/calendar
 * @param { * } req
 * @param { * } res
 * @returns { * } json
 */

const getActivities = async (req, res) => {
    let queryDate = req.query.date
    let paramNext = req.params.next
    
    try {
        const activities = await calendarModel.getAllActivities()
        if (isUndefined(activities)) return status.NOT_FOUND(res)
       
        paramNext = !isUndefined(paramNext) ? paramNext.trim() : paramNext 
        const moduleName = validateParam(paramNext, 'activity')

        let date = Date.now()
        if (!isUndefined(queryDate)) {
            queryDate = queryDate.trim()
            if (!isValidDate(queryDate)) return status.BAD_REQUEST(res)
            
            date = new Date(queryDate)
        }

        const nextActivityDTO = calendarDTO[moduleName](activities, date)
        return res.json(nextActivityDTO)
    } catch (err) {
        console.error(err)
        return status.BAD_GATEWAY(res)
    }
}

/**
 * @exports app/controllers/calendar
 * @param { * } req
 * @param { * } res
 * @returns { * } json
 */

const getHolidays = async (req, res) => {
    let queryDate = req.query.date
    let paramNext = req.params.next

    try {
        const holidays = await calendarModel.getAllHolidays()
        if (isUndefined(holidays)) return status.NOT_FOUND(res)

        paramNext = !isUndefined(paramNext) ? paramNext.trim() : paramNext 
        const moduleName = validateParam(paramNext, 'holiday')

        let date = Date.now()
        if (!isUndefined(queryDate)) {
            queryDate = queryDate.trim()
            if (!isValidDate(queryDate)) return status.BAD_REQUEST(res)

            date = new Date(queryDate)
        }

        const nextHolidayDTO = calendarDTO[moduleName](holidays, date)
        return res.json(nextHolidayDTO)
    } catch (err) {
        console.error(err)
        return status.BAD_GATEWAY(res)
    }
}

const postActivity = (req, res) => {

    let { activity, start, end } = req.body

    if(isUndefined(activity) || isUndefined(start)) return status.BAD_REQUEST(res)
    activity = activity.trim()
    start = start.trim()

    if(!isValidDate(start)) return status.BAD_REQUEST(res)
    if(!isUndefined(end)) {
        end = end.trim()
        if(!isValidDate(end))
            return status.BAD_REQUEST(res)
    }
    
    calendarModel.createActivity(activity, start,  isUndefined(end) ? undefined : end)
    status.EVENT_CREATED(res, `Activity: ${activity} (${start}-${end || start})`)
}

const postHoliday = (req, res) => {

    let { activity, start, category, end } = req.body
    
    if(isUndefined(activity) || isUndefined(start) || isUndefined(category)) return status.BAD_REQUEST(res)
    activity = activity.trim()
    start = start.trim()
    category = category.trim()
    if(!isValidDate(start)) return status.BAD_REQUEST(res)
    if(!isUndefined(end)) {
        end = end.trim()
        if(!isValidDate(end))
            return status.BAD_REQUEST(res)
    }
    

    calendarModel.createHoliday(activity, category, start, isUndefined(end) ? undefined : end)
    status.EVENT_CREATED(res, `Holiday: ${activity} Category: ${category} (${start}-${end || start})`)
}

const deleteActivityByName = async (req, res) => {

    let activityName = req.query.name

    if(isUndefined(activityName)) return status.BAD_REQUEST(res)
    
    activityName = activityName.trim()
    const activityDeleted = await calendarModel.deleteActivityByName(activityName)
    if (isUndefined(activityDeleted)) return status.NOT_FOUND(res)

    status.EVENT_DELETED(res, `Activity: ${activityName} `)
}

const deleteHolidayByName = async (req, res) => {

    let holidayName = req.query.name

    if(isUndefined(holidayName)) return status.BAD_REQUEST(res)
    holidayName = holidayName.trim()
        
    const holidayDeleted = await calendarModel.deleteHolidayByName(holidayName)
    if (isUndefined(holidayDeleted)) return status.NOT_FOUND(res)

    status.EVENT_DELETED(res, `Holiday: ${holidayName} `)
}

module.exports = {
    getHolidays,
    getActivities,
    postActivity,
    postHoliday,
    deleteActivityByName,
    deleteHolidayByName,
}
