import React from 'react';
import {Component} from 'react';
import { getSongList } from '../helpers/songs'
import SongsList from './songs-list';
import cookie from 'react-cookie';

export default class Songs extends Component {
    constructor(props) {
        super(props);

        this.state =  {
            userId: cookie.load('userId'),
            nickname: '',
            error: false,
            errorMsg: '',
            list: [<li key="0">Загрузка адиозаписей...</li>],
            renderPanel: this.renderNoAuth
        };
    }

    renderNoAuth(){
        return(
            <div style={{color: 'red'}}>
                Вы не вошли в систему
            </div>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.list !== nextState.list) {
            return true;
        }
        return false;
    }

    renderListSongs(){
        return <SongsList userId={this.state.userId} />
    }

    render() {

        const renderPanel = this.state.userId ? this.renderListSongs() : this.renderNoAuth();
        return(
            <div>
                {renderPanel}
            </div>
        )
    }
}