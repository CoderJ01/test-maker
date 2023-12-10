import { postInfo } from "../../utils/requests";

export const listOptions = () => {
    let options = [];

    for(let i = 10; i <= 50; i++) {
        options.push(i.toString());
    }

    return options;
}

export const processSubmission = (e, form, user) => {
    e.preventDefault();

    if(form.title === '') {
        alert('The test needs a title!');
        return;
    }

    if(form.description === '') {
        alert('The test needs a description!');
        return;
    }

    if(user.id) {
        postInfo(`api/tests/${user.id}`, form, '');
    }
}