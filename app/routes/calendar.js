const { Router } = require('express')
const calendar = require('../controllers/calendar')
const { verifyUser, isAdmin} = require('../middleware/validators/login/userAuth')
const validator = require('../middleware/validators/calendar/validatorModel')

const router = Router()

router.get('/activity', verifyUser, validator.queryDate, calendar.getActivities)
router.get('/activity/:next', verifyUser, validator.queryDate, calendar.getActivities)

router.get('/holiday', verifyUser, validator.queryDate, calendar.getHolidays)
router.get('/holiday/:next', verifyUser, validator.queryDate, calendar.getHolidays)

router.post('/activity', verifyUser, isAdmin, validator.bodyDate, calendar.postActivity)
router.post('/holiday', verifyUser, isAdmin, validator.bodyDate, calendar.postHoliday)

router.delete('/activity',verifyUser, isAdmin, calendar.deleteActivityByName)
router.delete('/holiday',verifyUser, isAdmin, calendar.deleteHolidayByName)

router.put('/activity',verifyUser, isAdmin, validator.bodyDate, calendar.putActivity)
router.put('/holiday',verifyUser, isAdmin, validator.bodyDate, calendar.putHoliday)

module.exports = router
