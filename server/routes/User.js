// Express.js
const router = require('express').Router();

// other Node.js imports
const bcrypt = require('bcrypt');

// model
const User = require('../models/User');

router.post('/', async (req, res) => {
    // hash
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // find username 
    const username = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if(username) {
        res.status(400).json({ msg: 'Username must be unique!' });
        return;
    }

    // find email
    const email = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if(email) {
        res.status(400).json({ msg: 'Email must be unique!' });
        return;
    }

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