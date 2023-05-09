// React
import React from 'react';

// CSS 
import './ViewTest.style.css';

const ViewTest = () => {
    return (
        <div className='view-test'>
            <h2>Title</h2>
            <p id='vt-description'>description</p>
            <div className='view-test-questions'>
                <div className='vtq-question'>
                    <h3>Question</h3>
                    <p>Correct answer: answer</p>
                    <p>Choice: answer</p>
                    <p>Choice: answer</p>
                    <p>Choice: answer</p>
                </div>
            </div>
        </div>
    );
}

export default ViewTest;