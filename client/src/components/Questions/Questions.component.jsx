// React 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS 
import './Questions.style.css';

// utils
import { processQuestion, processSubmission } from './Questions.util';

const Questions = ({ user, testId, numOfQuestions }) => {
    const [formState, setFormState] = useState({ question: '', correct: '', choice2: '', choice3: '', choice4: '' });
    const [questionNumber, setQuestionNumber] = useState(1);
    const [questions, setQuestions] = useState([]);

    const addQuestion = (e) => {
       processQuestion(e, numOfQuestions, formState, questions, questionNumber, setQuestions, setQuestionNumber)
    }

    let navigate = useNavigate();

    const handleSubmit = (e) => {
       processSubmission(e, user, testId, questions, questionNumber, navigate);
    }

    return (
        <div className='questions'>
            <form>
                <div className='question'>
                    <br/>
                    <div>
                        <label htmlFor='question' id='question-heading' style={{ fontWeight: 'bold' }}>Question {questionNumber}</label><br/>
                        <input 
                            id='question' 
                            type='text' 
                            name='question' 
                            onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        >
                        </input>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='correct-answer'>Correct Answer</label><br/>
                        <input 
                            id='choice-1' 
                            type='text' 
                            name='correct' 
                            onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        >
                        </input>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='second-choice'>Choice</label><br/>
                        <input 
                            id='choice-2' 
                            type='text' 
                            name='choice2' 
                            onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        ></input>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='third-choice'>Choice</label><br/>
                        <input 
                            id='choice-3' 
                            type='text' 
                            name='choice3' 
                            onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        ></input>
                    </div>
                    <br/>
                    <div>
                        <label htmlFor='fourth-choice'>Choice</label><br/>
                        <input 
                            id='choice-4' 
                            type='text' 
                            name='choice4' 
                            onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value })}
                        ></input>
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