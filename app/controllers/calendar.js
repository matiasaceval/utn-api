const isValidDate = require('../utils/isValidDate')
const db = require('../database/db')

/**
 * @exports app/controllers/calendar
 * @param { * } req
 * @param { * } res
 * @returns { * } json
 */
const getNextActivity = async (req, res) => {
    return await events(req, res, 'nextActivity')
}

/**
 * @exports app/controllers/calendar.js
 * @param { * } req
 * @param { * } res
 * @returns { * } json
 */
const getNextHoliday = async (req, res) => {
    return await events(req, res, 'nextHoliday')
}

/**
 * @exports app/controllers/calendar.js
 * @param { * } req
 * @param { * } res
 * @returns { * } json
 */
const getCurrentEvent = async (req, res) => {
    return await events(req, res, 'currentEvent')
}

/**
 * @param { * } req
 * @param { * } res
 * @param { String } moduleName - keyname registered at db.js
 * @returns { * } json
 */
const events = async (req, res, moduleName) => {
    const now = new Date()
    const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`

    const param = !req.query.date ? date : req.query.date

    try {
        if (!isValidDate(param)) return res.status(400).send('Bad Request')

        const event = await db.Calendar.Select[moduleName](param)
        return event ? res.json(event) : res.status(404).send('Not Found')
    } catch (err) {
        return res.status(400).send('Bad Request')
    }
}

module.exports = {
    getNextActivity,
    getNextHoliday,
    getCurrentEvent
}
