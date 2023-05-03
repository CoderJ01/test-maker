// Express.js
const router = require('express').Router();

// other Node.js imports
const bcrypt = require('bcrypt');

// model
const User = require('../models/User');

router.post('/', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass
    })
    .then(response => {
        res.json(response);
    })
    .catch(error => {
        res.json(error);
    })
});

module.exports = router;