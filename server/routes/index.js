// Express.js
const router = require('express').Router();

// routes
const userRoutes = require('./user');

router.use('/users', userRoutes);

module.exports = router;