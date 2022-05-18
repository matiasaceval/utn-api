const validatorParamYearCom = require("./paramYearCom")
const validatorValidYearCom = require("./validYearCom")
const validatorBodyObject = require("./bodyObject")

module.exports = {
    paramYearCom(req, res, next) {
        validatorParamYearCom(req, res, next)
    },
    bodyObject(req, res, next) {
        validatorBodyObject(req, res, next)
    },
    validYearCom(req, res, next) {
        validatorValidYearCom(req, res, next)
    }
}