// util 
import { postInfo } from '../../utils/requests';

// for each question, ensure that no radio buttons are pre-selected 
// before the test taker makes a selection 
export const setRadioButtonBlank = () => {
    let testing = [];

    // looping is ineffective
    testing[0] = document.getElementById('choice-bttn-0');
    testing[1] = document.getElementById('choice-bttn-1');
    testing[2] = document.getElementById('choice-bttn-2');
    testing[3] = document.getElementById('choice-bttn-3');

    verifyChoiceExistance(testing[0]);
    verifyChoiceExistance(testing[1]);
    verifyChoiceExistance(testing[2]); 
    verifyChoiceExistance(testing[3]); 
}

const verifyChoiceExistance = (choice) => {
    if(choice) {
        choice.checked = false;
    }
}

export const processChoiceSubmission = (e, pickedChoice, number, questions, testAnswers, setNumber, setTestAnswers, setPickedChoice) => {
    e.preventDefault();

    if(pickedChoice === '') {
        alert('You have not selected an answer!');
        return;
    }

    if(number + 1 <= questions?.length) {
        setNumber(number + 1);
        setTestAnswers([...testAnswers, pickedChoice]);
        setPickedChoice('');
        setRadioButtonBlank();
    }
}

export const processTestSubmission = (e, number, questions, testId, testAnswers, user, navigate) => {
    e.preventDefault();

    if(number + 1 <= questions?.length) {
        alert('You have not completed the test yet!');
        return;
    }

    if(testId && user.id) {
        postInfo(`api/scores/${testId}/${user.id}`, testAnswers, navigate);
    }
}