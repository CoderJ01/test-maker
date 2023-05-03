// Express.js
const router = require('express').Router();

// routes
const userRoutes = require('./User');

router.use('/users', userRoutes);

module.exports = router;