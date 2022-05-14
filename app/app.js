const express = require('express')
const Config = require('./database/config')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const root = path.resolve(__dirname, '..')

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.disable('x-powered-by')
app.set('port', Config.port)
app.set('json spaces', 2)

app.use(require('./middleware/cors'))

/*    Index Redirects to docsify UI    */
app.get('/', (req, res) => {
    res.redirect(301, 'docs')
})

/*     Docsify     */
app.use(require('./middleware/docsifyHeaders.js'))
app.use(express.static(path.join(root, 'docsify'))) // serve static
app.use('/docs', require('./routes/docsify.js'))

/*     API     */
app.use(require('./middleware/apiHeaders.js'))
app.use(express.urlencoded({ extended: false }))

app.use('/api/commission', require('./routes/commission.js'))
app.use('/api/calendar', require('./routes/calendar.js'))
app.use('/api/login', require('./routes/login.js'))
app.use('/api', require('./routes/404.js'))

/*     Invalid Frontend Routes     */
app.use(require('./routes/404.js'))

module.exports = app
