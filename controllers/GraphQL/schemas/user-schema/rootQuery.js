const graphql = require('graphql');

const userType = require('../../schema-type/user-type');
const userModel = require('../../../../DAL/mongose/models/user-model');

const { GraphQLObjectType,
    GraphQLString,
    GraphQLList,
} = graphql

const RootQuery = new GraphQLObjectType({
    name: 'rootQueryType',
    fields: {
        getAllUsers: {
            type: new GraphQLList(userType),
            resolve() {
                return userModel.find({});
            }
        },
        getUserByNCode: {
            type: userType,
            args: {
                nCode: { type: GraphQLString }
            },
            resolve(parent, args) {
                return userModel.findOne({ nationalCode: args.nCode });
            }
        },
    }
})
module.exports = RootQuery