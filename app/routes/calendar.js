const { Router } = require('express');
// const { getNextHoliday, getNextActivity, getCurrentEvent } = require('../controllers/calendar');
const db = require('../database/db.js')

const router = Router();

router.get("/", async function (req, res) {
    res.json();
});

/* 
            !IMPORTANT TO DO:
            Handle `req.query.date` if invalid Date
            Otherwise, app will crash.
*/

router.get("/activity", async function (req, res) {
    res.json(await db.Select.nextActivity(req.query.date))
});

router.get("/holiday", async function (req, res) {
    // Test command: localhost:3000/holiday
    // Test command: localhost:3000/holiday?date=08/14/2022
    res.json(await db.Select.nextHoliday(req.query.date));
});

router.get("/current", async function (req, res) {
    // Test command: localhost:3000/current?date=07/20/2022
    res.json(await db.Select.currentEvent(req.query.date));
});

module.exports = router;