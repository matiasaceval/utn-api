const { Schema } = require("mongoose");

const schema = new Schema({
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

module.exports = schema;



