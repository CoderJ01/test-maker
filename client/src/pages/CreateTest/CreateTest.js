// React
import React from 'react';

const CreateTest = () => {
    
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
                <button type='submit'>Confirm</button>
            </form>
        </div>
    );
}

export default CreateTest;