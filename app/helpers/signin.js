"use strict";

import Config from '../config';

function json(response) {
    if (!response.ok) {
        throw response.status;
    }
    return response.json()
}
function status(response) {
    console.log(response.status)
    return response
}

function regUser(nickname) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const respConf = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify({
            login: nickname
        })
    };

    return fetch(`${Config.API_URL}/users`, respConf)
        .then(json)
        .then((responseJson) => responseJson.user.id)
}

function getId(nickname){
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const respConf = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: JSON.stringify({
            login: nickname
        })
    };
    return fetch(`${Config.API_URL}/users/login`, respConf)
        .then(json)
        .then((responseJson) => responseJson.user.id)
}

function login(nickname, cb){
    getId(nickname)
        .then((userId) => cb({userId: userId}, null))
        .catch((error) => {
            if(+error == 404){
                regUser(nickname)
                .then((userId) => cb({userId: userId}, null))
                .catch((error) => cb(null, error));
            }else{
                cb(null, error)
            }
        });
}

export {
    login
};