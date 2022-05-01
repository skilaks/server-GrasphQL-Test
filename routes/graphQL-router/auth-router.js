const { graphqlHTTP } = require('express-graphql');

const authSchema = require('../../controllers/GraphQL/schemas/auth-schema');

const authGraphQLRouter = graphqlHTTP({
    schema: authSchema,
    graphiql: true
})

module.exports = authGraphQLRouter;