const graphql = require('graphql');

const LessonType = require('./schemaTypes/lessonType');
const LessonModel = require('../../../dal/mongose/models/lesson-model');


const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLError,
    GraphQLInputObjectType
} = graphql;

// const scheduleType = new GraphQLObjectType({
//     name :'schedule',
//     fields :()=>({
//         day : {type : GraphQLString},
//         time:{type : GraphQLString}
//     })
// })
const scheduleInput = new GraphQLInputObjectType({
    name:"schedulInput",
    fields :()=>({
        day:{type : GraphQLString},
        time:{type : GraphQLString}
    })
})
const studentsInput = new GraphQLInputObjectType({
    name:"studentsInput",
    fields :()=>({
        nCode:{type : GraphQLString}
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'rootQueryType',
    fields: {
        getAllLesson: {
            type: new GraphQLList(LessonType),
            async resolve() {
                const lessons = await LessonModel.find({});
                return lessons;
            }
        },
        getLessonByCode: {
            type: LessonType,
            args: {
                code: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const lesson = await LessonModel.findOne({ code: args.code });
                return lesson;
            }
        },
        getLessons: {
            type: new GraphQLList(LessonType),
            args: {
                name: { type: GraphQLString },
                teacherNCode: { type: GraphQLString },
                status: { type: GraphQLString },
                typeOfCourse: { type: GraphQLString },
                grade: { type: GraphQLString },
            },
            async resolve(parent, args) {
                const lessons = await LessonModel.find({ name: args.name, teacherNCode: args.teacherNCode, status: args.status, grade: args.grade, typeOfCourse: args.typeOfCourse });
                return lessons;
            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createLesson: {
            type: LessonType,
            args: {
                code: { type: GraphQLString },
                name: { type: GraphQLString },
                confirmation: { type: GraphQLBoolean },
                teacherNCode: { type: GraphQLString },
                capacity: { type: GraphQLString },
                status: { type: GraphQLString },
                grade: { type: GraphQLString },
                typeOfCourse: { type: GraphQLString },
                price: { type: GraphQLString },
                scoin: { type: GraphQLString },
                numberOfSessions: { type: GraphQLString },
                numberOfHeld: { type: GraphQLString },
                grossProfit: { type: GraphQLString },
                teachingRights: { type: GraphQLString },
                interestRates: { type: GraphQLString },
                netProfit: { type: GraphQLString },
                depositTeacher: { type: GraphQLString },
                schedules: { type:new GraphQLList(scheduleInput) },
                students: { type:new GraphQLList(studentsInput) },
            },
            async resolve(parent, args) {
                let newLesson = await new LessonModel({
                    code:args.code,
                    name:args.name,
                    confirmation:args.confirmation,
                    teacherNCode:args.teacherNCode,
                    capacity:args.capacity,
                    status:args.status,
                    grade:args.grade,
                    typeOfCourse:args.typeOfCourse ,
                    price: args.price,
                    scoin:args.scoin ,
                    numberOfSessions:args.numberOfSessions ,
                    numberOfHeld:args.numberOfHeld,
                    grossProfit:args.grossProfit,
                    teachingRights:args.teachingRights,
                    interestRates:args.interestRates,
                    netProfit:args.netProfit,
                    depositTeacher:args.depositTeacher,
                    schedules: args.schedules,
                    students: args.students
                })
                return newLesson.save();
            }
        },
    // addSchedule:{
    //     type:new GraphQLList(scheduleType),
    //     args:{
    //         scheduleArray:{type:new GraphQLList(scheduleInput)}
    //     },
    //     resolve(parent,{scheduleArray}){
    //         console.log(scheduleArray)
    //     }

    // }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})