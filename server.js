/* ⬇️    Imports    ⬇️ */
require('dotenv').config()
const MongoClient = require('./app/database/client')

const App = require('./app/app')

/* 🫀    Main    🫀 */
const Server = App.listen(App.get('port'), () => {
    console.log('Server port on port: ', App.get('port'))
})

const gracefulShutdown = () => {
    Server.close((e) => {
        console.log('Closing HTTP Server...')
        MongoClient.connection
            .close()
            .then(console.log('Connection with MongoClient closed.'))

        if (e) console.error(e)
        process.exit(e ? 1 : 0)
    })
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

module.exports = { Server, App }
