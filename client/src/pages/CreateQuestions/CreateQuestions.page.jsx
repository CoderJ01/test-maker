// React 
import React, { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

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
            }
            return test;
        });
    }, [tests, pickedTest, setTestId]);

    useEffect(() => {
        retrieveIds();
    }, [retrieveIds]);
    
    console.log(testId);

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
        </div>
    );
}

export default CreateQuestions;