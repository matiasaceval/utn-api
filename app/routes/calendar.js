const { Router } = require('express');
const { getNextActivity,
    getNextHoliday,
    getCurrentEvent } = require('../controllers/calendar');

const router = Router();

var path = require('path');

const index = path.join(path.dirname(__dirname), '../template/index.html');

router.get("/", (require, response) => {
    response.sendFile(index);

});


router.get("api/activity", getNextActivity);

router.get("api/holiday", getNextHoliday);

router.get("api/current", getCurrentEvent);

module.exports = router;