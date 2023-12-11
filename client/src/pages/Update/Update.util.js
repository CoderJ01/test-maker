// util
import isValidEmail from '../../utils/emailValidation';
import { updateInfo } from '../../utils/requests';

export const processSubmission = (e, form, user) => {
    e.preventDefault();

    if(form.email === '' && form.oldPassword === '' && form.newPassword === '') {
        alert('Please fill in at least one field!');
        return;
    }

    if(form.email !== '' && !isValidEmail(form.email)) {
        alert('Email is not valid!');
        return;
    }

    if((form.oldPassword !== '' && form.newPassword === '') || (form.oldPassword === '' && form.newPassword !== '')) {
        alert('Please fill in both your current password and your new password!');
        return;
    }

    if(form.oldPassword !== '' && form.newPassword.length < 8) {
        alert('New password must be at least 8 characters!');
        return;
    }

    updateInfo(`api/users/${user.id}`, form);
}