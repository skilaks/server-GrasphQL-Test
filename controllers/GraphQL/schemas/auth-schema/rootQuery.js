const graphql = require('graphql')
const bcrypt = require("bcrypt");

const Usertype = require('../../schema-type/user-type')
const genToken = require('../../../auth/genToken')
const UserModel = require('../../../../DAL/mongose/models/user-model');

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLError
} = graphql;

const RootQuery = new GraphQLObjectType({
    name: 'rootQueryType',
    fields: {
        login: {
            type: Usertype,
            args: {
                phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                const user = await UserModel.findOne({ phoneNumber: args.phoneNumber })

                if (!user) {

                    throw new Error('this user is not exist')

                } else {
                    const passwordIsMatched = await bcrypt.compare(args.password, user.password)
                    if (passwordIsMatched) {
                        const token = genToken.genTokenForLogin(user.nationalCode);
                        user.tokens = token;
                        return user;

                    } else {
                        throw new Error("password is not matched")
                    }

                }
            }
        }
    }
});

module.exports = RootQuery;