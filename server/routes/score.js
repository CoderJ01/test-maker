// Express.js
const router = require('express').Router();

// model
const Score = require('../models/Score');

router.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = router;