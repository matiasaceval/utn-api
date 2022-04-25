const { Schema, model } = require('mongoose')

/**
 *
 * @exports app/schemas/Holiday.js
 *
 * Date is formatted in English: _MM/DD/YYYY_
 *
 * `Example 03/26/2022` _(March 26, 2022)_
 */
const holiday = new Schema({
    activity: String,
    category: String,
    start: Date,
    end: Date
})

const HolidayModel = model('holidays-2022', holiday)

module.exports = HolidayModel
