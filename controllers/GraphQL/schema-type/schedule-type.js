const graphql = require('graphql')
const { GraphQLObjectType,GraphQLString} = graphql;

 const scheduleType = new GraphQLObjectType({
    name :'schedule',
    fields :()=>({
        day : {type : GraphQLString},
        time:{type : GraphQLString}
    })
})
module.exports = scheduleType;