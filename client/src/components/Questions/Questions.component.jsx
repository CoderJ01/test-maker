// React 
import React, { useState } from 'react';

const Questions = ({ testId, numOfQuestions }) => {
    const [question, setQuestion] = useState('');
    const [correct, setCorrect] = useState('');
    const [choice2, setChoice2] = useState('');
    const [choice3, setChoice3] = useState('');
    const [choice4, setChoice4] = useState('');

    const addQuestion = (e) => {
        e.preventDefault();
    }

    return (
        <div className='cq-questions'>
            <form>
            {
                Array.apply(0, Array(1)).map(function(x, i) {
                    return (
                        <div className='cqq-single-question'>
                            <br/>
                            <div>
                                <label htmlFor='question' id='cqqsq-heading' style={{ fontWeight: 'bold' }}>Question</label><br/>
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