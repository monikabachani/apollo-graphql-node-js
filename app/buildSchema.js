const userTypeDef = require("../app/schema/user");
const userResolvers = require("../app/resolvers/user");
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require("lodash");
const postTypeDef = require("./schema/post");
const postResolver = require("./resolvers/post");
const userGetResolver = require("./resolvers/userget");
const postGetResolver = require("./resolvers/postGet");

const schema = makeExecutableSchema({
    typeDefs: [userTypeDef,postTypeDef],
    resolvers: merge(userResolvers,postResolver,userGetResolver,postGetResolver),
});

module.exports = schema;