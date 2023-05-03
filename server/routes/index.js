// Express.js
const router = require('express').Router();

// routes
const userRoutes = require('./user');
const testRoutes = require('./test');

router.use('/users', userRoutes);
router.use('/tests', testRoutes);

module.exports = router;