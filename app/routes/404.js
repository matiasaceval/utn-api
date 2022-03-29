const { Router } = require('express');
const path = require('path');

const router = Router();


// TODO: Handle this route

// BAD FRONTEND REQUESTS
router.get('*/', (req, res) => {
    res.status(404).send('ERROR');
})

module.exports = router;