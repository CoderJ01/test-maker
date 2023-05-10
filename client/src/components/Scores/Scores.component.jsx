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

    const fetchScores = useCallback(async () => {
        const id = user.id;

        if(id) {
            try {
                const response = await axios.get(`${baseURL}/api/scores/${id}`);
                console.log(response.data);
                setScores(response.data);
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
                scores.map(score => {
                    return (
                        <div className='scores-single-score'>
                            <p><span style={{ fontWeight: 'bold' }}>Test: </span>Test Name</p>
                            <p><span style={{ fontWeight: 'bold' }}>Score: </span>{score?.score}</p>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Scores;