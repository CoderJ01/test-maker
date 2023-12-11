// React
import { useState, useEffect, useCallback } from 'react';

// setCookie
import setCookie from './setCookie';

// modifyQuestions
import { modifyQuestions, randomizeChoices } from './modifyQuestions';

// other imports
import axios from 'axios';
import cookie from 'js-cookie';

const baseURL_server = process.env.REACT_APP_SERVER_URL;

// GET
export const GetData = (route, user = false, questions = false) => {
    const [data, setData] = useState([]);

    const getInfo = useCallback(async() => {
        try {
            const response = await axios.get(`${baseURL_server}/${route}`);
            if(user) getUser(response, setData);
            else if(questions) randomizeChoices(modifyQuestions(response?.data), setData);
            else setData(response);
        }
        catch(error) {
            console.log(error);
        }
    }, [route]);

    useEffect(() => {
        getInfo();
    }, [getInfo]);

    return data;
}

const getUser = (response, setData) => {
    let userCookie = cookie.get('test-maker-cookie');
    for(let i = 0; i < response.data.length; i++) {
        if(response.data[i].random_string === userCookie) {
            setData(response.data[i]);
        }
    }
}

// POST
export const postInfo = (route, infoObj, navigate) => {
    axios.post(`${baseURL_server}/${route}`, {
        questions: infoObj,
        username: infoObj.username,
        password: infoObj.password,
        email: infoObj.email,
        title: infoObj.title,
        description: infoObj.description,
        number: infoObj.selected,
        answers: infoObj
    })
    .then(response => {
        console.log(response);
        navigateTo(route, navigate, response, 'questions', '/');
        navigateTo(route, navigate, response, 'register', '/login');
        navigateTo(route, navigate, response, 'scores', '/')
    })
    .catch(error => {
        console.log(error);
        if(route.includes('register')) alert(error.response.data.msg);
        if(route.includes('scores')) alert('You have not completed the test yet!');
    });
}

const navigateTo = (route, navigate, response, routeSnippet, navigateTo) => {
    if(route.includes(routeSnippet)) {
        alert(response.data.msg);
        navigate(navigateTo);
    }
}

export const loginUser = (route, username, password) => {
    axios.post(`${baseURL_server}/${route}`, 
    {
        username: username,
        password: password,
    },
    {
        withCredentials: true,
        credentials: 'include'
    })
    .then(response => {
        console.log(response.data.data.random_string);
        setCookie('test-maker-cookie', response.data.data.random_string, 1);
        window.location.reload(false);
    })
    .catch(error => {
        console.log(error);
    });
}

// DELETE
export const deleteInfo = async (route) => {
    try {
        await axios.delete(`${baseURL_server}/${route}`);
    }
    catch(error) {
        console.log(error);
    }
}