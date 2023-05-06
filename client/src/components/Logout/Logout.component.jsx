// React
import React from 'react';

// CSS 
import './Logout.style.css';

// other imports
import cookie from 'js-cookie';

const Logout = () => {
    
    const handleLogout = (event) => {
        event.preventDefault();
        cookie.remove('test-maker-cookie');
        window.location.reload(false);
    }

    return (
        <div className='logout'>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;

