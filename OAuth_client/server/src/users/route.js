const express = require('express');
const router = express.Router(); 

const { login } = require('./controller');

module.exports = (userCollection) => {
    router.post('/register', (req, res, userCollection));
    router.post('/login', (req, res, userCollection));
}