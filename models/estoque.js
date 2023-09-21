const Sequelize = require('sequelize');
const database = require('db');

const Estoque = database.sequelize.define('estoque', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = { Estoque };