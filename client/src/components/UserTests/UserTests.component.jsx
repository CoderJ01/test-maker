// React
import React from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import './UserTests.style.css';

const UserTests = ({ user }) => {
    let navigate = useNavigate();

    const routeChange = () => {
        let path = `/create-test/${user.id}`;
        navigate(path);
    }

    return (
        <div className='user-tests'>
            <h2>Your Tests</h2>
            <div className='user-test-display'>
                <div className='utd-single-test'>
                    <h3>Title</h3>
                    <p>Commande apercoit laissons bas mon essaiera ame campagne parterre. 
                    Fils on idee mais la me qu deux vive sons. Vif bourse une hordes demain voyait regard poemes. 
                   </p>
                </div>
            </div>
            <div className='ut-bottom'>
                <button onClick={routeChange}>Create New Test</button>
            </div>
        </div>
    );
}

export default UserTests;