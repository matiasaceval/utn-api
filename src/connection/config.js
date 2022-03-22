/* ⌨️    Constants    ⌨️ */
const { MDB_NAME, MDB_USER, MDB_PASSWORD, PORT } = process.env;
const URI = process.env.MDB_URI.replace("<username>", MDB_USER)
                            .replace("<password>", MDB_PASSWORD)
                            .replace("<dbname>", MDB_NAME);

/* ⬆️    Export    ⬆️ */
module.exports = {
    port: PORT || 8080,
    db_name: MDB_NAME,
    username: MDB_USER,
    password: MDB_PASSWORD,
    uri: URI,
};