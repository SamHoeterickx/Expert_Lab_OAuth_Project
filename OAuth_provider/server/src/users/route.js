const express = require('express');
const router = express.Router();

const { register, login } = require('./controller');

module.exports = (collection) => {
    router.post('/register', (req, res) => register(req, res, collection));
    router.post('/login', (req, res) => login(req, res, collection));

    return router
}