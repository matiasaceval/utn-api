/**
 *
 * @exports app/utils/validateDate.js
 * @param { String } date - timestamp, MM/DD/YYYY date
 * @return { Boolean } - is(n't) valid date
 */
module.exports = function(date) {
    if(!date) return false;
    let A = date.match(/[1-9][\d]*/g);
    try {
        A[0] -= 1;
        let day = new Date(+A[2], A[0], +A[1]);   
        return day.getMonth() == +A[0] && day.getDate() == +A[1];
    } catch (err) {
        return err.message;
    }
}