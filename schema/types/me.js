const {
     GraphQLObjectType,
     GraphQLID,
     GraphQLString,
     GraphQLNonNull,
     GraphQLList
} = require('graphql');

const ContestType = require('./contest');
const pgdb = require('../../database/pgdb');

module.exports = new GraphQLObjectType({
    name: 'MeType',

    fields: {
        id: {type: GraphQLID},
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString)},
        contests: {
            type: new GraphQLList(ContestType),
            resolve(obj, args, { pgPool }) {
              return pgdb(pgPool).getContests(obj);
            }
        }
    }
});