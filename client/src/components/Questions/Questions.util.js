import { postInfo } from "../../utils/requests";

export const processQuestion = (e, numOfQuestions, form, questions, questionNumber, setQuestions, setQuestionNumber) => {
    e.preventDefault();

    if(form.question === '') {
        alert('A question is required!');
        return;
    }

    if(form.correct === '') {
        alert('A correct choice is required!');
        return;
    }

    if(form.choice2 === '' && form.choice3 === '' && form.choice4 === '') {
        alert('At least one other choice is required!');
        return;
    }

    if(questionNumber === numOfQuestions + 1) {
        alert(`The maximum number of questions allowed is ${numOfQuestions}!`);
        return;
    }
    
    let questionObj = {
        question: form.question,
        correct: form.correct,
        choice2: form.choice2,
        choice3: form.choice3,
        choice4: form.choice4
    };

    if(questions.length >= 1) {
        if(questionObj.question.trim() === questions[questions.length - 1].question.trim()) {
            alert('This question is the same as the previous question.');
            return;
        }
    }

    setQuestions([...questions, questionObj]);
    setQuestionNumber(questionNumber + 1);
    setTextFieldsBlank();
}

const setTextFieldsBlank = () => {
    let field = [];
    
    // looping proves to be ineffective for this type of task
    field[0] = document.getElementById('question');
    field[1] = document.getElementById('choice-1');
    field[2] = document.getElementById('choice-2');
    field[3] = document.getElementById('choice-3');
    field[4] = document.getElementById('choice-4');

    field[0].value = '';
    field[1].value = '';
    field[2].value = '';
    field[3].value = '';
    field[4].value = '';
}

export const processSubmission = (e, user, testId, questions, questionNumber, navigate) => {
    e.preventDefault();

    if(questionNumber < 10) {
        alert('Every test must have at least 10 questions!');
        return;
    }

    if(user.id) {
        postInfo(`api/questions/${testId}`, questions, navigate);
    }
}