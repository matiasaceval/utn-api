const { Schema } = require("mongoose");

/**
 * 
 * @exports app/schemas/Commission.js
 * Date is formatted in English: MM/DD/YYYY
 * @example 03/26/2022 (March 26, 2022)
 */
const commission = new Schema({
    subject: String,
    zoom: String,
    timetable: {
        monday: String,
        tuesday: String,
        wednesday: String,
        thursday: String,
        friday: String,
    },
    exam: {
        first: {
            date: Date,
            time: String,
        },
        second: {
            date: Date,
            time: String,
        },
    },
    recuperatory: {
        first: {
            date: Date,
            time: String,
        },
        second: {
            date: Date,
            time: String,
        },
    },
});


module.exports = commission;



