// React 
import React, { useState } from 'react';

// CSS 
import './Questions.style.css';

const Questions = ({ testId, questionNumber }) => {
    const [question, setQuestion] = useState('');
    const [correct, setCorrect] = useState('');
    const [choice2, setChoice2] = useState('');
    const [choice3, setChoice3] = useState('');
    const [choice4, setChoice4] = useState('');

    const [questions, setQuestions] = useState([]);

    const addQuestion = (e) => {
        e.preventDefault();
        
        let questionObj = {
            question: question,
            correct: correct,
            choice2: choice2,
            choice3: choice3,
            choice4: choice4
        };
        
        setQuestions([...questions, questionObj]);
    }

    console.log(questions)

    return (
        <div className='questions'>
            <form>
            {
                Array.apply(0, Array(1)).map(function(x, i) {
                    return (
                        <div className='question'>
                            <br/>
                            <div>
                                <label htmlFor='question' id='question-heading' style={{ fontWeight: 'bold' }}>Question</label><br/>
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
                            <button onClick={addQuestion}>Add</button>
                        </div>
                    );
                })
            }
            </form>
        </div>
    );
}

export default Questions;