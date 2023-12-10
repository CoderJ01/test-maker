// React
import React, { useState } from 'react';

// CSS
import './CreateTest.style.css';

// util
import { processSubmission, listOptions } from './CreateTest.util';
import { baseURL_client } from '../../utils/urls';

const CreateTest = ({ user }) => {
    const [formState, setFormState] = useState({ title: '', description: '', selected: '10' });

    const options = listOptions();
    
    const handleSubmit = (e) => {
        processSubmission(e, formState, user);
    }
    
    return (
        <div className='create-test'>
            <form onSubmit={handleSubmit}>
                <h2>Create Test</h2><br/>
                <div>
                    <label htmlFor='title'>Title:</label><br/>
                    <input 
                        maxLength={25} 
                        type='text' 
                        name='title' 
                        onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value })}
                    ></input>
                </div>
                <br/>
                <div>
                    <label htmlFor='description'>Description:</label><br/>
                    <textarea 
                        maxLength={200} 
                        type='text' 
                        name='description' 
                        onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value })}
                    ></textarea>
                </div>
                <br/>
                <div>
                    <label htmlFor='questions'>Maximum Number of Questions:</label><br/>
                    <select 
                        value={formState.selected} 
                        onChange={e => setFormState({ ...formState, [e.target.name]: e.target.value })}
                    >
                    {options.map((value) => (
                    <option value={value} key={value}>
                        {value}
                    </option>
                    ))}
                </select>
                </div>
                <br/>
                <button type='submit'>Confirm</button>
            </form>
            <div className='ct-create-questions'>
                <a href={`${baseURL_client}/create-questions`}>Create Test Questions</a>
            </div>
        </div>
    );
}

export default CreateTest;