const ActivityModel = require("../../../schemas/Activity");
const getTimeInterval = require("../../../utils/getTimeInterval.js");

/**
 *
 * @exports app/database/queries-calendar/select/nextActivity.js
 * @param { String | undefined } currentDate get next activity from that date. otherwise, current date its used
 * @return { Object | undefined } next activity from DB. if error, undefined
 */
module.exports = async (currentDate = Date.now()) => {
    const date = getTimeInterval(currentDate);
    const filters = {
        start: {
            $gte: new Date(new Date(date.startDate).setUTCHours(03, 00, 00)),
            $lte: new Date(new Date(date.endDate).setUTCHours(03, 00, 00)),
        },
    };

    const res = (await ActivityModel.find(filters).sort({ start: 1 }).limit(1).select("-__v -_id"))[0];
    return res;
};
