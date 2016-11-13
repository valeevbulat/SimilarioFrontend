"use strict";

import Config from '../config';


function json(response) {
    return response.json()
}
function status(response) {
    console.log(response.status)
    return response
}

function getUser(userId) {
    const myHeaders = new Headers();

    const myInit = {
        method: 'GET',
        mode: 'cors',
        headers: myHeaders
    };
    return fetch(`${Config.API_URL}/users/${userId}`, myInit)
        .then(json)
        .then((responseJson) => console.log(responseJson));
}

function getId(nickname){
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const myInit = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify({
            login: nickname
        })
    };
    return fetch(`${Config.API_URL}/users/login`, myInit)
        .then(json)
        .then((responseJson) => console.log(responseJson))
        .catch((error) => console.log(error))
}

function login(nickname, cb){
    getId(nickname);
    cb({userId: '5'}, null)
}

export {
    login
};