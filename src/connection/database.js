/* ⬇️    Imports    ⬇️ */
const { mongoose } = require("mongoose");
const Config = require("../config/config.js");

/* 🛠️    Settings    🛠️ */
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

/* 🌐    Connection    🌐 */
mongoose.connect(Config.uri, options).catch(e => console.log(e))

/* ⬆️    Export    ⬆️ */
module.mongoose = mongoose;

