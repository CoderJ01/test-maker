// React
import React from 'react';

// CSS
import './Header.style.css';

// URL
import { baseURL_client } from '../../utils/urls';

const Header = ({ user }) => {
    return (
        <header>
            <h1><a href={`${baseURL_client}`}>Test Maker</a></h1>
            {
                user.length === 0 ? 
                (
                    ''
                ) : 
                (
                    <p>Hello {user.username}</p>
                )
            }
        </header>
    );
}

export default Header;