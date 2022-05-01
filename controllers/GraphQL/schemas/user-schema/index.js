const graphql = require('graphql');

const rootQueryType = require('./rootQuery')

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

module.exports = new GraphQLSchema({
    query:rootQueryType
})