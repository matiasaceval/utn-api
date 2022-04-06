const { Schema, model } = require('mongoose')

/**
 *
 * @exports app/schemas/Holiday.js
 * Date is formatted in English: MM/DD/YYYY
 * @example 03/26/2022 (March 26, 2022)
 */
const holiday = new Schema({
    activity: String,
    category: String,
    start: Date,
    end: Date
})

const HolidayModel = model('holidays-2022', holiday)

module.exports = HolidayModel
