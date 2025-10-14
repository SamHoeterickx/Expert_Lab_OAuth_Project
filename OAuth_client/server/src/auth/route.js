const express = require('express');
const router = express.Router();

const { auth } = require('./controller');

module.exports = (authStateCollection) => {
    router.get('/auth', (req, res) => auth(req, res, authStateCollection));
    return router
}