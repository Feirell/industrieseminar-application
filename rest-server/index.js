const express = require('express');
const bodyParser = require('body-parser');

const { endpoints } = require('./weather');

const requesterPath = require('path').join(__dirname, '..', 'rest-client');

const app = express();

app.use(bodyParser.json());

app.use('/', express.static(requesterPath));

for (let { path, method, resolver } of endpoints) {
    method = method.toLowerCase();
    path = '/rest-weather' + (path.startsWith('/') ? '' : '/') + path;

    app[method](path, resolver);

    console.log('registered "' + method + '" "' + path + '"');
}

app.listen(4000);
