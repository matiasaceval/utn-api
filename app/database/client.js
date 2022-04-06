/* ⬇️    Imports    ⬇️ */
const mongoose = require('mongoose')
const Config = require('./config')

/* 🛠️    Settings    🛠️ */
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

/* 🌐    Connection    🌐 */
mongoose.connect(Config.uri, options).catch((e) => console.log(e))
// mongoose.connection.close()

/* ⬆️    Export    ⬆️ */
module.exports = mongoose
