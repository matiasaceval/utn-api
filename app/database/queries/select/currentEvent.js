const { model } = require('mongoose');

//* Database Schemas 
const Holiday = require('../../../schemas/Holiday');
const Activity = require('../../../schemas/Activity');


//* Database Models 
const HolidayModel = model(`holidays-${new Date().getFullYear()}`, Holiday);
const ActivityModel = model(`activity-2022`, Activity);

//* Name Function :  getCurrentEvent()
module.exports = async (currentDate = Date.now()) => {
    currentDate = new Date(new Date(currentDate).setHours(00, 00, 00));
    const filters = {
        $and: [{ start: { $lte: currentDate } }, { end: { $gte: currentDate } }]
    };

    const resActivity = (await ActivityModel.find(filters).limit(1))[0];
    const resHoliday = (await HolidayModel.find(filters).limit(1))[0];

    return resActivity || resHoliday;
}

