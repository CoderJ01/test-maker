// React
import React, { useState } from 'react';

// CSS
import '../Register/Register.style.css';

// utils
import { baseURL, baseURL_client } from '../../utils/urls';
import setCookie from '../../utils/setCookie';

// other imports
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username === '' || password === '') {
            alert('Both fields need to be filled in!');
            return;
        }

        axios.post(`${baseURL}/api/users/login`, 
            {
                username: username,
                password: password
            },
            {
                withCredentials: true,
                credentials: 'include'
            }
        )
        .then(response => {
            setCookie('test-maker-cookie', response.data.data.random_string, 1);
            console.log(response.data.data.random_string);
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data.msg);
        })
    }

    return (
        <div className='register' onSubmit={handleSubmit}>
            <form>
                <h2>Login</h2>
                <br/>
                <div>
                    <label htmlFor='username'>Username:</label><br/>
                    <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <br/>
                <div>
                    <label htmlFor='passowrd'>Password:</label><br/>
                    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <br/>
                <div className='register-footer'>
                    <button>
                        Login
                    </button>
                    <a href={`${baseURL_client}/register`}>Register Instead</a>
                </div>
            </form>
        </div>
    );
}

export default Login;