const mongoose = require('mongoose')
const Config = require('./config')

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const connectionHandler = (collection) => (err, res) => {
    if (err) console.log(err)
    if (res) console.log(`${collection} connection setted.`)
}

mongoose.calendarConn = mongoose.createConnection(Config.calendarURI, options, connectionHandler('Calendar'))
mongoose.usersConn = mongoose.createConnection(Config.userURI, options, connectionHandler('User'))

module.exports = mongoose
