// util
import { postInfo } from '../../utils/requests';
import isValidEmail from '../../utils/emailValidation';

export const processSubmission = (e, form, navigate) => {
    e.preventDefault();

    if(form.username === '' || form.email === '' || form.password === '') {
        alert('All fields need to be filled in!');
        return;
    }

    if(!isValidEmail(form.email)) {
        alert('Email is invalid!');
        return;
    }

    if(form.password.length < 8) {
        alert('Password needs to be at least 8 characters!');
        return;
    }

    postInfo('api/users/register', form, navigate);
}