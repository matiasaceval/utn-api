const HolidayModel = require("../../../schemas/Holiday");
const ActivityModel = require("../../../schemas/Activity");

/**
 *
 * @exports app/database/queries/select/currentEvent.js
 * @param { String | undefined } currentDate get next event from that date. otherwise, current date its used
 * @return { Object | undefined } current event from DB. if error, undefined
 */
module.exports = async (currentDate = Date.now()) => {
    currentDate = new Date(new Date(currentDate).setHours(00, 00, 00));
    const filters = {
        $and: [{ start: { $lte: currentDate } }, { end: { $gte: currentDate } }],
    };

    const resActivity = (await ActivityModel.find(filters).limit(1).select("-__v").select("-_id"))[0];
    const resHoliday = (await HolidayModel.find(filters).limit(1).select("-__v").select("-_id"))[0];

    return resActivity || resHoliday;
};
