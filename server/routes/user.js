// Express.js
const router = require('express').Router();

// other Node.js packages
const bcrypt = require('bcrypt');

// model
const User = require('../models/User');
const Test = require('../models/Test');

// other imports
const generateCookie = require('../util/generateCookie');

router.post('/register', async (req, res) => {
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

router.post('/login', async (req, res) => {
    // look for user
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if(!user) {
        res.status(400).json({ msg: 'User does not exist!' });
        return;
    }

    // validate password
    const valid = await bcrypt.compare(req.body.password, user.password);

    if(!valid) {
        res.status(400).json({ msg: 'Wrong password!' });
        return;
    }

    // update cookie
    const salt = await bcrypt.genSalt(10);
    const hashedCookie = await bcrypt.hash(generateCookie(80), salt);
    user.update({ random_string: hashedCookie });

    // save
    user.save();

    res.status(200).json({
        msg: 'You have logged in successfully!',
        data: user
    });
})

router.get('/', async (req, res) => {
    await User.findAll().then(response => {
        res.json(response);
    });
});

router.get('/:id', async (req, res) => {
    await User.findOne({
        where: {
            id: req.params.id
        }
    }).then(response => {
        res.json(response);
    });
});

router.get('/test-maker/:testId', async (req, res) => {
    const test = await Test.findOne({
        where: {
            id: req.params.testId
        }
    });
    
    await User.findOne({
        where: {
            id: test.user_id
        }
    }).then(response => {
        res.json(response);
    });
});

router.delete('/:id', async (req, res) => {
    await User.destroy({
        where: {
            id: req.params.id
        }
    }).then(response => {
        res.json(response);
    });
});

module.exports = router;