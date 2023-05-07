// React
import React, { useState } from 'react';

// CSS
import './CreateTest.style.css';

// util
import { listOptions } from './CreateTest.util';
import { baseURL_client } from '../../utils/urls';

const CreateTest = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selected, setSelected] = useState('10');

    const options = listOptions();
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    console.log(title);
    console.log(description);
    console.log(selected)
    
    return (
        <div className='create-test'>
            <form onSubmit={handleSubmit}>
                <h2>Create Test</h2><br/>
                <div>
                    <label htmlFor='title'>Title:</label><br/>
                    <input type='text' name='title' onChange={e => setTitle(e.target.value)}></input>
                </div>
                <br/>
                <div>
                    <label htmlFor='description'>Description:</label><br/>
                    <textarea type='text' name='description' onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <br/>
                <div>
                    <label htmlFor='questions'>Number of Questions:</label><br/>
                    <select 
                        value={selected} 
                        onChange={e => setSelected(e.target.value)}
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
                <a href={`${baseURL_client}/userId/`}>Create Test Questions</a>
            </div>
        </div>
    );
}

export default CreateTest;