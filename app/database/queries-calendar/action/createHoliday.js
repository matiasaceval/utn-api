const HolidayModel = require("../../../schemas/Holiday");

/**
 *
 * @exports app/database/queries-calendar/action/createHoliday.js
 * @param { String } activity
 * @param { String } category
 * @param { String } start of holiday
 * @param { String } [end = start] of holiday (optional)
 */
module.exports = async (activity, category, start, end = start) => {
    const event = new HolidayModel({
        activity: activity,
        category: category,
        start: new Date(start),
        end: new Date(end),
    });

    event.save().then((res) => {
        console.log("Registered: ", activity);
    });
};
