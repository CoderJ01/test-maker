// Express.js
const router = require('express').Router();

// model
const Score = require('../models/Score');
const Question = require('../models/Question');

router.get('/', (req, res) => {
    res.send('Hello World');
});

router.post('/:testId/:userId', async (req, res) => {
    const questions = await Question.findAll({
        where: {
            test_id: req.params.testId
        }
    });

    let count = 0;
    for(let i = 0; i < questions.length; i++) {
        if(req.body.answers[i] === questions[i].dataValues.correct_answer) {
            count++;
        }
    }

    const score = await Score.create({
        score: (count/questions.length).toFixed(2),
        test_id: req.params.testId,
        user_id: req.params.userId
    });

    res.send({
        msg: `The score is ${score.score}!`,
        data: score
    });
});

module.exports = router;