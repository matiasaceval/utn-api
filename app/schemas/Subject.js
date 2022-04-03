const { Schema } = require("mongoose");

/**
 * 
 * @exports app/schemas/Subject.js
 * Date is formatted in English: MM/DD/YYYY
 * @example 03/26/2022 (March 26, 2022)
 */


const subject = new Schema({
    subject: String,
    zoom: String,
    teacher: {
        name: String,
        email: String
    },
    timetable: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
    },
    exam: {
        first: Date,
        second: Date,
    },
    recuperatory: {
        first: Date,
        second: Date,
    },
    extra: Array
});


module.exports = subject;



