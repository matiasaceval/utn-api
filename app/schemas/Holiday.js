const { Schema } = require("mongoose");

// Dates follow the next fortmat --> mm/dd/yyyy
const holiday = new Schema({
    activity: String,
    category: String,
    start: Date,
    end: Date,
});

module.exports = holiday;
