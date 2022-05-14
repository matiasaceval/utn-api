const { Router } = require('express')
const getCommission = require('../controllers/commission')
const { verifyUser, isAdmin } = require('../middleware/userAuth')
const router = Router()

router.get('/:com/:year', verifyUser, isAdmin, getCommission)

module.exports = router