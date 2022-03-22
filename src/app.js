/* ⬇️    Imports    ⬇️ */
const express = require("express");
const Config = require("./connection/config");
const app = express();

/* 🛠️    Settings    🛠️ */
app.set("port", Config.port);
app.set("json spaces", 2);

/* 🧱    Middlewares    🧱 */
app.use(express.urlencoded({ extended: false }));

app.use('/', require('../routes/calendar'));

/* ⬆️    Export    ⬆️ */
module.exports = app;
