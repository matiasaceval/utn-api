const commissionDAO = require('./dao')

module.exports = {
    getSubjectsFromCom(numCommission, year) {
        return commissionDAO.getSubjectsFromCom(numCommission, year)
    },

    createSubject(numCommission, { subject }) {
        return commissionDAO.createSubject(numCommission, subject)
    }
}
