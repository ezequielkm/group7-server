const Sequelize = require('sequelize');
const database = require('db');

const Movimentacao = database.sequelize.define('movimentacao', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idEstoque: {
        type: Sequelize.STRING,        
        allowNull: false        
    },
    tipo: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    produto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.REAL,
        allowNull: false
    },
    preco: {
        type: Sequelize.REAL,
        allowNull: false
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
})
module.exports = { Movimentacao };