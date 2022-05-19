const commissionDAO = require('./dao')

module.exports = {
    getSubjectsFromCom(collectionName) {
        return commissionDAO.getSubjectsFromCom(collectionName)
    },

    createSubject(collectionName, subjectObj) {
        commissionDAO.createSubject(collectionName, subjectObj)
    },

    updateDocumentBySubject(collection, filter, obj) {
        return commissionDAO.updateDocumentBySubject(collection, filter, obj)
    },

    deleteDocumentBySubject(collection, filter) {
        return commissionDAO.deleteDocumentBySubject(collection, filter)
    },

    createCommission(collection) {
        return commissionDAO.createCommission(collection)
    },

    deleteCommission(collection) {
        return commissionDAO.deleteCommission(collection)
    }
}
