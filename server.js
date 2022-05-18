require('dotenv').config()
const MongoClient = require('./app/database/client')

const App = require('./app/app')

const Server = App.listen(App.get('port'), () => {
    console.log('Server port on port: ', App.get('port'))
})

const gracefulShutdown = () => {
    Server.close((e) => {
        console.log('Closing HTTP Server...')
        MongoClient.calendarConn
            .close()
            .then(console.log('\'Calendar\' connection with MongoClient closed.'))
            .catch((e) => {
                console.log('\'Calendar\' connection with MongoClient failed in an attempt to close. ' + e)
            })
            
        MongoClient.usersConn
            .close()
            .then(console.log('\'Users\' connection with MongoClient closed.'))
            .catch((e) => {
                console.log('\'Users\' connection with MongoClient failed in an attempt to close. ' + e)
            })
    
        if (e) console.error(e)
        process.exit(e ? 1 : 0)
    })
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

module.exports = { Server, App }
