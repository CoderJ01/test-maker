// React 
import React from 'react';

// CSS
import './Home.style.css';

const Home = () => {
    return (
        <div className='home'>
            <div className='user-tests'></div>
            <div className='bottom'>
                <div className='tests'></div>
                <div>
                    <div className='scores'></div>
                    <div className='logout'></div>
                </div>
            </div>
        </div>
    );
}

export default Home;