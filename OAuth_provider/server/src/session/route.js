const express = require('express');
const router = express.Router();

const { checkSession } = require('./controller.js');

module.exports = () => {
    router.get('/check-session', (req, res) => checkSession(req, res));
}