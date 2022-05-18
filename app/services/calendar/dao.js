const ActivityModel = require('../../schemas/Activity')
const HolidayModel = require('../../schemas/Holiday')

/**
 * @exports app/services/calendar/dao.js
 * @return { Object } Return activity documents from db
 */
const getAllActivities =  () => {
    return ActivityModel.find().select('-__v -_id').sort({ start: 'asc'})
}
/**
 * @exports app/services/calendar/dao.js
 * @return { Object } Return holiday documents from db
 */
const getAllHolidays = () => {
    return HolidayModel.find().select('-__v -_id').sort({ start: 'asc'})
}

/**
 * @exports app/services/calendar/dao.js
 * @param { String } activity
 * @param { Date } start
 * @param { Date | undefined } [end]
 * @return { undefined }
 */
const createActivity = (activity, start, end = start) => {
    const event = new ActivityModel({
        activity: activity,
        start: new Date(start),
        end: new Date(end)
    })

    event.save()
}

/**
 * @exports app/services/calendar/dao.js
 * @param { String } activity
 * @param { String } category
 * @param { Date } start
 * @param { Date | undefined } [end]
 * @return { undefined }
 */
const createHoliday = (activity, category, start, end = start) => {
    const event = new HolidayModel({
        activity: activity,
        category: category,
        start: new Date(start),
        end: new Date(end)
    })

    event.save()
}
/**
 * @param { String } activityName
 **/
const deleteActivityByName = (activityName) => {
    return ActivityModel.findOneAndRemove({activity: activityName}).select('-__v -_id')
}

const deleteHolidayByName = (holidayName) => {
    return HolidayModel.findOneAndRemove({activity: holidayName}).select('-__v -_id')
}

const updateActivityByName = (oldActivityName, newActivity) => {
    
    return ActivityModel.findOneAndUpdate({ activity: oldActivityName }, newActivity, { new: true }).select('-__v -_id')
}

const updateHolidayByName = (oldHolidayName, newHoliday) => {
    
    return HolidayModel.findOneAndUpdate({ activity: oldHolidayName }, newHoliday, { new: true }).select('-__v -_id')
}


module.exports = {
    getAllActivities,
    getAllHolidays,
    createActivity,
    createHoliday,
    deleteActivityByName,
    deleteHolidayByName,
    updateActivityByName,
    updateHolidayByName
}
