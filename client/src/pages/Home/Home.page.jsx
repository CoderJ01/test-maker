// React 
import React from 'react';

// CSS
import './Home.style.css';

const Home = () => {
    return (
        <div className='home'>
            <div className='user-tests'>Your Tests</div>
            <div className='bottom'>
                <div className='tests'>Tests</div>
                <div className='right-panel'>
                    <div className='scores'>Scores</div>
                    <div className='logout'>Logout</div>
                </div>
            </div>
        </div>
    );
}

export default Home;