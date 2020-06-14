const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, graphqlSync } = require("graphql");

const ContestStatusType = require('./contest-status.js');

module.exports = new GraphQLObjectType({
    name: 'ContestType',

    fields: {
        id: { type: GraphQLID },
        code: { type: new GraphQLNonNull(GraphQLString)},
        title: { type: new GraphQLNonNull(GraphQLString)},
        descriptiopn: { type: GraphQLString},
        status: { type: new GraphQLNonNull(ContestStatusType)},
        createdAt: { type: new GraphQLNonNull(GraphQLString)},
    }
})