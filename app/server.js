/* ⬇️    Imports    ⬇️ */
const express = require("express");
const Config = require("./database/config");
const app = express();

/* 🛠️    Settings    🛠️ */
app.disable('x-powered-by');
app.set("port", Config.port);
app.set("json spaces", 2);

/* 🧱    Middlewares    🧱 */
app.use(require('./middleware/customHeaders.js'));
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/api.js'));



/* ⬆️    Export    ⬆️ */
module.exports = app;
