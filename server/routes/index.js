// Express.js
const router = require('express').Router();

// routes
const userRoutes = require('./user');
const testRoutes = require('./test');
const questionRoutes = require('./question');
const scoreRoutes = require('./score');

router.use('/users', userRoutes);
router.use('/tests', testRoutes);
router.use('/questions', questionRoutes);
router.use('/scores', scoreRoutes);

module.exports = router;