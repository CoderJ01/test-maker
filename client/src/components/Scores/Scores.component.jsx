// React
import React, { useState, useEffect, useCallback } from 'react';

// CSS
import './Scores.style.css';

// URL
import { baseURL } from '../../utils/urls';

// other imports
import axios from 'axios';

const Scores = ({ user }) => {
    const [scores, setScores] = useState([]);
    const [tests, setTests] = useState([]);

    const fetchScores = useCallback(async () => {
        const id = user.id;

        if(id) {
            try {
                const response = await axios.get(`${baseURL}/api/scores/${id}`);
                setScores(response.data.scores);
                setTests(response.data.tests);
            }
            catch(error) {
                console.log(error);
            }
        }
    }, [user.id]);

    useEffect(() => {
        fetchScores();
    }, [fetchScores]);

    return (
        <div className='scores'>
            <h2>Scores</h2>
            {
                scores.map((score , i) => {
                    return (
                        <div className='scores-single-score'>
                            <p><span style={{ fontWeight: 'bold' }}>Test: </span>{tests[i]?.title}</p>
                            <p><span style={{ fontWeight: 'bold' }}>Score: </span>{(score?.score) * 100}%</p>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Scores;