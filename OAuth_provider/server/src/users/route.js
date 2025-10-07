const express = require('express');
const router = express.Router();

const { register, login, getUserInfo } = require('./controller');

module.exports = (userCollection, accessTokenCollection, OAuthClientCollection) => {
    router.get('/userinfo', (req, res) => getUserInfo(req, res, userCollection, accessTokenCollection, OAuthClientCollection));
    router.post('/register', (req, res) => register(req, res, userCollection));
    router.post('/login', (req, res) => login(req, res, userCollection));

    return router
}