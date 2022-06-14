const status = require('../../../utils/status')
const userRepository = require('../../../services/user/userRepository')
const ROLE = require('../../../utils/userRoles')

module.exports = async (req, res, next) => {
    const { role } = req.body

    if (role !== undefined && role !== ROLE.USER) {
        const user = await userRepository.getUserById(req.userID)
        if (user.role !== ROLE.ADMIN) return status.INVALID_ROLE(res)
    }

    next()
}
