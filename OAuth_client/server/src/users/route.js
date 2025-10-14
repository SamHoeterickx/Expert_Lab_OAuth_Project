const express = require('express');
const router = express.Router(); 

const { login, register, saveUser } = require('./controller');

module.exports = (userCollection) => {
    router.post('/register', (req, res) => register(req, res, userCollection));
    router.post('/login', (req, res) => login(req, res, userCollection));
    router.post('/add-oauth-user', (req, res) => saveUser(req, res, userCollection));

    return router
}