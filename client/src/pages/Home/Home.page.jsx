// React 
import React from 'react';

// CSS
import './Home.style.css';

// components
import UserTests from '../../components/UserTests/UserTests.component';
import Tests from '../../components/Tests/Tests.component';
import Scores from '../../components/Scores/Scores.component';
import Logout from '../../components/Logout/Logout.component';

const Home = () => {
    return (
        <div className='home'>
            <UserTests/>
            <div className='bottom'>
                <Tests/>
                <div className='right-panel'>
                    <Scores/>
                    <Logout/>
                </div>
            </div>
        </div>
    );
}

export default Home;