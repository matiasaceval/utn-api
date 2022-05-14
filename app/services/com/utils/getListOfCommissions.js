const { calendarConn } = require('mongoose')

/**
 * @exports app/services/com/utils/getListOfCommissions.js
 * @return { Object } commission's names
 */
module.exports = async () => {
    const commissionsCollections = await calendarConn.db
        .listCollections({}, { nameOnly: true })
        .toArray()

    const validCommisionsCollections = commissionsCollections
        .map((n) => n.name)
        .filter((n) => n.includes('com'))

    return validCommisionsCollections
}
