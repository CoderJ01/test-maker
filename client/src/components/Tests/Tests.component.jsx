// React
import React, { useState, useEffect } from 'react';

// CSS
import './Tests.style.css';

// URL
import { baseURL } from '../../utils/urls';

// other imports
import axios from 'axios';

const Tests = ({ user }) => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/tests`);
                console.log(response.data);
                setTests(response.data);
            }
            catch(error) {
                console.log(error);
            }
        }
        fetchTests();
    }, []);

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
                                <h3>{test.title}</h3>
                                <p>{test.description}</p>
                                <p id='tst-questions'>Number of Questions: {test.number_of_questions}</p>
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