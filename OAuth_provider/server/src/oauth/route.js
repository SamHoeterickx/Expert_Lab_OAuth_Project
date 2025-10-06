const express = require('express');
const router = express.Router();

const { registerClient, authorize, authConsest } = require('./controller');

module.exports = (collection, userCollection) => {
    router.get('/authorize', (req, res) => authorize(req, res, collection));
    router.post('/consest', (req, res) => authConsest(req, res, collection))
    router.post('/register_client', (req, res) => registerClient(req, res, collection));
    return router
}