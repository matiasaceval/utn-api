/**
 * @exports app/services/com/dao.js
 * @param { Object } resource
 * @param { Object } comparate
 * @return { Object }
 */
const getSubject = (resource, comparate) => {
    return resource.find((s) => s.subject === comparate.subject)
}

/**
 * @exports app/services/com/dao.js
 * @param { Object } resource
 * @param { Object } comparate
 * @return { Object }
 */
const getTeacherSubjects = (resource, comparate) => {
    return resource.filter((s) => s.teacher.name === comparate.teacher)
}

/**
 * @exports app/services/com/dao.js
 * @param { Object } resource
 * @param { Object } comparate
 * @return { Object }
 */
const getSubjectByTeacher = (resource, comparate) => {
    const teacherSubjects = getTeacherSubjects(resource, comparate)

    const subjectDTO = getSubject(teacherSubjects, comparate)

    return subjectDTO
}

module.exports = {
    getSubject,
    getTeacherSubjects,
    getSubjectByTeacher
}
