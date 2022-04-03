const router = require('express').Router();
const { getNextActivity,
    getNextHoliday,
    getCurrentEvent } = require('../controllers/calendar');


// TODO: Handle this route

// NO ENDPOINT REQUEST
router.get("/", (require, response) => {
    response.send('No Endpoint');
});
//heroku.com/api/

router.get("/activity", getNextActivity);

router.get("/holiday", getNextHoliday);

router.get("/current", getCurrentEvent);

// TODO: Handle this route

// INVALID ENDPOINT REQUEST
router.get("/*", (req, res) => {
    res.json('Invalid Endpoint');
})


module.exports = router;