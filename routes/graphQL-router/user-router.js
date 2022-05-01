const {graphqlHTTP} = require('express-graphql');

const userSchema = require('../../controllers/GraphQL/schemas/user-schema');

  const userGraphQLRouter = graphqlHTTP({
    schema:userSchema,
    graphiql:true
    })

    module.exports = userGraphQLRouter;