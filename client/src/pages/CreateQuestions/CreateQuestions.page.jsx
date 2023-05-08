// React 
import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

// CSS
import './CreateQuestions.style.css';

// url
import { baseURL } from '../../utils/urls';

// other imports
import axios from 'axios';

const CreateQuestions = () => {
    const { userId } = useParams();

    // test
    const [tests, setTests] = useState([]);
    const [testTitles, setTestTitles] = useState([]);
    const [pickedTest, setPickedTest] = useState('');
    const [testId, setTestId] = useState('');
    const [questionNumber, setQuestionNumber] = useState(0);

    // question
    const [question, setQuestion] = useState([]);
    const [correct, setCorrect] = useState('');
    const [choice2, setChoice2] = useState('');
    const [choice3, setChoice3] = useState('');
    const [choice4, setChoice4] = useState('');

    const fetchTest = useCallback(async () => {
        const id = userId;

        if(id) {
            try {
                const response = await axios.get(`${baseURL}/api/tests/${id}`);
                setTests(response.data);
                setPickedTest(response.data[0].title)
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [userId, setTests]);

    useEffect(() => {
        fetchTest();
    }, [fetchTest]);

    const retrieveNames =  useCallback(() => {
        let incompleteTests = [];
        tests.filter(test => {
            if(test.complete === false) {
                incompleteTests.push(test.title);
            }
            return test;
        });
        setTestTitles(incompleteTests);
    }, [tests]);

    useEffect(() => {
        retrieveNames();
    }, [retrieveNames]);

    const retrieveIds = useCallback(() => {
        tests.filter(test => {
            if(pickedTest === test.title) {
                setTestId(test.id);
                setQuestionNumber(test.number_of_questions);
            }
            return test;
        });
    }, [tests, pickedTest, setTestId, setQuestionNumber]);

    useEffect(() => {
        retrieveIds();
    }, [retrieveIds]);

    console.log(testId)

    const addQuestion = (e) => {
        e.preventDefault();
    }

    if(tests.length === 0) {
        return (
            <div className='create-questions'>
                <h2>You have yet to create a test</h2>
            </div>
        );
    }

    return (
        <div className='create-questions'>
            <h2>Create Questions</h2>
            <div className='cq-selection'>
                <select 
                    value={pickedTest} 
                    onChange={e => setPickedTest(e.target.value)}
                >
                    {testTitles.map((value) => (
                    <option value={value} key={value}>
                        {value}
                    </option>
                    ))}
                </select>
            </div>
            <div className='cq-questions'>
                <form>
                {
                    Array.apply(0, Array(1)).map(function(x, i) {
                        return (
                            <div className='cqq-single-question'>
                                <br/>
                                <div>
                                    <label htmlFor='question' id='cqqsq-heading' style={{ fontWeight: 'bold' }}>Question {i + 1}</label><br/>
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
        </div>
    );
}

export default CreateQuestions;