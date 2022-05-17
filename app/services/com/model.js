const commissionDAO = require('./dao')

module.exports = {
    getSubjectsFromCom(numCommission, year) {
        return commissionDAO.getSubjectsFromCom(numCommission, year)
    },

    createSubject(numCommission, subject) {
        commissionDAO.createSubject(numCommission, subject)
    }
}
