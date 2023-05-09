// React 
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// CSS
import './TakeTest.style.css';

// URL
import { baseURL } from '../../utils/urls';
import { modifyQuestions, shuffleAnswerChoices } from './TakeTest.util';

// other imports
import axios from 'axios';

const TakeTest = ({ user }) => {
    const { testId } = useParams();

    const [pickedChoice, setPickedChoice] = useState('');
    const [test, setTest] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [number, setNumber] = useState(0);
    const [testAnswers, setTestAnswers] = useState([]);

    const fetchTest = useCallback(async () => {
        const id = testId;

        if(id) {
            try {
                const response = await axios.get(`${baseURL}/api/tests/single-test/${id}`);
                setTest(response.data);
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [testId]);

    useEffect(() => {
        fetchTest();
    }, [fetchTest]);

    const fetchQuestions = useCallback(async () => {
        const id = testId;

        if(id) {
            try {
                const response = await axios.get(`${baseURL}/api/questions/${id}`);
                
                let modifiedQuestions = modifyQuestions(response.data);
                
                for(let i = 0; i < modifiedQuestions.length; i++) {
                    shuffleAnswerChoices(modifiedQuestions[i].choices);
                }
                
                setQuestions(modifiedQuestions)
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [testId]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const handleChoiceSubmission = (e) => {
        e.preventDefault();

        if(pickedChoice === '') {
            alert('You have not selected an answer!');
            return;
        }

        if(number + 1 <= test.number_of_questions) {
            setNumber(number + 1);
            setTestAnswers([...testAnswers, pickedChoice]);
        }
    }

    console.log(testAnswers);

    return (
        <div className='take-test'>
            <h2>{test.title}</h2>
            <br/>
            <p style={{ textAlign: 'center' }}>{test.description}</p>
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
                                    <div>
                                        <input type='radio' name='test' onChange={e => setPickedChoice(questions[number]?.choices[i])}></input>
                                        <label>{questions[number]?.choices[i]}</label>
                                    </div>
                                    <br/>
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
        </div>
    );
}

export default TakeTest;