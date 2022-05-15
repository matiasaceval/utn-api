const { Router } = require('express')
const status = require('../utils/status')
const router = Router()

// TODO: Handle this route

// BAD FRONTEND REQUESTS
router.get('*/', (_, res) => {
    status.NOT_FOUND(res)
})

module.exports = router
