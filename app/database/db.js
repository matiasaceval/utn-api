/**
 * 
 * @exports app/database/db.js
 */
module.exports = {
    Calendar:{
        Action: {
            createActivity: require('./queries-calendar/action/createActivity'),
            createHoliday: require("./queries-calendar/action/createHoliday")
        },
        Select: {
            currentEvent: require('./queries-calendar/select/currentEvent'),
            nextActivity: require('./queries-calendar/select/nextActivity'),
            nextHoliday: require('./queries-calendar/select/nextHoliday')
        }
    },
    Commission :{
        Action: {
            
        },
        Select: {
           
        }
    }
   
}

