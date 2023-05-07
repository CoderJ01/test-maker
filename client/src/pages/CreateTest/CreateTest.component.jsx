// React
import React from 'react';

// util
import { listOptions } from './CreateTest.util';

const CreateTest = () => {

    const options = listOptions();
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    return (
        <div className='create-test'>
            <form onSubmit={handleSubmit}>
                <h2>Create Test</h2>
                <div>
                    <label htmlFor='title'>Title:</label><br/>
                    <input type='text' name='title'></input>
                </div>
                <div>
                    <label htmlFor='description'>Description:</label><br/>
                    <textarea type='text' name='description'></textarea>
                </div>
                <div>
                    <label htmlFor='questions'>Number of Questions:</label><br/>
                    <select 
                        // value={selected} 
                        // onChange={e => setSelected(e.target.value)}
                    >
                    {options.map((value) => (
                    <option value={value} key={value}>
                        {value}
                    </option>
                    ))}
                </select>
                </div>
                <button type='submit'>Confirm</button>
            </form>
        </div>
    );
}

export default CreateTest;