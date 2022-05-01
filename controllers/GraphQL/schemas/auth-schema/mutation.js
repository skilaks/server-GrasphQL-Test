
const graphql = require('graphql')
const bcrypt = require("bcrypt");

const Usertype = require('../../schema-type/user-type')
const genToken = require('../../../auth/genToken')
const UserModel = require('../../../../DAL/mongose/models/user-model');

const RootQuery = require('./rootQuery')

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
//------------------------------

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: {
            type: Usertype,
            args: {
                confirmation: { type: GraphQLBoolean },
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
                password: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const salt = bcrypt.genSaltSync(10);
                const passHashed = await bcrypt.hash(args.password, salt);
                const token = genToken.genTokenForLogin(args.nationalCode);
                let newUser = await new UserModel({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    nationalCode: args.nationalCode,
                    email: args.email,
                    accountType: args.accountType,
                    dergee: args.dergee,
                    fieldStudy: args.fieldStudy,
                    workExperience: args.workExperience,
                    phoneNumber: args.phoneNumber,
                    birthDay: args.birthDay,
                    grade: args.grade,
                    address: args.address,
                    confirmation: args.confirmation,
                    tokens: token,
                    password: passHashed
                })
                return newUser.save();
            }
        }

    }
})

module.exports = Mutation;