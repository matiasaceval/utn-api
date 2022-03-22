/* ⬇️    Imports    ⬇️ */
require("dotenv").config();
require("./src/connection/database");

const app = require("./src/app");

/* 🫀    Main    🫀 */
app.listen(app.get("port"), () => {
    console.log("Server port on port: ", app.get("port"));
})