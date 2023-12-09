// React
import React, { useState } from 'react';

// CSS
import '../Register/Register.style.css';

// utils
import { processSubmission } from './Login.util';
import { baseURL_client } from '../../utils/urls';

const Login = () => {
    const [formState, setFormState] = useState({ username: '', password: '' });

    const handleSubmit = (e) => {
       processSubmission(e, formState);
    }

    return (
        <div className='register' onSubmit={handleSubmit}>
            <form>
                <h2>Login</h2>
                <br/>
                <div>
                    <label htmlFor='username'>Username:</label><br/>
                    <input 
                        type='text' 
                        name='username' 
                        value={formState.username} 
                        onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor='passowrd'>Password:</label><br/>
                    <input 
                        type='password' 
                        name='password' 
                        value={formState.password} 
                        onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                    />
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
