// Express.js
const router = require('express').Router();

// routes
const userRoutes = require('./user');
const testRoutes = require('./test');
const questionRoutes = require('./question');

router.use('/users', userRoutes);
router.use('/tests', testRoutes);
router.use('/questions', questionRoutes);

module.exports = router;