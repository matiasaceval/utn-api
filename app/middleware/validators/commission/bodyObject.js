const status = require('../../../utils/status')
const isUndefined = require('../../../utils/isUndefined')
const isValidDate = require('../../../services/calendar/utils/isValidDate')

module.exports = (req, res, next) => {
    const { subject, zoom, teacher, timetable, exam, makeupExam } = req.body
    let { code, extra } = req.body
    
    if (!isUndefined(extra) && !Array.isArray(extra)) return status.BAD_REQUEST(res)
    if (!isUndefined(code) && typeof code !== 'string') code = `${code}`
    
    const object = {
        subject: subject || null,
        zoom: zoom || null,
        code: code || null,
        teacher: {
            name: teacher?.name || null,
            email: teacher?.email || null
        },
        timetable: {
            monday: timetable?.monday || null,
            tuesday: timetable?.tuesday || null,
            wednesday: timetable?.wednesday || null,
            thursday: timetable?.thursday || null,
            friday: timetable?.friday || null
        },
        exam: {
            first: exam?.first || null,
            second: exam?.second || null
        },
        makeupExam: {
            first: makeupExam?.first || null,
            second: makeupExam?.second || null
        },
        extra: extra || null
    }

    if(Object.values(object).every((e) => e === undefined)) return status.BAD_REQUEST(res, 'the specified object is empty')

    for(const keys in object){
        if(typeof object[keys] === 'string'){
            object[keys] = object[keys].trim()
        }
    }

    const model = {
        subject: 'string',
        zoom: 'string',
        code: 'string',
        teacher: {
            name: 'string',
            email: 'string'
        },
        timetable: {
            monday: 'string',
            tuesday: 'string',
            wednesday: 'string',
            thursday: 'string',
            friday: 'string'
        },
        exam: {
            first: 'date',
            second: 'date'
        },
        makeupExam: {
            first: 'date',
            second: 'date'
        },
        extra: []
    }

    if(!iterateObject(object, model)) return status.BAD_REQUEST(res, 'type-error at the specified object')
    req.body.objectComplete = object
    
    Object.keys(object).forEach((key) => {
        if (object[key] === null) {
            delete object[key]
        }
    })
    
    req.body.object = object
    
    next()
}

/* mmmmm yummy!🤤 some spaghetti 🍝 */ 
const iterateObject = (object, model) => {
    for (const key in object) {
        const value = object[key]
        const modelValue = model[key]
        if(modelValue === undefined) return false
        if (value !== null) {
            if (typeof value !== typeof modelValue) return false
            if (typeof value === 'object') {
                if(!Array.isArray(modelValue)){
                    if(!iterateObject(value, modelValue)) return false
                } else {
                    for(const obj of value){
                        if(!iterateObject(obj,{ name: 'string', date: 'date' })) return false
                    }
                }
            }
            if(modelValue === 'date'){
                return isValidDate(value)
            }
        }
    }
    return true
}