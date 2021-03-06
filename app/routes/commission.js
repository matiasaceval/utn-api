const { Router } = require('express')
const { verifyUser, isAdmin, isTeacher } = require('../middleware/validators/user/userAuth')
const CRUD = require('../controllers/commission')
const validator = require('../middleware/validators/commission/validatorModel')
const router = Router()

router.get('/:com/:year', verifyUser, validator.paramYearCom, validator.validYearCom, CRUD.getCommission)
router.put('/:com/:year', verifyUser, isTeacher, validator.paramYearCom, validator.validYearCom, validator.bodyObject, CRUD.putSubject)
router.post('/:com/:year', verifyUser, isAdmin, validator.paramYearCom, validator.validYearCom, validator.bodyObject, CRUD.postSubject)
router.delete('/:com/:year', verifyUser, isAdmin, validator.paramYearCom, validator.validYearCom, validator.bodyObject, CRUD.deleteSubject)

router.post('/collection/:com/:year', verifyUser, isAdmin, validator.paramYearCom, CRUD.postCommission)
router.delete('/collection/:com/:year', verifyUser, isAdmin, validator.paramYearCom, validator.validYearCom, CRUD.deleteCommission)

module.exports = router
