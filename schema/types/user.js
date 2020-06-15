const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
    GraphQLInt
} = require('graphql');


module.exports = new GraphQLObjectType({
    name: 'UserType',

    fields: () => {

        const ContestType = require('./contest');
        const pgdb = require('../../database/pgdb');
        const mdb = require('../../database/mdb');

        return {
            id: { type: GraphQLID },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            fullName: {
                type: GraphQLString,
                resolve: obj => `${obj.firstName} ${obj.lastName}`
            },
            email: { type: new GraphQLNonNull(GraphQLString) },
            contests: {
                type: new GraphQLList(ContestType),
                resolve(obj, args, { pgPool }) {
                    return pgdb(pgPool).getContests(obj);
                }
            },
            contestsCount: {
                type: GraphQLInt,
                resolve(obj, args, { loaders }, { fieldName }) {
                    return loaders.mdb.usersByIds.load(obj.id)
                             .then(res => res[fieldName]);
                }
            },
            namesCount: {
                type: GraphQLInt,
                resolve(obj, args, { loaders }, { fieldName }) {
                    return loaders.mdb.usersByIds.load(obj.id)
                             .then(res => res[fieldName]);
                }
            },
            votesCount: {
                type: GraphQLInt,
                resolve(obj, args, { loaders }, { fieldName }) {
                    return loaders.mdb.usersByIds.load(obj.id)
                             .then(res => res[fieldName]);
                }
            }
        }
    }
});