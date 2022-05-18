const jwt = require('jsonwebtoken')
const loginRepository = require('../../../services/login/loginRepository')
const status = require('../../../utils/status')

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
        const user = await loginRepository.getUserById(req.userID)
        if(user.role !== 'teacher' && user.role !== 'admin') return status.INVALID_ROLE(res)
        next()
    } catch (err) {
        return status.INTERNAL_SERVER_ERROR(res, err)
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await loginRepository.getUserById(req.userID)
        if (user.role !== 'admin') return status.INVALID_ROLE(res)
        next()
    } catch (err) {
        return status.INTERNAL_SERVER_ERROR(res, err)
    }
}

module.exports = {
    verifyUser,
    isTeacher,
    isAdmin
}