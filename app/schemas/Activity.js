const { Schema, model } = require('mongoose')

/**
 *
 * @exports app/schemas/Activity.js
 *
 * Date is formatted in English: _MM/DD/YYYY_
 *
 * `Example 03/26/2022` _(March 26, 2022)_
 */
const activity = new Schema({
    activity: String,
    start: Date,
    end: Date
})

const ActivityModel = model(`activity-${new Date().getUTCFullYear()}`, activity)

module.exports = ActivityModel
