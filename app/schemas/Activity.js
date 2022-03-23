const { Schema } = require("mongoose");

// Dates follow the next fortmat --> mm/dd/yyyy
const activity = new Schema({
    activity: String,
    start: Date,
    end: Date,
});

module.exports = activity;
