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
            <br/>
            <p style={{ textAlign: 'center' }}>test description</p>
            <div className='take-test-test'>
                <form>
                    <h3>Question</h3>
                    <br/>
                    <div>
                        <input type='radio' name='test' onChange={e => setPickedChoice('A')}></input>
                        <label>choice1</label>
                    </div>
                    <br/>
                    <div>
                        <input type='radio' name='test' onChange={e => setPickedChoice('B')}></input>
                        <label>choice2</label>
                    </div>
                    <br/>
                    <div>
                        <input type='radio' name='test' onChange={e => setPickedChoice('C')}></input>
                        <label>choice3</label>
                    </div>
                    <br/>
                    <div>
                        <input type='radio' name='test' onChange={e => setPickedChoice('D')}></input>
                        <label>choice4</label>
                    </div>
                    <br/>
                    <div className='ttt-submit-answer'>
                        <button>Submit Answer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TakeTest;