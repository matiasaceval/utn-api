const status = require("../../../utils/status")
const userRepository = require('../../../services/user/userRepository')

module.exports = async(req, res, next) => {
    let { role } = req.body

    if(role !== undefined && role !== "user"){
        const user = await userRepository.getUserById(req.userID)
        if (user.role !== 'admin') return status.INVALID_ROLE(res)
    }

    next()
}