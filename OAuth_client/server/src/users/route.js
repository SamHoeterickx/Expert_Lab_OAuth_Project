const express = require('express');
const router = express.Router(); 

const { login, register } = require('./controller');

module.exports = (userCollection) => {
    router.post('/register', (req, res) => register(req, res, userCollection));
    router.post('/login', (req, res) => login(req, res, userCollection));

    return router
}