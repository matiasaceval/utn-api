const status = require('../../../utils/status')
const isUndefined = require('../../../utils/isUndefined')
const bcrypt = require('bcrypt')

const verifyBodyParams = async (req, res, next) => {
    let { name, username, password, role } = req.body

    let usernameParam = req.params.username

    if (isUndefined(usernameParam)) return status.BAD_REQUEST(res)

    if (isUndefined(name) && isUndefined(username) && isUndefined(password) && isUndefined(role))
        return status.BAD_REQUEST(res, 'missing arguments')

    usernameParam = !isUndefined(usernameParam) ? usernameParam.trim() : undefined
    name = !isUndefined(name) ? name.trim() : undefined
    role = !isUndefined(role) ? role.trim() : undefined
    username = !isUndefined(username) ? username.trim() : undefined

    try {
        if (!isUndefined(password)) {
            password = password.trim()
            password = await bcrypt.hash(password, parseInt(process.env.HASH_SALT))
        }
    } catch (err) {
        status.INTERNAL_SERVER_ERROR(res)
    }

    req.body.name = name
    req.body.role = role
    req.body.username = username
    req.body.password = password

    req.params.username = usernameParam

    next()
}

module.exports = verifyBodyParams
