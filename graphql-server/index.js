const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const { root, schema } = require('./weather');

const requesterPath = require('path').join(__dirname, '..', 'graphql-client');

const app = express();

app.use('/', express.static(requesterPath));

app.use('/graphql-weather', graphqlHTTP({
    schema: buildSchema(schema),
    rootValue: root,
    graphiql: false,
}));

app.listen(4000);

// const allFiles = require('fs').readdirSync(__dirname).filter(v => v.endsWith('.js') && !__filename.endsWith(v));
// for (const file of allFiles) {
//     const fileName = file.slice(0, -3);

//     const loaded = require(__dirname + '/' + fileName);
//     const loadedKeys = Object.keys(loaded);

//     if (loadedKeys.length != 2 || !loadedKeys.includes('root') || !loadedKeys.includes('schema'))
//         continue;

//     console.log('registering fileName', fileName);

//     app.use('/graphql-' + file.slice(0, -3), graphqlHTTP({
//         schema: buildSchema(loaded.schema),
//         rootValue: loaded.root,
//         graphiql: false,
//     }));
// }