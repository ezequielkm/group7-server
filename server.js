require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

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