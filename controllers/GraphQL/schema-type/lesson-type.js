const graphql = require('graphql')
// const userType = require('./userType');
const userModel  = require('../../../DAL/mongose/models/user-model')
const scheduleType = require('./schedule-type');
const studentsType = require('./student-type');
const teacherType = require('./teacher-type')
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    
} = graphql;


const LessonType =new GraphQLObjectType({
    name: 'lesson',
    fields:()=>({
        code:{ type: GraphQLString},
        name:{ type: GraphQLString},
        confirmation:{type:GraphQLBoolean},
        teacherNCode:{type: GraphQLString },
        capacity:{ type:GraphQLString},
        status:{ type:GraphQLString},
        grade:{type:GraphQLString},
        typeOfCourse:{ type:GraphQLString},
        price:{ type:GraphQLString},
        scoin:{ type:GraphQLString},
        numberOfSessions: { type: GraphQLString },
        numberOfHeld: { type: GraphQLString },
        grossProfit: { type: GraphQLString},
        teachingRights:  { type: GraphQLString},
        interestRates: { type: GraphQLString},
        netProfit:  { type: GraphQLString},
        depositTeacher:  { type: GraphQLString},
        schedules:{type:new GraphQLList(scheduleType)},
        students:{type:new GraphQLList(studentsType)},
        teacher:{
            type:teacherType,
            resolve(parent,args){
                let teacher= userModel.findOne({nationalCode:parent.teacherNCode})
                console.log(teacher.firstName);
                return teacher;
            }
        }

    })
})
module.exports =LessonType;