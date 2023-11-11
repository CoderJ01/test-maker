// React
import React, { useState } from 'react';

// CSS
import './Update.style.css';

// URL
import { baseURL } from '../../utils/urls';

// other imports
import axios from 'axios';
import isValidEmail from '../../utils/emailValidation';

const Update = ({ user }) => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(email === '' && oldPassword === '' && newPassword === '') 
        {
            alert('Please fill in at least one field!');
            return;
        }

        if(email !== '' && !isValidEmail(email)) {
            alert('Email is not valid!');
            return;
        }

        if((oldPassword !== '' && newPassword === '') || (oldPassword === '' && newPassword !== '')) {
            alert('Please fill in both your current password and your new password!');
            return;
        }

        if(oldPassword !== '' && newPassword.length < 8) {
            alert('New password must be at least 8 characters!');
            return;
        }
       
        axios.put(baseURL + `/users/${user._id}`, 
        {
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword
        },  
        )
        .then(
            response => {
                alert(response.data.msg);
                window.location.reload(false);
            }, 
            error => {
                alert(error.response.data.msg);
            }
        );
    }

    return (
        <div className='update'>
            <form className='update-form' onSubmit={handleSubmit}>
                <h2>Update Info</h2>
                <div>
                    <label htmlFor='email'>Email:</label><br/>
                    <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='old-password'>Password (current):</label><br/>
                    <input type='password' name='old-password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor='new-password'>Password (new):</label><br/>
                    <input type='password' name='new-password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
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