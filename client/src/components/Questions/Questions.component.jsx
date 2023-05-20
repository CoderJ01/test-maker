// React 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS 
import './Questions.style.css';

// URL
import { baseURL } from '../../utils/urls';

// other imports
import axios from 'axios';

const Questions = ({ user, testId, numOfQuestions }) => {
    const [question, setQuestion] = useState('');
    const [correct, setCorrect] = useState('');
    const [choice2, setChoice2] = useState('');
    const [choice3, setChoice3] = useState('');
    const [choice4, setChoice4] = useState('');
    const [questionNumber, setQuestionNumber] = useState(1);
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
            alert(`The maximum number of questions allowed is ${numOfQuestions}!`);
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

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(questionNumber < 10) {
            alert('Every test must have at least 10 questions!');
            return;
        }

        const id = user.id;

        if(id) {
            axios.post(`${baseURL}/api/questions/${testId}`, {
                questions: questions
            })
            .then(response => {
                console.log(response);
                alert(response.data.msg);
                let path = '/';
                navigate(path);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

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
                    <button id='question-add' onClick={addQuestion}>Add</button>
                    <br/><br/>
                    <div className='question-submit'>
                        <button onClick={handleSubmit}>Submit Test</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Questions;