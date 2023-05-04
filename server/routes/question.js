// Express.js
const router = require('express').Router();

// model
const Question = require('../models/Question');

router.post('/:testId', async (req, res) => {
    await Question.create({
        question_header: req.body.question_header,
        correct_answer: req.body.correct_answer,
        second_choice: req.body.second_choice,
        third_choice: req.body.third_choice,
        fourth_choice: req.body.fourth_choice,
        test_id: req.params.testId
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error);
    });
});

module.exports = router;