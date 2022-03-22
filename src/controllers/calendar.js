const mongoose = require('mongoose');
const model = mongoose.model;

//* Database Schemes //
const Holiday = require('../schemas/Holiday');
const GeneralActivity = require('../schemas/GeneralActivity');

//* Database Models //
const HolidayModel = model(`holidays-${new Date().getFullYear()}`, Holiday);
const GeneralActivity = model(`generalActivity-${new Date().getFullYear()}`, GeneralActivity);


const getNextHoliday = async (date = Date.now()) => {
    const d = new Date(date);
    const day = d.getDate()
    const month = d.getMonth();
    const year = d.getFullYear();
    const startDate = new Date(year, month, day);
    const endDate = new Date(year + 1, month, 0);
    
    const filters = {
        start: {
            $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
            $lte: new Date(new Date(endDate).setHours(00, 00, 00)),
        },
    };
    
    const res = (await HolidayModel.find(filters).sort({ start: 1 }).limit(1))[0];
    return res;
};

async function createGeneralActivity(activity, start, end = start){

    const event = new GeneralActivity({
        activity: activity,
        start: new Date(start),
        end: new Date(end),
    });

    event.save().then((res) => {
        console.log(res);
        
    });
}

async function createHoliday(activity, category, start, end = start){
    const event = new HolidayModel({
        activity: activity,
        category: category,
        start: new Date(start),
        end: new Date(end),
    });

    event.save().then((res) => {
        console.log(res);
        
    });    
}

module.exports.getNextHoliday = getNextHoliday;