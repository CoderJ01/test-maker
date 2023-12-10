export const modifyQuestions = (questions) => {
    let modifiedQuestions = [];

    // put answer choices per question in the same array
    for(let i = 0; i < questions?.length; i++) {
        modifiedQuestions[i] = {
            question: questions[i]?.question_header,
            choices: [
                questions[i]?.correct_answer,
                questions[i]?.second_choice,
                questions[i]?.third_choice,
                questions[i]?.fourth_choice
            ]
        }
    }

    return modifiedQuestions;
}

export const randomizeChoices = (questions) => {
    for(let i = 0; i < questions?.length; i++) {
        shuffleAnswerChoices(questions[i]?.choices);
    }
}

const shuffleAnswerChoices = (array) => {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = 
        [array[randomIndex], array[currentIndex]];
    }
}

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