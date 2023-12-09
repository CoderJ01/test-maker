// React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// CSS
import './Register.style.css';

// utils
import { baseURL, baseURL_client } from '../../utils/urls';
import isValidEmail from '../../utils/emailValidation';
import { processSubmission } from './Register.util';

// other imports
import axios from 'axios';

const Register = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        processSubmission(e, formState, navigate);
    }

    return (
        <div className='register' onSubmit={handleSubmit}>
            <form>
                <h2>Register</h2>
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
                    <label htmlFor='email'>Email:</label><br/>
                    <input 
                        type='text' 
                        name='email' 
                        value={formState.email} 
                        onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                    />
                </div>
                <br/>
                <div>
                    <label htmlFor='password'>Password (8+ characters):</label><br/>
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
                        Register
                    </button>
                    <a href={`${baseURL_client}/login`}>Login Instead</a>
                </div>
            </form>
        </div>
    );
}

export default Register;