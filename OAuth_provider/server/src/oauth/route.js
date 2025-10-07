const express = require('express');
const router = express.Router();

const { registerClient, authorize, authConsent, token } = require('./controller');

module.exports = (collection, tokenCollection) => {
    router.get('/authorize', (req, res) => authorize(req, res, collection));
    router.post('/consent', (req, res) => authConsent(req, res, collection, tokenCollection));
    router.post('/token', (req, res) => token(req, res, collection, tokenCollection));
    router.post('/register_client', (req, res) => registerClient(req, res, collection));

    return router
}