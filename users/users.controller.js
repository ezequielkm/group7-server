const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const config = require('config.json');
const { secret } = config;
const jwt = require('jsonwebtoken');

// routes
router.post('/authenticate', authenticate);
router.get('/', authenticateToken, getAll);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function getAll(req, res, next) {
        userService.getAll()
        .then(users => res.json(users))
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
