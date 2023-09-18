const config = require('config.json');
const jwt = require('jsonwebtoken');

const Account = require('models/accounts').Account;

module.exports = {
    authenticate,
    getAll
};

async function authenticate({ username, password }) {
    const users = await Account.findAll();

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 1 hour
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '3600' });

    return {
        ...omitPassword(user),
        token
    };
}

async function getAll() {
    const users = await Account.findAll();
    return users;
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

