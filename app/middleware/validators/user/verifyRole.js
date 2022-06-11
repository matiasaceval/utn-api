const { isAdmin } = require("./userAuth")

module.exports = async(req, res, next) => {
    let { role } = req.body

    if(role != undefined && role != "user"){
        return isAdmin(req, res, next)
    }

    next()
}