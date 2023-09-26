const config = require('config.json');
const jwt = require('jsonwebtoken');

const Account = require('models/accounts').Account;

const Role = require('models/accounts').Role;

const AccountRoles = require('models/accounts').AccountRoles;

const crypto = require('crypto');


module.exports = {
    authenticate,
    getAll,
    createAccount,
    deleteAccount,
    authenticateGit,
    getUserWithRoles,
    isUserAdmin,
    getRoles
};

let username = '';
let password = '';
let email = '';

async function authenticate({ username, password }) {
    //added null scope to this call so it will retrieve password as well. This is needed because default scope is hiding password values.
    const accounts = await Account.scope(null).findAll();

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
    //if we get here we already have an authenticated git account so we don't need to check its password.
    const account = accounts.find(u => u.username === username && u.email === email);

    if (!account) {
        password = crypto.randomBytes(4).toString('hex');
        username = username;
        email = email;
        const createdAccount = await createAccount({username, password , email});
        const token = jwt.sign({ sub: createdAccount.user_id }, config.secret, { expiresIn: '3h' });
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

async function getAll(includeRoles) {
    if (includeRoles) {
        const accounts = await Account.findAll({
            include: [
              Role,
            ],
          });
          return accounts;
    }
    else {
        const accounts = await Account.findAll();
        return accounts;
    }
}
async function getUserWithRoles(user_id) {
    return Account.findAll({where: {user_id: user_id}, include: [Role]});
}

async function isUserAdmin(user_id) {
    const user = await AccountRoles.findOne({
        where: {
          user_id: user_id,
          role_id: 2
        }
      });
    return user;
}

async function getRoles() {
    const roles = await Role.findAll();
    return roles;
}

async function createAccount({ username, password, email, roles}) {
        
        // Create a Account
        const account = {
          username: username,
          password: password,
          email: email
        };
        const createdAccount = await Account.create(account);
        if (roles != undefined) {
            roles.forEach(async role => {
                const userRole = await AccountRoles.create({user_id: createdAccount.user_id, role_id: role.role_id});
            });    
        }
        else {
            const userRole = await AccountRoles.create({user_id: createdAccount.user_id, role_id: 1});
        }
        return createdAccount;
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
    await AccountRoles.destroy({
        where: {
            user_id: id
        }
    });
}


