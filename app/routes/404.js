const { Router } = require('express')

const router = Router()

// TODO: Handle this route

// BAD FRONTEND REQUESTS
router.get('*/', (req, res) => {
    res.status(404).send('Not Found')
})

module.exports = router
