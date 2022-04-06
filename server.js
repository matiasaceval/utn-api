/* ⬇️    Imports    ⬇️ */
require('dotenv').config()
require('./app/database/client')

const app = require('./app/app')

/* 🫀    Main    🫀 */
const server = app.listen(app.get('port'), () => {
    console.log('Server port on port: ', app.get('port'))
})

module.exports = { server, app }
