// Express.js
const router = require('express').Router();

// model
const Test = require('../models/Test');

router.post('/:userId', async (req, res) => {
    Test.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.params.userId
    })
    .then(response => {
        res.json(response);
    })
    .catch(error => {
        res.json(error);
    });
});

router.get('/', async (req, res) => {
    const tests = await Test.findAll();
    res.json(tests);
});

router.get('/:userId', async (req, res) => {
    const userTests = await Test.findAll({
        where: {
            user_id: req.params.userId
        }
    });
    res.json(userTests);
});

router.delete('/:id', async (req, res) => {
    await Test.destroy({
        where: {
            id: req.params.id
        }
    }).then(response => {
        res.json(response);
    });
});

module.exports = router;