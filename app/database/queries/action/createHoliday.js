const { model } = require('mongoose');


//* Database Scheme
const Holiday = require('../../../schemas/Holiday');

//* Database Model
const HolidayModel = model(`holidays-${new Date().getFullYear()}`, Holiday);

//* Name Function : createHoliday()
module.exports = async (activity, category, start, end = start) => {
    const event = new HolidayModel({
        activity: activity,
        category: category,
        start: new Date(start),
        end: new Date(end),
    });

    event.save().then((res) => {
        console.log("Registrado: ", activity);
    });
}