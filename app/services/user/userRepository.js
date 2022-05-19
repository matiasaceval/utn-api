const UserModel = require('../../schemas/User')

const getUserByUsername = (username) => {
    return UserModel.findOne({ username })
}

const getUserById = (userID) => {
    return UserModel.findById(userID)
}

const createUser = (user) => {
    const event = new UserModel({
        name: user.name,
        username: user.username,
        password: user.password,
        role: user.role
    })

    event.save()
}

const updateUserByUsername = (username, user) => {
    return UserModel.findOneAndUpdate({ username: username }, user, { new: true }).select('-__v -_id -password')
}

const deleteUserByUsername = (username) => {
    return UserModel.findOneAndRemove(username).select('-__v -_id')
}

module.exports = {
    getUserByUsername,
    getUserById,
    createUser,
    deleteUserByUsername,
    updateUserByUsername
}
