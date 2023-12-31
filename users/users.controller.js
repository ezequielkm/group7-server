const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const config = require('config.json');
const { secret } = config;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const axios = require('axios');
const cors = require('cors');

// routes
router.post('/authenticate', authenticate);
router.post('/authenticateGit', authenticateGit);
router.get('/', authenticateToken, getAll);
router.post('/', createAccount);
router.get('/user/:id', authenticateToken, authorizeAdmin, getUser);
router.put('/:id', authenticateToken, authorizeAdmin, editAccount);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteAccount);
router.get('/roles', authenticateToken, getRoles);
router.get('/AuthPage', oauthGitHub);
router.post('/getAccessToken', getToken);
router.get('/getUserDetails', getUserDetails);
router.post('/logout', logout);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function authenticateGit(req, res, next) {
  userService.authenticateGit(req.body)
      .then(user => res.json(user))
      .catch(next);
}

function logout(req, res, next) {
  res.clearCookie('XSRF-TOKEN');
  res.clearCookie('login');
  res.clearCookie('sess');  
  res.clearCookie('sess.sig');
  res.end();
}

function getAll(req, res, next) {
        userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getUser(req, res, next) {
  userService.getUserWithRoles(req.params.id)
  .then(user => res.json(user))
  .catch(next);
}

function getRoles(req, res, next) {
  userService.getRoles()
  .then(roles => res.json(roles))
  .catch(next);
}

function createAccount (req, res) {
    userService.createAccount(req.body)
        .then(() => res.json({}))
        .catch(err => res.status(400).json({ message: err }));
}

function editAccount (req, res) {
  userService.editAccount(req.params.id, req.body)
      .then(() => res.json({}))
      .catch(err => res.status(400).json({ message: err }));
}

function deleteAccount(req, res, next) {
    userService.deleteAccount(req.params.id)
        .then(() => res.json({}))
        .catch(next);
}

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'],
    token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) {
      console.log('authenticateToken-401')
      return res.sendStatus(401) // There isn't any token.
    }
    // It never reaches this point !!!
  
    jwt.verify(token, secret, (err, user) => {
      console.log(err)
      if (err) {
        console.log('authenticateToken-403')
        return res.sendStatus(403)
      }
      req.userId = user.sub
      next();
    })
}

async function authorizeAdmin(req, res, next) {
  let isAdmin = await userService.isUserAdmin(req.userId)
  if(isAdmin){
    next();
  }
  else {
    console.log('authorizeAdmin-403')
    return res.sendStatus(403);
  }
}

function oauthGitHub(req, res) {
  let state = crypto.randomBytes(16).toString('hex');
  res.cookie('XSRF-TOKEN', state);
  res.send({ authUrl: "https://github.com/login/oauth/authorize?client_id=" + process.env.CLIENT_ID + '&redirect_uri=' + process.env.REDIRECT_URI + '&scope=read:user&allow_signup=' + true + '&state=' + state });
}


function getToken(req, res) {
  let state = req.headers['x-xsrf-token'];
  axios({
    url: 'https://github.com/login/oauth/access_token?client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET + '&code=' + req.body.code + '&redirect_uri=' + process.env.REDIRECT_URI + '&state=' + state,
    method: 'POST',
    headers: { 'Accept': 'application/json' }
  })
    .then(function (resp) {
      if (resp.data.access_token) {
        req.session.token = resp.data.access_token;
      }
      res.send(resp.data);
    })
    .catch(function (err) {
      res.send(err);
    })
};

function getUserDetails(req, res) {
  if (req.session.token) {
    axios({
      url: 'https://api.github.com/user',
      method: 'GET',
      headers: { 'Authorization': "token" + " " + req.session.token }
    })
      .then(function (resp) {
        res.cookie('login', resp.data.login, { httpOnly: true });
        res.send(resp.data);
      })
      .catch(function (err) {
        res.send(err);
      })
  }
  else {
    res.status(401).send();
  }
}
