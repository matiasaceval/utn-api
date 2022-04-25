const mongoose = require('mongoose')
const Config = require('./config')

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(Config.uri, options).catch((e) => console.log(e))

module.exports = mongoose
