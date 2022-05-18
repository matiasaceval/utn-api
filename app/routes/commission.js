const { Router } = require('express')
const { verifyUser, isAdmin, isTeacher } = require('../middleware/validators/login/userAuth')
const CRUD = require('../controllers/commission')
const validator = require('../middleware/validators/commission/validatorModel')
const router = Router()

router.get('/:com/:year', verifyUser, validator.paramYearCom, validator.validYearCom, CRUD.getCommission)
router.put('/:com/:year', verifyUser, isTeacher, validator.paramYearCom, validator.validYearCom, validator.bodyObject, CRUD.putSubject)
router.post('/:com/:year', verifyUser, isAdmin, validator.paramYearCom, validator.validYearCom, validator.bodyObject, CRUD.postSubject)
router.delete('/:com/:year', verifyUser, isAdmin, validator.paramYearCom, validator.validYearCom, validator.bodyObject, CRUD.deleteSubject)

router.post('/postCom/:com/:year', verifyUser, isAdmin, validator.paramYearCom, CRUD.postCommission)

module.exports = router