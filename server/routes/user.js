// Express.js
const router = require('express').Router();

// other Node.js packages
const bcrypt = require('bcrypt');

// model
const User = require('../models/User');
const Test = require('../models/Test');

// other imports
const generateCookie = require('../util/generateCookie');
const validateEmail = require('../util/validateEmail');

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

    // create user
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass
    });

    // validate user's email
    validateEmail(newUser.username, newUser.email, 'newUser');

    res.json({
        msg: `Hello ${newUser.username}! An email has been sent to verify your email.`,
        data: newUser
    });
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

    if(!user.verified) {
        res.status(400).json({ msg: `Your email has yet to be verified. An email has been sent to ${user.email}.` });
        validateEmail(user.username, user.email, 'login');
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

router.put('/:id', async (req, res) => {
    console.log(req.params.id);
    const user = await User.findOne({
        where: {
            id: req.params.id
        } 
    });

    const email = await User.findOne({
        where: { 
            email: req.body.email 
        }
    });

    let message = 'Infomation has been updated!';

    if(email) {
        return res.status(400).json({ msg: 'Email must be unique!' });
    }
    
    if(req.body.email !== '') {
        user.email = req.body.email;
        user.verified = false;
        validateEmail(user.username, user.email, 'updateEmail');
        message = `A verification link will be sent to ${user.email}. Wait 5 - 10 minutes for the link.`;
    }

    if(req.body.oldPassword !== '' && req.body.newPassword !== '') {
        const validate = await bcrypt.compare(req.body.oldPassword, user.password);
        if(!validate) {
            return res.status(400).json({ msg: 'Old password is wrong!' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.newPassword, salt);
        user.password = hashedPass;
    }

    user.save();

    res.send({
        email: user.email,
        msg: message
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