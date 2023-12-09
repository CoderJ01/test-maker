import cookie from 'js-cookie';

export const processLogout = (event) => {
    event.preventDefault();
    cookie.remove('test-maker-cookie');
    window.location.reload(false);
}