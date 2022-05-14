const mongoose = require('mongoose')
const Config = require('./config')

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.calendarConn = mongoose.createConnection(Config.calendarURI, options)
mongoose.usersConn = mongoose.createConnection(Config.userURI, options)

module.exports = mongoose
