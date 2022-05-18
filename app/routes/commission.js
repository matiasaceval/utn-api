const { Router } = require('express')
const { verifyUser, isAdmin, isTeacher } = require('../middleware/validators/login/userAuth')
const CRUD = require('../controllers/commission')
const validator = require('../middleware/validators/commission/validatorModel')
const router = Router()

router.get('/:com/:year', verifyUser, validator.paramYearCom, CRUD.getCommission)
router.post('/:com/:year', verifyUser, isAdmin, validator.paramYearCom, validator.bodyObject, CRUD.postSubject)

module.exports = router