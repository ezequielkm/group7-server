const config = require('config.json');
const jwt = require('jsonwebtoken');

const Account = require('models/accounts').Account;

module.exports = {
    authenticate,
    getAll,
    createAccount
};

async function authenticate({ username, password }) {
    const users = await Account.findAll();

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 3 hours
    const token = jwt.sign({ sub: user.user_id }, config.secret, { expiresIn: '3h' });

    return {
        user,
        token
    };
}

async function getAll() {
    const users = await Account.findAll();
    return users;
}

async function createAccount({ username, password, email }) {
      
        // Create a Account
        const account = {
          username: username,
          password: password,
          email: email
        };
      
        // Save Tutorial in the database
        Account.create(account);
      };



