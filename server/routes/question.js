// Express.js
const router = require('express').Router();

// model
const Question = require('../models/Question');
const Test = require('../models/Test');

router.post('/:testId', async (req, res) => {
    // create question
    let questionSet = [];

    for(let i = 0; i < req.body.questions.length; i++) {
        questionSet[i] = Question.create({
            question_header: req.body.questions[i].question,
            correct_answer: req.body.questions[i].correct,
            second_choice: req.body.questions[i].choice2,
            third_choice: req.body.questions[i].choice3,
            fourth_choice: req.body.questions[i].choice4,
            test_id: req.params.testId
        });
    }

    // update test status
    const test = await Test.findOne({
        where: {
            id: req.params.testId
        }
    });

    test.complete = true;
    test.number_of_questions = questionSet.length;
    test.save();

    res.status(200).json({
        msg: 'Questions have been successfully created!',
        data: questionSet
    });
});

router.get('/:testId', async (req, res) => {
    const questions = await Question.findAll({
        where: {
            test_id: req.params.testId
        }
    });
    res.json(questions);
});

router.delete('/:id', async (req, res) => {
    await Question.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(response => {
        res.json(response);
    });
});

module.exports = router;