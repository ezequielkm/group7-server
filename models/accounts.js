const Sequelize = require('sequelize');
const database = require('db');

const Account = database.sequelize.define('accounts', {
    user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
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
}, {
    defaultScope: {
      attributes: {
        exclude: ['password']
      }
    }
  })
  const Role = database.sequelize.define('roles', {
    role_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    role_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { timestamps: false })
const AccountRoles = database.sequelize.define('accountRoles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true
    },
    role_id: {
        type: Sequelize.INTEGER,
        allowNull : false,
        foreignKey: true
    }
}, { timestamps: false })
Account.belongsToMany(Role, { through: AccountRoles, foreignKey: 'user_id' });
Role.belongsToMany(Account, { through: AccountRoles, foreignKey: 'role_id' });
module.exports = { Account, Role, AccountRoles };