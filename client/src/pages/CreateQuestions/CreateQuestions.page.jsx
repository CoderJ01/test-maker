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

    const [tests, setTests] = useState([]);
    const [testTitles, setTestTitles] = useState([]);
    const [pickedTest, setPickedTest] = useState('');
    const [testId, setTestId] = useState('');
    const [questionNumber, setQuestionNumber] = useState(0);

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

    console.log(questionNumber);

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
                Array.apply(0, Array(questionNumber)).map(function(x, i) {
                    return (
                       <>
                       <br/>
                        <div>
                            <label htmlFor='question'>Question {i + 1}</label><br/>
                            <input type='text' name='question'></input>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor='correct-answer'>Correct Answer</label><br/>
                            <input type='text' name='correct-answer'></input>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor='second-choice'>Choice</label><br/>
                            <input type='text' name='second-choice'></input>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor='third-choice'>Choice</label><br/>
                            <input type='text' name='third-choice'></input>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor='fourth-choice'>Choice</label><br/>
                            <input type='text' name='fourth-choice'></input>
                        </div>
                       </>
                    );
                })
            }
            </form>
            </div>
        </div>
    );
}

export default CreateQuestions;