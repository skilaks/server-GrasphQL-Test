const graphql = require('graphql')

const lessonModel = require('../../../DAL/mongose/models/lesson-model')
const LessonType = require('./lesson-type')
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
} = graphql;
const Usertype = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        confirmation: { type: GraphQLBoolean },
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        nationalCode: { type: GraphQLString },
        email: { type: GraphQLString },
        accountType: { type: GraphQLString },
        dergee: { type: GraphQLString },
        fieldStudy: { type: GraphQLString },
        workExperience: { type: graphql.GraphQLBoolean },
        phoneNumber: { type: GraphQLString },
        birthDay: { type: GraphQLString },
        grade: { type: GraphQLString },
        address: { type: GraphQLString },
        tokens:{type:GraphQLString},
        lessons:{
            type:new GraphQLList( LessonType),
            resolve(parent, args){
                // console.log(parent.nationalCode)
              return  lessonModel.find({teacherNCode:parent.nationalCode})
            }
        }

    })
});

module.exports =Usertype;