const validateDate = require('../utils/validateDate.js');
const db = require("../database/db.js");

/**
 * 
 * 
 * @exports app/controllers/activity.js
 * @example "localhost:3000/activity"
 * @example "localhost:3000/activity?date=02/05/2022"
 * @param { * } req 
 * @param { * } res 
 * @returns { * } json 
 */
function getNextActivity(req, res){ return events(req,res,"nextActivity") }

/**
 * 
 * 
 * @exports app/controllers/activity.js
 * @example "localhost:3000/holiday"
 * @example "localhost:3000/holiday?date=08/14/2022"
 * @param { * } req 
 * @param { * } res 
 * @returns { * } json 
 */
function getNextHoliday(req, res){ return events(req,res,"nextHoliday") }

/**
 * 
 * 
 * @exports app/controllers/activity.js
 * @example "localhost:3000/current"
 * @example "localhost:3000/current?date=07/20/2022"
 * @param { * } req 
 * @param { * } res 
 * @returns { * } json 
 */
function getCurrentEvent(req, res){ return events(req, res, "currentEvent"); }

/**
 * 
 * 
 * @param { * } req 
 * @param { * } res 
 * @param { String } moduleName - keyname registered at db.js
 * @returns { * } json 
 */
async function events(req, res, moduleName){
    const now = new Date();
    const date = `${now.getMonth()+1}/${now.getDate()}/${now.getFullYear()}`;

    const param = !req.query.date ? date : req.query.date;
    const event = await db.Calendar.Select[moduleName](param);

    /**
     *  Error objects are just for testing, will'be added properly soon. 
     */

    let result = validateDate(param) ? event : { error: 400, message: "Bad Request" }; 
    return await res.json(result ? result : { error: 404, message: "Not Found" });
}

module.exports = {
    getNextActivity,
    getNextHoliday,
    getCurrentEvent
} 