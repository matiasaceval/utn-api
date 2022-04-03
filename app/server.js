/* ⬇️    Imports    ⬇️ */
const express = require("express");
const Config = require("./database/config");
const app = express();
const path = require('path');

/* 🛠️    Settings    🛠️ */
const root = path.resolve(__dirname, '..');

app.disable('x-powered-by');
app.set("port", Config.port);
app.set("json spaces", 2);

/* ↪    Index Redirects to docsify UI    ↪ */
app.get('/', (req, res) => {
    res.redirect(301, 'docs');
})

/* 📄    Docsify    📄 */
app.use(require('./middleware/docsifyHeaders.js'));
app.use(express.static(path.join(root, 'docsify'))); // serve static
app.use('/docs', require('./routes/docsify.js'));


/* 🧱    API    🧱 */
app.use(require('./middleware/apiHeaders.js'));
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/commission.js'));
app.use('/api', require('./routes/calendar.js'));


/* 🛣    Invalid Frontend Routes    🛣 */
app.use(require('./routes/404.js'));

/* ⬆️    Export    ⬆️ */
module.exports = app;
