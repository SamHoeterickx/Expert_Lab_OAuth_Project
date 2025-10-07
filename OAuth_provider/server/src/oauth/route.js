const express = require('express');
const router = express.Router();

const { registerClient, authorize, authConsent, token } = require('./controller');

module.exports = (collection) => {
    router.get('/authorize', (req, res) => authorize(req, res, collection));
    router.post('/consent', (req, res) => authConsent(req, res, collection));
    router.post('/token', (req, res) => token(req, res, collection));
    router.post('/register_client', (req, res) => registerClient(req, res, collection));

    return router
}