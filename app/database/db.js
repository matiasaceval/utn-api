module.exports = {
    Action: {
        createActivity: require('./queries/action/createActivity'),
        createHoliday: require("./queries/action/createHoliday")
    },
    Select: {
        currentEvent: require('./queries/select/currentEvent'),
        nextActivity: require('./queries/select/nextActivity'),
        nextHoliday: require('./queries/select/nextHoliday')
    }
}

