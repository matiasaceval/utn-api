const { Router } = require('express')
const calendar = require('../controllers/calendar')
const { verifyUser, isAdmin} = require('../middleware/userAuth')

const router = Router()
router.post('/activity', verifyUser, isAdmin, calendar.postActivity)
router.post('/holiday', verifyUser, isAdmin, calendar.postHoliday)

router.delete('/activity',verifyUser, isAdmin, calendar.deleteActivityByName)
router.delete('/holiday',verifyUser, isAdmin, calendar.deleteHolidayByName)

router.get('/activity', verifyUser, calendar.getActivities)
router.get('/activity/:next', verifyUser, calendar.getActivities)

router.get('/holiday', verifyUser, calendar.getHolidays)
router.get('/holiday/:next', verifyUser, calendar.getHolidays)



module.exports = router
