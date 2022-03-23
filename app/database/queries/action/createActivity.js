const { model } = require('mongoose');

//* Database Schemas 
const Activity = require('../../../schemas/Activity');

//* Database Models 
const ActivityModel = model(`activity-2022`, Activity);

//* Name Function : createActivity()
module.exports = async (activity, start, end = start) => {

    const event = new ActivityModel({
        activity: activity,
        start: new Date(start),
        end: new Date(end),
    });

    event.save().then((res) => {
        console.log("Registrado: ", activity);
    });
}
