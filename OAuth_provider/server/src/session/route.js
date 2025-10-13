const express = require('express');
const router = express.Router();

const { checkSession } = require('./controller.js');

router.get('/check-session', (req, res) => checkSession(req, res));

module.exports = router;