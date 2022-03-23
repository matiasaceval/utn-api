const { Schema } = require("mongoose");

// Dates follow the next fortmat --> mm/dd/yyyy
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



