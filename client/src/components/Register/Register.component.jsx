// React
import React, { useState } from 'react';

// CSS
import './Register.style.css';

// utils
import { baseURL } from '../../utils/urls';
import isValidEmail from '../../utils/emailValidation';

// other imports
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username === '' || email === '' || password === '') {
            alert('All fields need to be filled in!');
            return;
        }

        if(!isValidEmail(email)) {
            alert('Email is invalid!');
            return;
        }

        if(password.length < 8) {
            alert('Password needs to be at least 8 characters!');
            return;
        }

        axios.post(`${baseURL}/api/users/register`, 
            {
                username: username,
                email: email,
                password: password
            }
        )
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data.msg);
        })
    }

    return (
        <div className='register' onSubmit={handleSubmit}>
            <form>
                <h2>Register</h2>
                <br/>
                <div>
                    <label htmlFor='username'>Username:</label><br/>
                    <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <label htmlFor='email'>Email:</label><br/>
                    <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <label htmlFor='passowrd'>Password (8+ characters):</label><br/>
                    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <br/>
                <button>
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;