// React
import React, { useState } from 'react';

// CSS
import './CreateTest.style.css';

// util
import { listOptions } from './CreateTest.util';
import { baseURL, baseURL_client } from '../../utils/urls';

// other imports
import axios from 'axios';

const CreateTest = ({ user }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selected, setSelected] = useState('10');

    const options = listOptions();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if(title === '') {
            alert('The test needs a title!');
            return;
        }

        if(description === '') {
            alert('The test needs a description!');
            return;
        }

        const id = user.id;

        if(id) {
            axios.post(`${baseURL}/api/tests/${id}`, 
            {
                title: title,
                description: description,
                number: selected
            }
            )
            .then(response => {
                alert(response.data.msg);
                console.log(response);
            })
            .catch(error => {
                alert(error.response.data.msg);
                console.log(error);
            });
        }
    }
    
    return (
        <div className='create-test'>
            <form onSubmit={handleSubmit}>
                <h2>Create Test</h2><br/>
                <div>
                    <label htmlFor='title'>Title:</label><br/>
                    <input maxLength={25} type='text' name='title' onChange={e => setTitle(e.target.value)}></input>
                </div>
                <br/>
                <div>
                    <label htmlFor='description'>Description:</label><br/>
                    <textarea maxLength={200} type='text' name='description' onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <br/>
                <div>
                    <label htmlFor='questions'>Maximum Number of Questions:</label><br/>
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
                <a href={`${baseURL_client}/create-questions`}>Create Test Questions</a>
            </div>
        </div>
    );
}

export default CreateTest;