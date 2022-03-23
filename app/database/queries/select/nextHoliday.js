const mongoose = require('mongoose');
const model = mongoose.model;

//* Database Scheme
const Holiday = require('../../../schemas/Holiday.js');

//* Database Model
const HolidayModel = model(`holidays-${new Date().getFullYear()}`, Holiday);

const getTimeInterval = require("../../../utils/getTimeInterval.js")

//* Name Function : getNextHoliday()
module.exports = async (currentDate = Date.now()) => {
    const date = getTimeInterval(currentDate);
    const filters = {
        start: {
            $gte: new Date(new Date(date.startDate).setHours(00, 00, 00)),
            $lte: new Date(new Date(date.endDate).setHours(00, 00, 00)),
        },
    };

    const res = (await HolidayModel.find(filters).sort({ start: 1 }).limit(1))[0];
    return res;
};