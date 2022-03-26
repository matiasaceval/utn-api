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


router.get("/activity", getNextActivity);

router.get("/holiday", getNextHoliday);

router.get("/current", getCurrentEvent);

module.exports = router;