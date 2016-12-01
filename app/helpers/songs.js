"use strict";

import Config from '../config';

function json(response) {
    if (!response.ok) {
        throw response.status;
    }
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
            return cb(response.user, null)
        })
        .catch((error) => cb(null, error))
}

function uploadSong(song, id, cb) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'audio/mpeg');
    myHeaders.append('Filename', "ddd.mp3");

    var formData = new FormData()
    formData.append('file', song);

    const respConf = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: formData.get('file')
    };

    fetch(`${Config.API_URL}/users/${id}/songs`, respConf)
        .then(json)
        .then((responseJson) => cb(false, responseJson))
        .catch((e) => cb(true, e))

}

export {
    getSongList,
    uploadSong
};