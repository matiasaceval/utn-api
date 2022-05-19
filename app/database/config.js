const { MDB_CALENDAR_NAME, MDB_USERS_NAME, MDB_USER, MDB_PASSWORD, PORT } = process.env

const URI = process.env.MDB_URI.replace('<username>', MDB_USER).replace('<password>', MDB_PASSWORD)

const CALENDAR_URI = URI.replace('<dbname>', MDB_CALENDAR_NAME)
const USER_URI = URI.replace('<dbname>', MDB_USERS_NAME)

module.exports = {
    port: PORT || 8080,
    calendarURI: CALENDAR_URI,
    userURI: USER_URI
}
