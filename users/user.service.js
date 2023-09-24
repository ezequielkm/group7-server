const config = require('config.json');
const jwt = require('jsonwebtoken');

const Account = require('models/accounts').Account;

const crypto = require('crypto');

module.exports = {
    authenticate,
    getAll,
    createAccount,
    deleteAccount,
    authenticateGit
};

let username = '';
let password = '';
let email = '';

async function authenticate({ username, password }) {
    const accounts = await Account.findAll();

    const account = accounts.find(u => u.username === username && u.password === password);

    if (!account) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 3 hours
    const token = jwt.sign({ sub: account.user_id }, config.secret, { expiresIn: '3h' });

    return {
        account,
        token
    };
}

async function authenticateGit({ username, email }) {
    const accounts = await Account.findAll();

    const account = accounts.find(u => u.username === username && u.email === email);

    if (!account) {
        password = crypto.randomBytes(4).toString('hex');
        username = username;
        email = email;
        await createGitAccount(username, password , email);
        const accounts = await Account.findAll();
        const account = accounts.find(u => u.username === username && u.email === email);
        const token = jwt.sign({ sub: user.user_id }, config.secret, { expiresIn: '3h' });
        return {
            account,
            token
        };
    }

    // create a jwt token that is valid for 3 hours
    const token = jwt.sign({ sub: account.user_id }, config.secret, { expiresIn: '3h' });

    return {
        account,
        token
    };
}

async function getAll() {
    const accounts = await Account.findAll();
    return accounts;
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

      async function createGitAccount(username, password , email) {
      
        // Create a Account
        const account = {
          username: username,
          password: password,
          email: email
        };
      
        // Save Tutorial in the database
        await Account.create(account);
      };

async function deleteAccount(id) {
    if (id == '2') {
        throw 'You cannot delete the admin account';
    }
    await Account.destroy({
        where: {
            user_id: id
        }
    });
}


