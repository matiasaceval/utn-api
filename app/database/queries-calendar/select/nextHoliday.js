const HolidayModel = require("../../../schemas/Holiday.js");
const getTimeInterval = require("../../../utils/getTimeInterval.js");

/**
 *
 * @exports app/database/queries/select/nextHoliday.js
 * @param { String | undefined } currentDate get next holiday from that date. otherwise, current date its used
 * @return { Object | undefined } next holiday from DB. if error, undefined
 */
module.exports = async (currentDate = Date.now()) => {
    const date = getTimeInterval(currentDate);
    const filters = {
        start: {
            $gte: new Date(new Date(date.startDate).setHours(00, 00, 00)),
            $lte: new Date(new Date(date.endDate).setHours(00, 00, 00)),
        },
    };

    const res = (await HolidayModel.find(filters).sort({ start: 1 }).limit(1).select("-__v").select("-_id"))[0];

    return res;
};