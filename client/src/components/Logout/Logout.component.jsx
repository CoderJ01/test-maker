// React
import React from 'react';

// CSS 
import './Logout.style.css';

// util
import { processLogout } from './Logout.util';

const Logout = () => {
    
    const handleLogout = (event) => {
       processLogout(event);
    }

    return (
        <div className='logout'>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;

