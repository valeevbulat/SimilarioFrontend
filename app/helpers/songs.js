"use strict";

import Config from '../config';

function json(response) {
    return response.json()
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
}

function getSongList(userId, cb){
    getUser(userId)
        .then((response) =>{
            return cb(response.user.songs, null)
        })
        .catch((error) => cb(null, error))
}

export {
    getSongList
};