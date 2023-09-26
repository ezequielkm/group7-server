const Sequelize = require('sequelize');
const database = require('db');

const Product = database.sequelize.define('produto', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.ENUM('carne', 'kit', 'acessório'),
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    vencimento: {
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

module.exports = { Product };