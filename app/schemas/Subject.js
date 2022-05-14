const { Schema } = require('mongoose')

/**
 *
 * @exports app/schemas/Subject.js
 *
 * Date is formatted in English: _MM/DD/YYYY_
 *
 * `Example 03/26/2022` _(March 26, 2022)_
 */

const subject = new Schema({
    subject: String,
    zoom: String,
    code: String,
    teacher: {
        name: String,
        email: String
    },
    timetable: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String
    },
    exam: {
        first: Date,
        second: Date
    },
    makeupExam: {
        first: Date,
        second: Date
    },
    extra: Array
})

module.exports = subject
