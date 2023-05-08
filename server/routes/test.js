// Express.js
const router = require('express').Router();

// model
const Test = require('../models/Test');
const Questions = require('../models/Question');

router.post('/:userId', async (req, res) => {
    const title = await Test.findOne({
        where: {
            user_id: req.params.userId,
            title: req.body.title
        }
    });

    if(title) {
        res.status(400).json({ msg: 'Title needs to be unique! '});
        return;
    }

    Test.create({
        title: req.body.title,
        description: req.body.description,
        number_of_questions: req.body.number,
        user_id: req.params.userId
    })
    .then(response => {
        res.status(200).json({
            msg: 'Test has successfully been created!',
            data: response
        });
    })
    .catch(error => {
        res.json(error);
    });
});

router.get('/', async (req, res) => {
    const tests = await Test.findAll();
    res.json(tests);
});

router.get('/all/:userId', async (req, res) => {
    const userTests = await Test.findAll({
        where: {
            user_id: req.params.userId,
        }
    });
    res.json(userTests);
});


router.get('/false/:userId', async (req, res) => {
    const userTests = await Test.findAll({
        where: {
            user_id: req.params.userId,
            complete: false
        }
    });
    res.json(userTests);
});

router.delete('/:id', async (req, res) => {
    await Questions.destroy({
        where: {
            test_id: req.params.id
        }
    });
    
    await Test.destroy({
        where: {
            id: req.params.id
        }
    }).then(response => {
        res.json(response);
    });
});

module.exports = router;