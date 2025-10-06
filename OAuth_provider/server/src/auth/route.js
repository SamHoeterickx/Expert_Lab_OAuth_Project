const express = require('express');
const router = express.Router();

const { registerClient } = require('./controller');

module.exports = (collection) => {
    router.post('/register_client', (req, res) => registerClient(req, res, collection));

    return router
}