const ActivityModel = require("../../../schemas/Activity");

/**
 *
 * @exports app/database/queries-calendar/action/createActivity.js
 * @param { String } activity
 * @param { String } start of activity
 * @param { String } [end = start] of activity (optional)
 */
module.exports = async (activity, start, end = start) => {
    const event = new ActivityModel({
        activity: activity,
        start: new Date(start),
        end: new Date(end),
    });

    event.save().then((res) => {
        console.log("Registered: ", activity);
    });
};
