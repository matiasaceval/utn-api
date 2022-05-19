const { Router } = require('express')
const { verifyUser, isAdmin } = require('../middleware/validators/login/userAuth')
const CRUD = require('../controllers/calendar')
const validator = require('../middleware/validators/calendar/validatorModel')

const router = Router()

router.get('/activity', verifyUser, validator.queryDate, CRUD.getActivities)
router.get('/activity/:next', verifyUser, validator.queryDate, CRUD.getActivities)

router.get('/holiday', verifyUser, validator.queryDate, CRUD.getHolidays)
router.get('/holiday/:next', verifyUser, validator.queryDate, CRUD.getHolidays)

router.post('/activity', verifyUser, isAdmin, validator.bodyDate, CRUD.postActivity)
router.post('/holiday', verifyUser, isAdmin, validator.bodyDate, CRUD.postHoliday)

router.delete('/activity',verifyUser, isAdmin, CRUD.deleteActivityByName)
router.delete('/holiday',verifyUser, isAdmin, CRUD.deleteHolidayByName)

router.put('/activity',verifyUser, isAdmin, validator.bodyDate, CRUD.putActivity)
router.put('/holiday',verifyUser, isAdmin, validator.bodyDate, CRUD.putHoliday)

module.exports = router
