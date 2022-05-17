const { Router } = require('express')
const getCommission = require('../controllers/commission')
const { verifyUser } = require('../middleware/validators/login/userAuth')
const router = Router()

router.get('/:com/:year', verifyUser, getCommission)

module.exports = router