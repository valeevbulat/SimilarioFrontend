"use strict";

import Config from '../config';
var myHeaders = new Headers();

const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'same-origin',
    cache: 'default'
};

function json(response) {
    return response.json()
}

function getId() {
    // return fetch(`${Config.API_URL}/users/5`,
    return fetch(`${Config.API_URL}/users/5`, myInit)
        .then((response) => response.arrayBuffer())
        .then((responseText) => console.log(responseText));
        // .then((responseJson) => console.log(responseJson));
}

function login(){
    return '5'
}

export {
    login
};