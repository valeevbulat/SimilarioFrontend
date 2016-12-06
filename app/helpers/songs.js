"use strict";

import Config from '../config';
import {translit, rus} from './transliterate';

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
    let songName = song.name.trim();

    for (let i = 0; i < songName.length; i++) {
        if(~rus.indexOf(songName[i])){
            songName = translit(songName, 5); break;
        }
    };

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'audio/mpeg');
    myHeaders.append('Filename', songName);

    let formData = new FormData()
    formData.append('file', song);

    const respConf = {
        method: 'POST',
        mode: 'cors',
        headers: myHeaders,
        body: formData.get('file')
    };

    fetch(`${Config.API_URL}/users/${id}/songs`, respConf)
        .then(json)
        .then((responseJson) => cb(null, responseJson))
        .catch((e) => cb('Error', e))

}


export {
    getSongList,
    uploadSong
};