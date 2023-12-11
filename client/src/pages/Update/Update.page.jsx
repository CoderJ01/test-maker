// React
import React, { useState } from 'react';

// CSS
import './Update.style.css';

// utils
import { processSubmission } from './Update.util';

const Update = ({ user }) => {
    const [formState, setFormState] = useState({ email: '', oldPassword: '', newPassword: '' });

    const handleSubmit = async (event) => {
        processSubmission(event, formState, user);
    }

    return (
        <div className='update'>
            <form className='update-form' onSubmit={handleSubmit}>
                <h2>Update Info</h2>
                <div>
                    <label htmlFor='email'>Email:</label><br/>
                    <input 
                        type='text' 
                        name='email' 
                        value={formState.email} 
                        onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor='old-password'>Password (current):</label><br/>
                    <input 
                        type='password' 
                        name='oldPassword' 
                        value={formState.oldPassword} 
                        onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor='new-password'>Password (new):</label><br/>
                    <input 
                        type='password' 
                        name='newPassword' 
                        value={formState.newPassword} 
                        onChange={(e) => setFormState({ ...formState, [e.target.name]: e.target.value })}
                    />
                </div>
                <br/>
                <div className='uf-button'>
                   <button>Update</button>
                </div>
            </form>
        </div>
    );
}

export default Update;