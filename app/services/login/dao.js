const UserModel = require('../../schemas/User')

const getUserByUsername = async (username) => {
    return await UserModel.findOne({ username })
}

const getUserById = async (userID) => {
    return await UserModel.findById(userID)
}


module.exports = {
    getUserByUsername,
    getUserById
}