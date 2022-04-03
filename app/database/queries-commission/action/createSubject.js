const subjectScheme = require("../../../schemas/Subject");
const { model } = require("mongoose");


/**
 *
 * @exports app/database/queries-commission/action/createSubject.js
 * @param { String } commission format: Y-COMx, example:  1-COM1   2-COM3
 * @param { String } subject
 * @param { String } teacher
 * @param { Object } timetable
 * @param { Object } exam
 * @param { Object } recuperatory
 * @param { String | null } email
 * @param { String | null } zoom
 * @param { String | null } extra
 */
module.exports = async (commission, subject, teacher, timetable, exam, recuperatory, extra = null, email = null, zoom = null) => {
    const subjectModel = model(commission, subjectScheme);
    const event = new subjectModel({
        subject: subject,
        zoom: zoom,
        teacher: {
            name: teacher,
            email: email,
        },
        timetable: timetable,
        exam: exam,
        recuperatory: recuperatory,
        extra: extra,
    });

    event.save().then((res) => {
        console.log("Registered: ", subject, commission);
    });
};