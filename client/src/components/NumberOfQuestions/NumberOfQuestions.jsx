// React
import React, { useState, useEffect, useCallback } from 'react';

// CSS
import './NumberOfQuestions.css';

// URL
import { baseURL } from '../../utils/urls';

// other imports
import axios from 'axios';

const NumberOfQuestions = ({ testId }) => {
    const [questions, setQuestions] = useState();

    const fetchQuestions = useCallback(async () => {
        const id = testId;

        if(id) {
            if(id) {
                try {
                    const response = await axios.get(`${baseURL}/api/questions/${id}`);
                    setQuestions(response.data);
                }
                catch(error) {
                    console.log(error);
                }
            }
        }
    }, [testId]);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    return (
        <p id='tst-questions'>Number of Questions: {questions?.length}</p>
    )
}

export default NumberOfQuestions;