const UserModel = require('../../schemas/User')

const getAllUsers = () => {
    return UserModel.find().select('-__v -_id -password').sort({ name: 'asc' })
}

const getUserByEmailForLogin = (email) => {
    return UserModel.findOne({ email })
}

const getUserById = (id) => {
    return UserModel.findById(id)
}

const getUserByEmail = (email) => {
    return UserModel.findOne({ email }).select('-__v -_id -password')
}

const createUser = async (user) => {
    const event = new UserModel({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
    })

    return new Promise((resolve, reject) => {
        event.save((err) => {
            if (err) return reject(err)

            return resolve(true)
        })
    })
}

const updateUserByEmail = (email, user) => {
    return UserModel.findOneAndUpdate({ email: email }, user, { new: true }).select('-__v -_id -password')
}

const deleteUserByEmail = (email) => {
    return UserModel.findOneAndRemove(email).select('-__v -_id')
}

module.exports = {
    getUserByEmailForLogin,
    getUserByEmail,
    createUser,
    deleteUserByEmail,
    updateUserByEmail,
    getAllUsers,
    getUserById
}
