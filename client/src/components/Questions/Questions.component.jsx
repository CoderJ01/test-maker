// React 
import React, { useState } from 'react';

// CSS 
import './Questions.style.css';

const Questions = ({ testId, numOfQuestions }) => {
    const [question, setQuestion] = useState('');
    const [correct, setCorrect] = useState('');
    const [choice2, setChoice2] = useState('');
    const [choice3, setChoice3] = useState('');
    const [choice4, setChoice4] = useState('');
    const [questionNumber, setQuestionNumber] = useState(1);

    console.log(numOfQuestions);

    const [questions, setQuestions] = useState([]);

    const addQuestion = (e) => {
        e.preventDefault();

        if(question === '') {
            alert('A question is required!');
            return;
        }

        if(correct === '') {
            alert('A correct choice is required!');
            return;
        }

        if(choice2 === '' && choice3 === '' && choice4 === '') {
            alert('At least one other choice is required!');
            return;
        }

        if(questionNumber === numOfQuestions + 1) {
            alert(`The maximun number of questions allowed is ${numOfQuestions}!`);
            return;
        }
        
        let questionObj = {
            question: question,
            correct: correct,
            choice2: choice2,
            choice3: choice3,
            choice4: choice4
        };

        setQuestions([...questions, questionObj]);
        setQuestionNumber(questionNumber + 1);
    }

    console.log(questions)

    return (
        <div className='questions'>
            <form>
                <div className='question'>
                    <br/>
                    <div>
                        <label htmlFor='question' id='question-heading' style={{ fontWeight: 'bold' }}>Question {questionNumber}</label><br/>
                        <input type='text' name='question' onChange={e => setQuestion(e.target.value)}></input>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='correct-answer'>Correct Answer</label><br/>
                        <input type='text' name='correct-answer' onChange={e => setCorrect(e.target.value)}></input>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='second-choice'>Choice</label><br/>
                        <input type='text' name='second-choice' onChange={e => setChoice2(e.target.value)}></input>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='third-choice'>Choice</label><br/>
                        <input type='text' name='third-choice' onChange={e => setChoice3(e.target.value)}></input>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='fourth-choice'>Choice</label><br/>
                        <input type='text' name='fourth-choice' onChange={e => setChoice4(e.target.value)}></input>
                    </div>
                    <br/>
                    <button onClick={addQuestion}>Add Question</button>
                    <br/><br/><br/>
                    <div className='question-submit'>
                        <button>Submit Test</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Questions;