// React 
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// CSS
import './TakeTest.style.css';

// utils
import { baseURL } from '../../utils/urls';
import { modifyQuestions, shuffleAnswerChoices, setRadioButtonBlank } from './TakeTest.util';

// other imports
import axios from 'axios';

const TakeTest = ({ user }) => {
    const { testId } = useParams();

    const [pickedChoice, setPickedChoice] = useState('');
    const [test, setTest] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [testMaker, setTestMaker] = useState([]);
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

    const fetchUser = useCallback(async () => {
        const id = testId;

        if(id) {
            try {
                const response = await axios.get(`${baseURL}/api/users/test-maker/${id}`);
                setTestMaker(response.data);
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [testId]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    let navigate = useNavigate();

    const handleChoiceSubmission = (e) => {
        e.preventDefault();

        if(pickedChoice === '') {
            alert('You have not selected an answer!');
            return;
        }

        if(number + 1 <= test.number_of_questions) {
            setNumber(number + 1);
            setTestAnswers([...testAnswers, pickedChoice]);
            setPickedChoice('');
            setRadioButtonBlank();
        }
    }

    const handleTestSubmission = (e) => {
        e.preventDefault();

        if(number + 1 <= test.number_of_questions) {
           alert('You have not completed the test yet!');
           return;
        }

        const test_id = testId;
        const user_id = user.id;

        if(test_id && user_id) {
            axios.post(`${baseURL}/api/scores/${test_id}/${user_id}`,
                {
                    answers: testAnswers
                }
            )
            .then(response => {
                console.log(response);
                alert('Test has been successfully submitted!');
                let path = `/`;
                navigate(path);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    return (
        <div className='take-test'>
            <h2>{test.title}</h2>
            <h3 style={{ fontStyle: 'italic', textAlign: 'center' }}>by {testMaker?.username}</h3>
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