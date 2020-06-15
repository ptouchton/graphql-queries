const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const app = require('express')();

const DataLoader = require('dataloader');

const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);
const pgdb = require('../database/pgdb')(pgPool);

const { MongoClient, Logger } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];


const ncSchema = require('../schema');
const graphqlHTTP = require('express-graphql');

MongoClient.connect(mConfig.url, (err, mPool) => {

    assert.equal(err, null);
    const mdb = require('../database/mdb')(mPool);

    Logger.setLevel('debug');
    Logger.filter('class', ['server']);

    app.use('/graphql', (req, res) => {

        const loaders = {
            usersByIds : new DataLoader(pgdb.getUsersByIds) ,
            usersByApiKeys : new DataLoader(pgdb.getUsersByApiKeys),
            mdb: {
                usersByIds: new DataLoader(mdb.getUsersByIds)
            }
        };

        graphqlHTTP({
            schema: ncSchema,
            graphiql: true,
            context: { pgPool, mPool, loaders }
        })(req, res); 
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is listeneing on port ${PORT}`);
    })
})
