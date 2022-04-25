const { Router } = require('express')

const getCommission = require('../controllers/commission')

const router = Router()

router.get('/commission/:com/:year', getCommission)

module.exports = router
