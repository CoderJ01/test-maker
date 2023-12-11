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

export const randomizeChoices = (questions, setData) => {
    for(let i = 0; i < questions?.length; i++) {
        shuffleAnswerChoices(questions[i]?.choices);
    }
    setData(questions);
}

export const shuffleAnswerChoices = (array) => {
    let currentIndex = array?.length,  randomIndex;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = 
        [array[randomIndex], array[currentIndex]];
    }
}