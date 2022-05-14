const userDAO = require('./dao')

module.exports = {
    getUserByUsername(username) {
        return userDAO.getUserByUsername(username)
    },

    getUserById(userID) {
        return userDAO.getUserById(userID)
    }
}