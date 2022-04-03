const db = require("../database/db.js");
const { mongoose } = require("../database/client");



/**
 * 
 * @exports app/controllers/commission.js
 * @param { * } req 
 * @param { * } res 
 * @returns { * } json 
 */
async function getSubject(req, res) {
    await mongoose.connection.db.listCollections().toArray(async function (err, names) {
        if (err) console.log(err);
        const collections = names.map(n => n.name);


        /**
         * 
         *  @example
         *  ['activity-2022', '1-COM5', '1-COM6', '2-COM3'] will result in:
         *  collectionYears = [1, 1, 2]
         *  collectionCommissions = [5, 6, 3]
         *  Being activity-2022 filtered because its NaN
         */

        const collectionYears = collections.map(n => parseInt(n.split('-')[0])).filter(Number);
        const collectionCommissions = collections.map(n => parseInt(n.split('com')[1])).filter(Number);

        const queryYear = parseInt(req.query.year);
        const queryCom = parseInt(req.query.com);
        const querySubject = req.query.subject;

        if (!queryYear || !queryCom || !querySubject) return await res.status(400).send("Bad Request: invalid parameters, must have 'year', 'com' & 'subject'")
        if (!collectionYears.includes(queryYear)) return await res.status(400).send("Bad Request: invalid year")
        if (!collectionCommissions.includes(queryCom)) return await res.status(400).send("Bad Request: invalid com")

        const subjects = await db.Commission.Select.getSubjectsFromCom(queryYear, queryCom);
        if (subjects.find(s => s.subject == querySubject)) {
            const dbResult = await db.Commission.Select.getSubject(queryYear, queryCom, querySubject);
            return await res.json(dbResult);
        } else {

            return await res.status(404).send(`Not Found: subject`);
        }
    });

}

module.exports = {
    getSubject
}