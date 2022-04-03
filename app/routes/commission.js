const { Router } = require('express');

const { getSubject } = require('../controllers/commission');

const router = Router();

router.get("/subject", getSubject);

module.exports = router;