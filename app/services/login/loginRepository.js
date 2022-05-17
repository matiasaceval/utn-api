const UserModel = require('../../schemas/User')

const getUserByUsername = (username) => {
    return UserModel.findOne({ username })
}

const getUserById = (userID) => {
    return UserModel.findById(userID)
}


module.exports = {
    getUserByUsername,
    getUserById
}