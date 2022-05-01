const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schedule = require('./schedule-model')
const student = require('./student-model')

const lessonSchema = new Schema({
    confirmation: {
        type: 'boolean',
        default: false,
    },
    name: {
        type: 'string',
        required: true
    },
    code: {
        type: "string",
        unique: true
        
    },
    teacherNCode: {
        type: "string",
        required: true
    },
    capacity: {
        type: "string",
        required: true
    },

    status: {
        type: "string",
        default: "ارائه شده",
        enum: ['در انتظار تایید','ارائه شده', 'درحال برگذاری', 'به اتمام رسیده', 'درخواست شده']
    },
    grade: {
        type: 'string',
        required: true,
        enum: ['دبستان', 'دبیرستان', 'دانشگاه', 'علمی کاربردی', 'هنرستان', 'فنی']
    },
    typeOfCourse: { type: "string", required: true, enum: ['آنلاین', 'آفلاین', 'حضوری'] },
    price: { type: "string", required: true, default: '0' },
    scoin: { type: "string", required: true, default: '0' },
    numberOfSessions: { type: "string", required: true },
    numberOfHeld: { type: "string", default: '0' },
    grossProfit: { type: "string", default: '0' },
    teachingRights: { type: "string", default: '0' },
    interestRates: { type: "string", default: '0' },
    netProfit: { type: "string", default: '0' },
    depositTeacher: { type: "string", default: '0' },
    schedules: { type: [schedule], required: true },
    students: { type: [student], required: true }
})

module.exports = mongoose.model('Lessons', lessonSchema);