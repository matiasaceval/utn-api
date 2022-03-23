/* ⬇️    Imports    ⬇️ */
require("dotenv").config();
require("./app/database/client");

const app = require("./app/server");

/* 🫀    Main    🫀 */
app.listen(app.get("port"), () => {
    console.log("Server port on port: ", app.get("port"));
})