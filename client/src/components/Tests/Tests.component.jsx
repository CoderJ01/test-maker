// React
import React, { useState, useEffect, useCallback } from 'react';

// CSS
import './Tests.style.css';

// components
import NumberOfQuestions from '../NumberOfQuestions/NumberOfQuestions';

// URL
import { baseURL, baseURL_client } from '../../utils/urls';

// other imports
import axios from 'axios';

const Tests = ({ user }) => {
    const [tests, setTests] = useState([]);

    const fetchTests = useCallback(async () => {
        const id = user.id;

        if(id) {
            try {
                const response = await axios.get(`${baseURL}/api/tests/other-users/${id}`);
                setTests(response.data);
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [user.id]);

    useEffect(() => {
        fetchTests();
    }, [fetchTests]);

    return (
        <div className='tests'>
            <h2>Tests</h2>
            {
                tests.length === 0 ? 
                (
                    <>
                    <br/>
                    <p style={{ textAlign: 'center' }}>No other users have created a test yet!</p>
                    </>
                ) :
                (
                    tests.map(test => {
                        return (
                            <div className='test-single-test'>
                                <h3><a href={`${baseURL_client}/take-test/${test.id}`} target='_blank' rel='noopener noreferrer'>{test.title}</a></h3>
                                <p>{test.description}</p>
                                {/* <p id='tst-questions'>Number of Questions: {test.number_of_questions}</p> */}
                                <NumberOfQuestions testId={test.id}/>
                            </div>
                        );
                    })
                )
            }
            {

            }
        </div>
    );
}

export default Tests;