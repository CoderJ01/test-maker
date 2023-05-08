// React
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import './UserTests.style.css';

// URL
import { baseURL } from '../../utils/urls';

// other imports
import axios from 'axios';

const UserTests = ({ user }) => {
    const [tests, setTests] = useState([]);

    const fetchTests = useCallback(async () => {
        const id = user.id;

        if(id) {
            try {
                const response = await axios.get(`${baseURL}/api/tests/all/${id}`);
                console.log(response.data);
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

    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/create-test/${user.id}`;
        navigate(path);
    }

    return (
        <div className='user-tests'>
            <h2>Your Tests</h2>
            {
                tests.length === 0 ? 
                (
                    <div className='ut-no-test'>
                        <br/>
                        <p> You have not created a test yet!</p>
                        <br/>
                    </div>
                ) :
                (
                    <div className='user-test-display'>
                    {
                        tests.map(test => {
                            return (
                                <div className='utd-single-test'>
                                    <div className='utdst-header'>
                                        <h3>{test.title}</h3>
                                        <i class='fa fa-times' aria-hidden='true'></i>
                                    </div>
                                    <p>{test.description}</p>
                                    {
                                        test.complete === true ? 
                                        (
                                            ''
                                        ) : 
                                        (
                                            <p id='utdst-incomplete'>Incomplete</p>
                                        )
                                    }
                                </div>
                            );
                        })
                    }
                    </div>
                )
            }
            <div className='ut-bottom'>
                <button onClick={routeChange}>Create New Test</button>
            </div>
        </div>
    );
}

export default UserTests;