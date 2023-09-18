require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

require("dotenv").config();
 
const db = require("./db");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

db.connect();

// start server
const port = 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});