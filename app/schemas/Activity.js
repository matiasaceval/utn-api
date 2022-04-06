const { Schema, model } = require('mongoose')

/**
 *
 * @exports app/schemas/Activity.js
 * Date is formatted in English: MM/DD/YYYY
 * @example 03/26/2022 (March 26, 2022)
 */
const activity = new Schema({
    activity: String,
    start: Date,
    end: Date
})

const ActivityModel = model(`activity-${new Date().getUTCFullYear()}`, activity)

module.exports = ActivityModel
