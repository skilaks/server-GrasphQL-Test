const graphql = require('graphql')
const { GraphQLObjectType,GraphQLString} = graphql;

 const teacherType= new GraphQLObjectType({
    name:"teacher",
    fields:()=>({
        firstName: {type : GraphQLString},
        lastName: {type : GraphQLString},
    })
})
module.exports = teacherType;