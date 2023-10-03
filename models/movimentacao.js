const Sequelize = require('sequelize');
const database = require('db');
const { Estoque } = require('./estoque');
const { Product } = require('./product');

const Movimentacao = database.sequelize.define('movimentacao', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    idEstoque: {
        type: Sequelize.BIGINT,        
        references: {
            model: Estoque,
            key: 'id'
        },
        allowNull: false
    },
    tipo: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },    
    idProduto: {
        type: Sequelize.BIGINT,        
        references: {
            model: Product,
            key: 'id'
        },
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