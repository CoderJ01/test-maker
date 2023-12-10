// React 
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// CSS
import './TakeTest.style.css';

// utils
import { processChoiceSubmission, processTestSubmission } from './TakeTest.util';
import { GetData } from '../../utils/requests';

const TakeTest = ({ user }) => {
    const { testId } = useParams();

    const [pickedChoice, setPickedChoice] = useState('');
    const [number, setNumber] = useState(0);
    const [testAnswers, setTestAnswers] = useState([]);

    const test = GetData(`api/tests/single-test/${testId}`);
    const questions = GetData(`api/questions/${testId}`, false, true);
    const testMaker = GetData(`api/users/test-maker/${testId}`);

    let navigate = useNavigate();

    const handleChoiceSubmission = (e) => {
        processChoiceSubmission(e, pickedChoice, number, questions, testAnswers, setNumber, setTestAnswers, setPickedChoice);
    }

    const handleTestSubmission = (e) => {
        processTestSubmission(e, number, questions, testId, testAnswers, user, navigate);
    }

    return (
        <div className='take-test'>
            <h2>{test?.data?.title}</h2>
            <h3 style={{ fontStyle: 'italic', textAlign: 'center' }}>by {testMaker?.data?.username}</h3>
            <br/>
            <p style={{ textAlign: 'center' }}>{test?.data?.description}</p>
            <div className='take-test-test'>
                <form>
                {
                    number + 1 <= questions.length ? 
                    (
                        <>
                        <h3>Question {number + 1}: {questions[number]?.question}</h3>
                        <br/>
                        {
                            Array.apply(0, Array(4)).map(function(x, i) {
                                return (
                                    <>
                                    {
                                        questions[number]?.choices[i] === '' ? 
                                        (
                                            ''
                                        ) :
                                        (
                                            <>
                                            <div>
                                                <input id={`choice-bttn-${i}`} type='radio' name='test' onChange={e => setPickedChoice(questions[number]?.choices[i])}></input>
                                                <label>{questions[number]?.choices[i]}</label>
                                            </div>
                                            <br/>
                                            </>
                                        )
                                    }

                                    </>
                                );
                            })
                        }
                        <div className='ttt-submit-answer'>
                            <button onClick={handleChoiceSubmission}>Submit Answer</button>
                        </div>
                        </>
                    ) : 
                    (
                        <h3>You have completed the test!</h3>
                    )
                }
                </form>
            </div>
            <br/><br/>
            <div className='tt-submit-test'>
                <button onClick={handleTestSubmission}>Submit Test</button>     
            </div>
        </div>
    );
}

export default TakeTest;