const validatorQueryDate = require("./queryDate")
const validatorBodyDate = require("./bodyDate")

module.exports = {
    
    queryDate(req, res, next){
        validatorQueryDate(req, res, next)
    },
    bodyDate(req, res, next){
        validatorBodyDate(req,res, next)
    }
    
}