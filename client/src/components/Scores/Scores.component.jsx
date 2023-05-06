// React
import React from 'react';

// CSS
import './Scores.style.css';

const Scores = () => {
    return (
        <div className='scores'>
            <h2>Scores</h2>
            <div className='scores-single-score'>
                <p><span style={{ fontWeight: 'bold' }}>Test: </span>Test Name</p>
                <p><span style={{ fontWeight: 'bold' }}>Score: </span>80</p>
            </div>
        </div>
    );
}

export default Scores;