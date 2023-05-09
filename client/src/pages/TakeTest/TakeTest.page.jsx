// React 
import React, { useState } from 'react';

// CSS
import './TakeTest.style.css';

const TakeTest = ({ user }) => {
    const [pickedChoice, setPickedChoice] = useState('');
    console.log(pickedChoice);
    return (
        <div className='take-test'>
            <h2>Test Name</h2>
            <p>test description</p>
            <div className='take-test-test'>
                <form>
                    <p>Question</p>
                    <div>
                        <input type='radio' name='test' onChange={e => setPickedChoice('A')}></input>
                        <label>choice1</label>
                    </div>
                    <div>
                        <input type='radio' name='test' onChange={e => setPickedChoice('B')}></input>
                        <label>choice2</label>
                    </div>
                    <div>
                        <input type='radio' name='test' onChange={e => setPickedChoice('C')}></input>
                        <label>choice3</label>
                    </div>
                    <div>
                        <input type='radio' name='test' onChange={e => setPickedChoice('D')}></input>
                        <label>choice4</label>
                    </div>
                    <button>Submit Answer</button>
                </form>
            </div>
        </div>
    );
}

export default TakeTest;