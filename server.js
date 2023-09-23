require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');


require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors({
    allowedHeaders: ['sessionId', 'Content-Type', 'Authorization', 'Access-Control-Allow-Origin'],
    origin: ['https//localhost:4200', 'http://localhost:4000']
}));

// use JWT auth to secure the api
app.use(jwt());
app.use(cookieParser());

app.use(cookieSession({
    name:'sess', //name of the cookie in the browser
    secret: process.env.SESSION_SECRET, //encrypting the cookie',
    httpOnly:true
    }));

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/estoque', require('./estoque/estoque.controller'));
app.use('/movimentacao', require('./movimentacao/movimentacao.controller'));



// global error handler
app.use(errorHandler);

//sync database
(async () => {
    const database = require('db');
 
    try {
        const resultado = await database.sequelize.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();

// start server
const port = 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});