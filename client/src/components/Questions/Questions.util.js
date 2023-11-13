export const setTextFieldsBlank = () => {
    let field = [];
    
    // looping proves to be ineffective for this type of task
    field[0] = document.getElementById('question');
    field[1] = document.getElementById('choice-1');
    field[2] = document.getElementById('choice-2');
    field[3] = document.getElementById('choice-3');
    field[4] = document.getElementById('choice-4');

    field[0].value = '';
    field[1].value = '';
    field[2].value = '';
    field[3].value = '';
    field[4].value = '';
}