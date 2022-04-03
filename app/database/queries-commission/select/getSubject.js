const { model } = require("mongoose");
const subjectScheme = require("../../../schemas/Subject");


/**
 *
 * @exports app/database/queries-commission/select/getSubject.js
 * @param { String } year
 * @param { String } subject
 * @param { String } commission 
 * @return { Object | undefined } // get the data of the subject passed by parameter
 */
module.exports = async (year, commission, subject) => {
    const collection = `${year}-com${commission}`;
    const subjectModel = model(collection, subjectScheme);
    const filters = { subject: subject };

    const resultSubject = (await subjectModel.find(filters).select("-__v -_id"))[0];

    return resultSubject;
};