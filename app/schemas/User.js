const { Schema, usersConn } = require('mongoose')

/**
 *
 * @exports app/schemas/User.js
 *
 */
const user = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: String
})

const UserModel = usersConn.model('user', user)

module.exports = UserModel
