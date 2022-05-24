const jwt = require('jsonwebtoken')
const status = require('../utils/status')
const userRepository = require('../services/user/userRepository')
const bcrypt = require('bcrypt')
const isUndefined = require('../utils/isUndefined')

const login = async (req, res) => {
    const { password } = req.body
    let { username } = req.body

    username = !isUndefined(username) ? username.trim() : undefined

    const user = await userRepository.getUserByUsername(username)

    const passwordCorrect = isUndefined(user) ? undefined : await bcrypt.compare(password, user.password)

    if (!user || !passwordCorrect) return status.INVALID_LOGIN(res)

    const userForToken = {
        id: user._id,
        username: user.username
    }

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
        // time in seconds

        expiresIn: 60 * parseInt(process.env.JWT_TIME_IN_MINUTES)
    })

    res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    })

    res.json({
        name: user.name,
        username: user.username,
        role: user.role
    })
}

const signUser = async (req, res) => {
    let { name, username, password, role } = req.body

    if (isUndefined(name) || isUndefined(username) || isUndefined(password)) return status.BAD_REQUEST(res, 'missing arguments')

    name = name.trim()
    username = username.trim()
    password = password.trim()
    role = !isUndefined(role) ? role.toLowerCase().trim() : 'user'

    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_SALT))
        await userRepository.createUser({
            name,
            username,
            password: hashedPassword,
            role
        })

        return status.EVENT_CREATED(res, { name, username, role })
    } catch (err) {
        if(err.code === 11000){
            console.error('Attempted to create \'' + err.keyValue.username + '\' but already exists')
            return status.CONFLICT(res, 'username already exists')
        }
        console.error(err)   
        return status.INTERNAL_SERVER_ERROR(res, err)
    }
}

const putUser = async (req, res) => {
    const { name, username, password, role } = req.body
    const usernameParam = req.params.username

    const userOBJ = {
        name,
        username,
        password,
        role
    }

    try {
        const userUpdated = await userRepository.updateUserByUsername(usernameParam, userOBJ)
        if (isUndefined(userUpdated)) return status.NOT_FOUND(res)

        return status.EVENT_UPDATED(res, userUpdated)
    } catch (err) {
        if (err.code === 11000) {
            console.error("Attempted to update to '" + err.keyValue.username + "' but already exists")
            return status.CONFLICT(res, 'username already exists')
        }
        console.error(err)  
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const deleteUser = async (req, res) => {
    let username = req.params.username

    if (isUndefined(username)) return status.BAD_REQUEST(res, 'missing arguments')

    username = username.trim()

    try {
        const userDeleted = await userRepository.deleteUserByUsername({ username })
        if (isUndefined(userDeleted)) return status.NOT_FOUND(res)

        return status.EVENT_DELETED(res)
    } catch (err) {
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.getAllUsers()
        if (isUndefined(users)) return status.NOT_FOUND(res)

        return res.json(users)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

module.exports = {
    login,
    signUser,
    deleteUser,
    putUser,
    getAllUsers
}
