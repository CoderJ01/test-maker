// React
import React from 'react';

// CSS
import './Header.style.css';

const Header = ({ user }) => {
    return (
        <header>
            <h1>Test Maker</h1>
            <p>Hello {user.username}</p>
        </header>
    );
}

export default Header;