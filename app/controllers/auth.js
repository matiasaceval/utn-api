const jwt = require('jsonwebtoken')
const status = require('../utils/status')
const Repository = require('../services/user/userRepository')
const bcrypt = require('bcrypt')
const isUndefined = require('../utils/isUndefined')
const Email = require('email-validator')

const login = async (req, res) => {
    const { password } = req.body
    let { email } = req.body

    if (!isUndefined(email)) {
        email = email.trim()
        if (!Email.validate(email)) return status.BAD_REQUEST(res)
    }

    const user = await Repository.getUserByEmailForLogin(email)

    const passwordCorrect = isUndefined(user) ? undefined : await bcrypt.compare(password, user.password)

    if (!user || !passwordCorrect) return status.INVALID_LOGIN(res)

    const userForToken = {
        id: user._id,
        email: user.email
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
        email: user.email,
        role: user.role
    })
}

const signUser = async (req, res) => {
    let { name, email, password } = req.body

    if (isUndefined(name) || isUndefined(email) || isUndefined(password)) return status.BAD_REQUEST(res, 'missing arguments')

    name = name.trim()
    email = email.trim()
    if (!Email.validate(email)) return status.BAD_REQUEST(res)

    password = password.trim()

    try {
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_SALT))

        await Repository.createUser({
            name,
            email,
            password: hashedPassword,
            role: 'user'
        })

        return status.EVENT_CREATED(res, { name, email })
    } catch (err) {
        if (err.code === 11000) {
            console.error("Attempted to create '" + err.keyValue.name + "' but already exists")
            return status.CONFLICT(res, 'email already exists')
        }
        console.error(err)
        return status.INTERNAL_SERVER_ERROR(res, err)
    }
}

const putUser = async (req, res) => {
    const { name, email, password, role, subscription } = req.body
    const emailParam = req.params.email

    const userOBJ = {
        name,
        email,
        password,
        role,
        subscription
    }

    try {
        const userUpdated = await Repository.updateUserByEmail(emailParam, userOBJ)
        if (isUndefined(userUpdated)) return status.NOT_FOUND(res)

        return status.EVENT_UPDATED(res, userUpdated)
    } catch (err) {
        if (err.code === 11000) {
            console.error("Attempted to update to '" + err.keyValue.email + "' but already exists")
            return status.CONFLICT(res, 'email already exists')
        }
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const deleteUser = async (req, res) => {
    let email = req.params.email

    if (isUndefined(email)) return status.BAD_REQUEST(res, 'missing arguments')

    email = email.trim()
    if (!Email.validate(email)) return status.BAD_REQUEST(res)

    try {
        const userDeleted = await Repository.deleteUserByEmail({ email })
        if (isUndefined(userDeleted)) return status.NOT_FOUND(res)

        return status.EVENT_DELETED(res)
    } catch (err) {
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const getAllUsers = async (_, res) => {
    try {
        const users = await Repository.getAllUsers()

        if (isUndefined(users)) return status.NOT_FOUND(res)

        return res.json(users)
    } catch (err) {
        console.error(err)
        status.INTERNAL_SERVER_ERROR(res)
    }
}

const getOneUserByEmail = async (req, res) => {
    let email = req.params.email

    if (isUndefined(email)) return status.BAD_REQUEST(res, 'missing arguments')

    email = email.trim()
    if (!Email.validate(email)) return status.BAD_REQUEST(res)

    try {
        const user = await Repository.getUserByEmail(email)
        if (isUndefined(user)) return status.NOT_FOUND(res)

        return res.json(user)
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
    getAllUsers,
    getOneUserByEmail
}
