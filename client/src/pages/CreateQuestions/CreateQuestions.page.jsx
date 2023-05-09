// React 
import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

// CSS
import './CreateQuestions.style.css';

// components
import Questions from '../../components/Questions/Questions.component';
import Register from '../../components/Register/Register.component';

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
    const [numOfQuestions, setNumOfQuestions] = useState(0);

    const fetchTest = useCallback(async () => {
        const id = userId;

        if(id) {
            try {
                const response = await axios.get(`${baseURL}/api/tests/false/${id}`);
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
        let userTests = [];
        tests.filter(test => {
            userTests.push(test.title);
            return test;
        });
        setTestTitles(userTests);
    }, [tests]);

    useEffect(() => {
        retrieveNames();
    }, [retrieveNames]);

    const retrieveIds = useCallback(() => {
        tests.filter(test => {
            if(pickedTest === test.title) {
                setTestId(test.id);
                setNumOfQuestions(test.number_of_questions);
            }
            return test;
        });
    }, [tests, pickedTest, setTestId, setNumOfQuestions]);

    useEffect(() => {
        retrieveIds();
    }, [retrieveIds]);

    if(userId.length === 0) {
        return (
            <Register/>
        );
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
            <Questions testId={testId} numOfQuestions={numOfQuestions}/>
        </div>
    );
}

export default CreateQuestions;