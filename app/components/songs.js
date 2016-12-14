import React from 'react';
import {Component} from 'react';
import SongsList from './songs-list';
import UploadSongs from './upload-songs';
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
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="alert alert-danger" role="alert">
                    <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                    <span className="sr-only">Error:</span>
                        <span className="alert-text">Вы не вошли в систему</span>
                    </div>
                </div>   
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
        return(
            <div>
                <UploadSongs userId={this.state.userId}/>
                <SongsList userId={this.state.userId} />
            </div>
            )
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