const express = require('express');
const router = express.Router(); 

const { login, register, saveUser, getMyUserData, logout } = require('./controller');

module.exports = (userCollection) => {
    router.get('/get-my-data', (req, res) => getMyUserData(req, res, userCollection));
    router.get('/logout', (req, res) => logout(req, res));
    router.post('/register', (req, res) => register(req, res, userCollection));
    router.post('/login', (req, res) => login(req, res, userCollection));
    router.post('/add-oauth-user', (req, res) => saveUser(req, res, userCollection));

    return router
}