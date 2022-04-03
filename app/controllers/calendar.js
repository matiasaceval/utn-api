const validateDate = require('../utils/validateDate.js');
const db = require("../database/db.js");

/**
 * 
 * 
 * @exports app/controllers/calendar.js
 * @param { * } req 
 * @param { * } res 
 * @returns { * } json 
 */
function getNextActivity(req, res) { return events(req, res, "nextActivity") }

/**
 * 
 * 
 * @exports app/controllers/calendar.js
 * @param { * } req 
 * @param { * } res 
 * @returns { * } json 
 */
function getNextHoliday(req, res) { return events(req, res, "nextHoliday") }

/**
 * 
 * 
 * @exports app/controllers/calendar.js
 * @param { * } req 
 * @param { * } res 
 * @returns { * } json 
 */
function getCurrentEvent(req, res) { return events(req, res, "currentEvent"); }

/**
 * 
 * 
 * @param { * } req 
 * @param { * } res 
 * @param { String } moduleName - keyname registered at db.js
 * @returns { * } json 
 */
async function events(req, res, moduleName) {
    const now = new Date();
    const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

    const param = !req.query.date ? date : req.query.date;

    /**
     *  Error objects are just for testing, will'be added properly soon. 
     */

    try {
        const isValid = validateDate(param);
        if (!isValid) return await res.status(400).send("Bad Request");
        const event = await db.Calendar.Select[moduleName](param);
        return event ? await res.json(event) : await res.status(404).send("Not Found")
    } catch (err) {
        return await res.status(400).send("Bad Request");
    }
}

module.exports = {
    getNextActivity,
    getNextHoliday,
    getCurrentEvent
}