const status = require('../../../utils/status')
const isUndefined = require('../../../utils/isUndefined')
const bcrypt = require('bcrypt')
const Email = require('email-validator')

const verifyBodyParams = async (req, res, next) => {
    let { name, email, password, role, subscription } = req.body

    let emailParam = req.params.email

    if (isUndefined(emailParam)) return status.BAD_REQUEST(res)
    if (!Email.validate(emailParam)) return status.BAD_REQUEST(res)

    if (isUndefined(name) && isUndefined(email) && isUndefined(password) && isUndefined(role) && isUndefined(subscription)) {
        return status.BAD_REQUEST(res, 'missing arguments')
    }

    if (emailParam !== email) {
        return status.BAD_REQUEST(res, 'the email must be the same')
    }

    emailParam = emailParam.trim()
    name = !isUndefined(name) ? name.trim() : undefined
    role = !isUndefined(role) ? role.trim() : undefined

    if (!isUndefined(email)) {
        email = email.trim()
        if (!Email.validate(email)) return status.BAD_REQUEST(res)
    }

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
    req.body.email = email
    req.body.password = password

    req.body.subscription = subscription

    req.params.email = emailParam

    next()
}

module.exports = verifyBodyParams
