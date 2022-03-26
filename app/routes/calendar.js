const { Router } = require('express');
const { getNextActivity,
        getNextHoliday,
        getCurrentEvent } = require('../controllers/calendar');

const router = Router();

router.get("/activity", getNextActivity);

router.get("/holiday",  getNextHoliday);

router.get("/current",  getCurrentEvent);

module.exports = router;