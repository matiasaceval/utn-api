const { Router } = require('express');
const { getNextHoliday } = require('../controllers/calendar');
//const { getGeneralCalendar } = require('../controllers/calendar');

const router = Router();

router.get("/", async function (req, res) {
    res.json(await getNextHoliday());
});

router.get("/specific-date", async function (req, res) {
    res.json(await getNextHoliday(req.query.date));
});

module.exports = router;