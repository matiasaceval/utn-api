const jwt = require('jsonwebtoken')
const UserModel = require('../services/login/model')
const status = require('../utils/error')

const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token

    if (!token) return status.INVALID_TOKEN(res)

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedToken.id) return status.INVALID_LOGIN(res)

        const { id: userID } = decodedToken

        req.userID = userID

        next()
    } catch (e) {
        return status.TOKEN_EXPIRED(res, e.expiredAt)
    }
}

const isTeacher = async (req, res, next) => {
    try {
        const user = await UserModel.getUserById(req.userID)
        if(user.role === 'teacher' || user.role === 'admin'){
            next()
            return
        }
        return status.INVALID_ROLE(res)
    } catch (err) {
        return status.INTERNAL_SERVER_ERROR(res, err)
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.getUserById(req.userID)
        if (user.role === 'admin') {
            next()
            return
        }
        return status.INVALID_ROLE(res)
    } catch (err) {
        return status.INTERNAL_SERVER_ERROR(res, err)
    }
}

module.exports = {
    verifyUser,
    isTeacher,
    isAdmin
}