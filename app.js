const { NODE_ENV } = process.env;

// load environment variables from the .env file (ONLY IN PRODUCTION)
if (!NODE_ENV) {
    require('dotenv').config(); // eslint-disable-line global-require
}

// reqire module dependencies
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');
const yes = require('yes-https');

// instantiate the express app
const app = express();

// use verbose logging when running in development mode
app.use(logger(!NODE_ENV ? 'dev' : 'short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(compression());

// Redirect to https
app.use(yes());

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// return index.html if not other route was found
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// default error router
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const body = {
        message: err.message,
        status: err.status,
        stack: !NODE_ENV ? err.stack : null,
    };
    res.status(err.status || 500);
    res.json(body);
});

module.exports = app;
