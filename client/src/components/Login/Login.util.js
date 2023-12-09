import { loginUser } from '../../utils/requests';

export const processSubmission = (e, form) => {
    e.preventDefault();
    console.log(form);

    if(form.username === '' || form.password === '') {
        alert('Both fields need to be filled in!');
        return;
    }

    loginUser('api/users/login', form.username, form.password);
}