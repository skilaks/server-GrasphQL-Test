const graphql = require('graphql')

const RootQuery = require('./rootQuery');
const Mutation = require('./mutation');

const {
    GraphQLSchema,
} = graphql;
//------------------------------
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})