/**
 *
 * @exports app/services/calendar/utils/validateDate.js
 * @param { String } date timestamp, _MM/DD/YYYY_ date
 * @return { Boolean } is(n't) valid date
 */
module.exports = (date) => {
    if (!date || !date.match(/^[\d/-]+$/)) return false
    const A = date.match(/[1-9][\d]*/g)
    try {
        A[0] -= 1
        const day = new Date(+A[2], A[0], +A[1])
        return day.getMonth() === +A[0] && day.getDate() === +A[1]
    } catch (err) {
        return err.message
    }
}
