const router = require('express').Router();
const User = require('../models/User');

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(response => {
        res.json(response);
    })
    .catch(error => {
        res.json(error);
    })
});

module.exports = router;