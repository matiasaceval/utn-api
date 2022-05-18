const validatorParamYearCom = require("./paramYearCom")
const validatorBodyObject = require("./bodyObject")

module.exports = {
    
    paramYearCom(req, res, next){
        validatorParamYearCom(req, res, next)
    },
    bodyObject(req, res, next){
        validatorBodyObject(req, res, next)
    },
    
    
}