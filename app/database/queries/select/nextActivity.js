const { model } = require('mongoose');

//* Database Scheme
const Activity = require('../../../schemas/Activity');


//* Database Model
const ActivityModel = model(`activity-2022`, Activity);

const getTimeInterval = require("../../../utils/getTimeInterval.js")


//* Name Function : getNextActivity()
module.exports = async (currentDate = Date.now()) => {

    const date = getTimeInterval(currentDate);
    const filters = {
        start: {
            $gte: new Date(new Date(date.startDate).setHours(00, 00, 00)),
            $lte: new Date(new Date(date.endDate).setHours(00, 00, 00))
        }
    };

    const res = (await ActivityModel.find(filters).sort({ start: 1 }).limit(1))[0];
    return res;

}