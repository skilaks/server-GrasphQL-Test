const graphql = require('graphql')
const { GraphQLObjectType,GraphQLString} = graphql;


 const studentsType = new GraphQLObjectType({
    name:"students",
    fields:()=>({
        nCode: {type : GraphQLString}
    })
})
module.exports = studentsType