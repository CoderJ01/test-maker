// React 
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

// CSS
import './TakeTest.style.css';

// URL
import { baseURL } from '../../utils/urls';
import { modifyQuestions, shuffleAnswerChoices } from './TakeTest.util';

// other imports
import axios from 'axios';

const TakeTest = ({ user }) => {
    const { testId } = useParams();

    const [pickedChoice, setPickedChoice] = useState('');
    const [test, setTest] = useState([]);
    const [questions, setQuestions] = useState([]);

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

    console.log(testId);
    console.log(pickedChoice);
    console.log(test);
    console.log(questions);

    return (
        <div className='take-test'>
            <h2>{test.title}</h2>
            <br/>
            <p style={{ textAlign: 'center' }}>{test.description}</p>
            <div className='take-test-test'>
                <form>
                    <h3>Question</h3>
                    <br/>
                    <div>
                        <input type='radio' name='test' onChange={e => setPickedChoice('A')}></input>
                        <label>choice1</label>
                    </div>
                    <br/>
                    <div>
                        <input type='radio' name='test' onChange={e => setPickedChoice('B')}></input>
                        <label>choice2</label>
                    </div>
                    <br/>
                    <div>
                        <input type='radio' name='test' onChange={e => setPickedChoice('C')}></input>
                        <label>choice3</label>
                    </div>
                    <br/>
                    <div>
                        <input type='radio' name='test' onChange={e => setPickedChoice('D')}></input>
                        <label>choice4</label>
                    </div>
                    <br/>
                    <div className='ttt-submit-answer'>
                        <button>Submit Answer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TakeTest;