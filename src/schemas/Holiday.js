const { Schema } = require("mongoose");

const schema = new Schema({
    activity: String,
    category: String,
    start: Date,
    end: Date,
});

module.exports = schema;
