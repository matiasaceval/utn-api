/**
 * 
 * @exports app/utils/getTimeInterval.js
 * @param { String } date - receive MM/DD/YYYY date string
 * @return { Object } - initial date & that date +1 year
 */
module.exports = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    const startDate = new Date(year, month, day);
    const endDate = new Date(year + 1, month, 0);

    return { startDate, endDate };
};
