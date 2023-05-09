// React
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// CSS 
import './ViewTest.style.css';

// URL
import { baseURL } from '../../utils/urls';

// other imports
import axios from 'axios';

const ViewTest = () => {
    const { userId, testId } = useParams();

    const [test, setTest] = useState([]);
    const [questions, setQuestions] = useState([]);

    const fetchTest = useCallback(async () => {
        const id = testId;

        if(id) {
            try {
                const response = await axios.get(`${baseURL}/api/tests/${id}`);
                console.log(response.data)
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
                console.log(response.data)
                setQuestions(response.data)

            }
            catch(error) {
                console.log(error);
            }
        }
    }, [testId]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    return (
        <div className='view-test'>
            <h2>{test.title}</h2>
            <p id='vt-description'>{test.description}</p>
            <div className='view-test-questions'>
            {
                questions.map(question => {
                    return (
                        <div className='vtq-question'>
                            <h3>{question.question_header}</h3>
                            <p>Correct answer: {question.correct_answer}</p>
                            <p>Choice: {question.second_choice}</p>
                            <p>Choice: {question.third_choice}</p>
                            <p>Choice: {question.fourth_choice}</p>
                        </div>
                    );
                })
            }
            </div>
        </div>
    );
}

export default ViewTest;