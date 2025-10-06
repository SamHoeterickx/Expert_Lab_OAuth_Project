const express = require('express');
const router = express.Router();

const { registerClient, authorize } = require('./controller');

module.exports = (collection) => {
    router.get('/authorize', (req, res) => authorize(req, res, collection));
    router.post('/register_client', (req, res) => registerClient(req, res, collection));
    return router
}