const commissionDAO = require('./dao')

module.exports = {
    getSubjectsFromCom(numCommission, year) {
        return commissionDAO.getSubjectsFromCom(numCommission, year)
    },

    createSubject(collectionName, subjectObj) {
        commissionDAO.createSubject(collectionName, subjectObj)
    }
}
